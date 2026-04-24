import { IS_DEV, PUBLIC_BACKEND_ORIGIN } from "@/lib/env";

/**
 * tmpvault-backend: POST /api/v1/upload, GET /download/:file_id
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

export function uploadEndpoint(): string {
  return `${uploadApiBase().replace(/\/$/, "")}/api/v1/upload`;
}

/** Same-origin; Next rewrites proxy GET /download/* to the backend. */
export function downloadPath(fileId: string): string {
  return `/download/${encodeURIComponent(fileId)}`;
}

export function downloadUrlAbsolute(fileId: string): string {
  if (typeof window === "undefined") {
    return downloadPath(fileId);
  }
  return `https://files.tmpvault.com/${downloadPath(fileId)}`;
}

function parseUploadResponse(
  status: number,
  responseText: string,
): UploadSuccess {
  let raw: unknown = {};
  try {
    raw = JSON.parse(responseText) as unknown;
  } catch {
    /* ignore */
  }
  const errBody = raw as UploadErrorBody;

  if (status < 200 || status >= 300) {
    throw new Error(errBody.error ?? `Upload failed (${status})`);
  }

  const data = raw as UploadSuccess;
  if (data.status !== "success" || !data.id) {
    throw new Error(errBody.error ?? "Invalid upload response");
  }
  return data;
}

export async function uploadFile(
  file: File,
  expiry: string,
  fileNameLength: string,
): Promise<UploadSuccess> {
  const body = new FormData();
  body.append("file", file);
  body.append("expiry", expiry);
  body.append("file_name_length", fileNameLength);

  const res = await fetch(uploadEndpoint(), {
    method: "POST",
    body,
  });

  const text = await res.text();
  return parseUploadResponse(res.status, text);
}

/** XMLHttpRequest so `upload` events report progress (fetch has no upload progress). */
export function uploadFileWithProgress(
  file: File,
  expiry: string,
  fileNameLength: string,
  onProgress: (percent: number) => void,
): Promise<UploadSuccess> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const form = new FormData();
    form.append("file", file);
    form.append("expiry", expiry);
    form.append("file_name_length", fileNameLength);

    xhr.upload.addEventListener("progress", (e) => {
      if (e.lengthComputable && e.total > 0) {
        onProgress(Math.min(100, Math.round((100 * e.loaded) / e.total)));
      }
    });

    xhr.addEventListener("load", () => {
      try {
        resolve(parseUploadResponse(xhr.status, xhr.responseText));
      } catch (err) {
        reject(err instanceof Error ? err : new Error("Upload failed"));
      }
    });

    xhr.addEventListener("error", () =>
      reject(new Error("Network error during upload")),
    );
    xhr.addEventListener("abort", () => reject(new Error("Upload cancelled")));

    xhr.open("POST", uploadEndpoint());
    xhr.send(form);
  });
}
