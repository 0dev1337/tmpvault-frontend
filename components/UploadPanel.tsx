"use client";

import { useState } from "react";
import { ExpiryPicker, type ExpiryValue } from "@/components/ExpiryPicker";
import { FileNamePicker } from "@/components/FileNamePicker";
import { FileDropZone } from "@/components/FilePicker";
import {
  downloadPath,
  downloadUrlAbsolute,
  uploadFileWithProgress,
} from "@/lib/tmpvault-api";

export function UploadPanel() {
  const [expiry, setExpiry] = useState<ExpiryValue>("1h");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [lastId, setLastId] = useState<string | null>(null);

  const successUrl = lastId ? downloadUrlAbsolute(lastId) : null;

  async function submit() {
    if (!file) return;
    setBusy(true);
    setProgress(0);
    setError(null);
    setLastId(null);
    try {
      const r = await uploadFileWithProgress(file, expiry, setProgress);
      setLastId(r.id);
      setProgress(100);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
      setProgress(0);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <ExpiryPicker value={expiry} onChange={setExpiry} />
      <FileNamePicker />
      <FileDropZone
        className="w-full"
        multiple={false}
        selectedFile={file}
        disabled={busy}
        onFiles={(list) => {
          const f = list.item(0);
          setFile(f);
          setError(null);
          setLastId(null);
          setProgress(0);
        }}
      />
      <button
        type="button"
        onClick={submit}
        disabled={!file || busy}
        className="w-full rounded-full border border-[var(--lb-blue-active-deep)] bg-[var(--lb-blue-active-deep)] px-4 py-2.5 text-sm font-bold text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-50 hover:opacity-95"
      >
        {busy ? "Uploading…" : "Upload"}
      </button>
      {busy ? (
        <div className="w-full space-y-1.5">
          <div
            className="h-2.5 w-full overflow-hidden rounded-full border border-[var(--lb-border)] bg-[var(--lb-blue-pale)]"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Upload progress"
          >
            <div
              className="h-full bg-[var(--lb-blue-active)] transition-[width] duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-center text-xs text-[var(--lb-text-muted)]">
            {progress}% uploaded
          </p>
        </div>
      ) : null}
      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      {successUrl && lastId ? (
        <div className="w-full rounded-xl border border-[var(--lb-border)] bg-[var(--lb-drop)] px-4 py-3">
          <p className="text-xs font-semibold text-[var(--lb-text-muted)]">
            Download URL
          </p>
          <a
            href={downloadPath(lastId)}
            className="mt-1 block break-all text-sm font-medium text-[#2d7ab8] underline underline-offset-2 dark:text-[#7eb8e0]"
          >
            {successUrl}
          </a>
        </div>
      ) : null}
    </div>
  );
}
