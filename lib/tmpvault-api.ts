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

/** Browser: direct backend URL if set; otherwise same-origin paths (use Next rewrites). */
export function getApiOrigin(): string {
  return (process.env.NEXT_PUBLIC_TMPVAULT_API_URL ?? "").replace(/\/$/, "");
}

export function uploadEndpoint(): string {
  const o = getApiOrigin();
  return o ? `${o}/api/v1/upload` : "/api/v1/upload";
}

export function downloadPath(fileId: string): string {
  const o = getApiOrigin();
  return o ? `${o}/download/${encodeURIComponent(fileId)}` : `/download/${encodeURIComponent(fileId)}`;
}

/** Full URL for display/copy (uses current origin when using Next rewrites). */
export function downloadUrlAbsolute(fileId: string): string {
  if (typeof window === "undefined") {
    const o = getApiOrigin();
    return o
      ? `${o}/download/${encodeURIComponent(fileId)}`
      : `/download/${encodeURIComponent(fileId)}`;
  }
  const o = getApiOrigin();
  if (o) return `${o}/download/${encodeURIComponent(fileId)}`;
  return `${window.location.origin}/download/${encodeURIComponent(fileId)}`;
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
): Promise<UploadSuccess> {
  const body = new FormData();
  body.append("file", file);
  body.append("expiry", expiry);

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
  onProgress: (percent: number) => void,
): Promise<UploadSuccess> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    const form = new FormData();
    form.append("file", file);
    form.append("expiry", expiry);

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
