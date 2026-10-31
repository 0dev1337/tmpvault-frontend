import { IS_DEV, PUBLIC_BACKEND_ORIGIN } from "@/lib/env";

/**
 * tmpvault-backend: POST /api/v1/upload/{init,:session_id/chunk,:session_id/complete}, GET /download/:file_id
 * @see tmpvault-backend README
 */

export type UploadSuccess = {
  id: string;
  expiry: string;
  status: string;
};

export type UploadErrorBody = {
  status?: string;
  error?: string;
};

type InitUploadResponse = {
  status: string;
  error?: string;
  session_id?: string;
  chunk_size?: number;
  total_chunks?: number;
};

/** Per-request watchdog: abort and retry if a request makes no progress for this long. */
const REQUEST_TIMEOUT_MS = 30_000;
/** Attempts per chunk (including the first) before giving up on the whole upload. */
const MAX_CHUNK_ATTEMPTS = 4;

/** Public backend origin for uploads only (not proxied through Next). */
export function getApiOrigin(): string {
  return PUBLIC_BACKEND_ORIGIN;
}

function uploadApiBase(): string {
  const o = getApiOrigin();
  if (o) return o;
  if (IS_DEV) {
    return "http://127.0.0.1:8080";
  }
  throw new Error(
    "Set NEXT_PUBLIC_TMPVAULT_API_URL to your tmpvault-backend origin (uploads are sent directly, not via Next).",
  );
}

function apiPath(path: string): string {
  return `${uploadApiBase().replace(/\/$/, "")}${path}`;
}

/** Same-origin; Next rewrites proxy GET /download/* to the backend. */
export function downloadPath(fileId: string): string {
  return `/download/${encodeURIComponent(fileId)}`;
}

export function downloadUrlAbsolute(fileId: string): string {
  if (typeof window === "undefined") {
    return downloadPath(fileId);
  }
  return `https://files.tmpvault.com${downloadPath(fileId)}`;
}

function parseJsonBody<T>(responseText: string): T {
  try {
    return JSON.parse(responseText) as T;
  } catch {
    return {} as T;
  }
}

function parseUploadResponse(
  status: number,
  responseText: string,
): UploadSuccess {
  const errBody = parseJsonBody<UploadErrorBody>(responseText);

  if (status < 200 || status >= 300) {
    throw new Error(errBody.error ?? `Upload failed (${status})`);
  }

  const data = parseJsonBody<UploadSuccess>(responseText);
  if (data.status !== "success" || !data.id) {
    throw new Error(errBody.error ?? "Invalid upload response");
  }
  return data;
}

/** XMLHttpRequest wrapper with a timeout watchdog, so a stalled connection fails loudly instead of hanging forever. */
function xhrRequest(
  method: string,
  url: string,
  body: XMLHttpRequestBodyInit | null,
  opts?: {
    headers?: Record<string, string>;
    onProgress?: (loaded: number, total: number) => void;
  },
): Promise<{ status: number; responseText: string }> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.timeout = REQUEST_TIMEOUT_MS;

    if (opts?.onProgress) {
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) opts.onProgress!(e.loaded, e.total);
      });
    }

    xhr.addEventListener("load", () =>
      resolve({ status: xhr.status, responseText: xhr.responseText }),
    );
    xhr.addEventListener("error", () =>
      reject(new Error("Network error during upload")),
    );
    xhr.addEventListener("timeout", () =>
      reject(new Error("Upload stalled (no response from server)")),
    );
    xhr.addEventListener("abort", () => reject(new Error("Upload cancelled")));

    xhr.open(method, url);
    for (const [k, v] of Object.entries(opts?.headers ?? {})) {
      xhr.setRequestHeader(k, v);
    }
    xhr.send(body);
  });
}

async function withRetries<T>(
  attempts: number,
  fn: () => Promise<T>,
): Promise<T> {
  let lastErr: unknown;
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (attempt < attempts) {
        await new Promise((r) => setTimeout(r, 500 * attempt));
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error("Upload failed");
}

/**
 * Uploads a file via the chunked flow (init -> chunk* -> complete), so large
 * files don't depend on a single request completing (which reverse proxies
 * in front of the backend, e.g. Cloudflare, may cap well below what the
 * backend itself allows) and so a stalled/failed chunk can be retried
 * without restarting the whole transfer.
 */
export async function uploadFileChunked(
  file: File,
  expiry: string,
  fileNameLength: string,
  onProgress: (percent: number) => void,
): Promise<UploadSuccess> {
  const initBody = new URLSearchParams({
    size: String(file.size),
    filename: file.name,
    expiry,
    file_name_length: fileNameLength,
  });
  const initRes = await xhrRequest(
    "POST",
    apiPath("/api/v1/upload/init"),
    initBody.toString(),
    { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
  );
  if (initRes.status < 200 || initRes.status >= 300) {
    const err = parseJsonBody<UploadErrorBody>(initRes.responseText);
    throw new Error(err.error ?? `Failed to start upload (${initRes.status})`);
  }
  const init = parseJsonBody<InitUploadResponse>(initRes.responseText);
  if (!init.session_id || !init.chunk_size || !init.total_chunks) {
    throw new Error(init.error ?? "Invalid upload session response");
  }
  const sessionId: string = init.session_id;
  const chunkSize: number = init.chunk_size;
  const totalChunks: number = init.total_chunks;

  let bytesDone = 0;
  const reportProgress = (chunkLoaded: number) => {
    onProgress(Math.min(100, Math.round((100 * (bytesDone + chunkLoaded)) / file.size)));
  };

  for (let index = 0; index < totalChunks; index++) {
    const start = index * chunkSize;
    const end = Math.min(start + chunkSize, file.size);
    const chunk = file.slice(start, end);

    await withRetries(MAX_CHUNK_ATTEMPTS, async () => {
      const res = await xhrRequest(
        "POST",
        apiPath(`/api/v1/upload/${sessionId}/chunk?index=${index}`),
        chunk,
        {
          headers: { "Content-Type": "application/octet-stream" },
          onProgress: (loaded) => reportProgress(loaded),
        },
      );
      if (res.status < 200 || res.status >= 300) {
        const err = parseJsonBody<UploadErrorBody>(res.responseText);
        throw new Error(err.error ?? `Chunk upload failed (${res.status})`);
      }
    });

    bytesDone = end;
    reportProgress(0);
  }

  const completeRes = await withRetries(MAX_CHUNK_ATTEMPTS, () =>
    xhrRequest("POST", apiPath(`/api/v1/upload/${sessionId}/complete`), null),
  );
  return parseUploadResponse(completeRes.status, completeRes.responseText);
}
