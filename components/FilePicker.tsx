"use client";

import { useCallback, useRef, useState } from "react";
import { IS_DEV } from "@/lib/env";
import { formatFileSizeMb } from "@/lib/utils";

type FileDropZoneProps = {
  onFiles?: (files: FileList) => void;
  className?: string;
  /** Backend accepts one file per request; default false. */
  multiple?: boolean;
  /** When set, shows filename + size inside the zone (replace via click/drop). */
  selectedFile?: File | null;
  disabled?: boolean;
};

export function FileDropZone({
  onFiles,
  className = "",
  multiple = false,
  selectedFile = null,
  disabled = false,
}: FileDropZoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isOver, setIsOver] = useState(false);

  const emit = useCallback(
    (list: FileList | null) => {
      if (!list?.length) return;
      if (onFiles) {
        onFiles(list);
        return;
      }
      if (IS_DEV) {
        console.log(
          "[FileDropZone]",
          [...list].map((f) => f.name),
        );
      }
    },
    [onFiles],
  );

  const hasFile = Boolean(selectedFile);

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        multiple={multiple}
        disabled={disabled}
        className="sr-only"
        onChange={(e) => {
          emit(e.target.files);
          e.target.value = "";
        }}
      />
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && inputRef.current?.click()}
        onDragEnter={(e) => {
          if (disabled) return;
          e.preventDefault();
          setIsOver(true);
        }}
        onDragOver={(e) => {
          if (disabled) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = "copy";
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          if (!e.currentTarget.contains(e.relatedTarget as Node))
            setIsOver(false);
        }}
        onDrop={(e) => {
          if (disabled) return;
          e.preventDefault();
          setIsOver(false);
          emit(e.dataTransfer.files);
        }}
        className={[
          "flex min-h-[140px] w-full flex-col items-center justify-center gap-1 rounded-xl px-4 py-6",
          "border-2 border-dashed border-[var(--lb-drop-border)] bg-[var(--lb-drop)]",
          "text-center transition-colors",
          !disabled && "cursor-pointer hover:bg-[var(--lb-blue-pale)]/60",
          disabled && "cursor-not-allowed opacity-70",
          isOver &&
            !disabled &&
            "border-[var(--lb-blue-active)] bg-[var(--lb-blue-pale)]/80",
          hasFile
            ? "text-[var(--lb-text)]"
            : "text-sm font-medium text-[var(--lb-blue-active-deep)]",
        ].join(" ")}>
        {hasFile && selectedFile ? (
          <>
            <span className="max-w-full truncate text-base font-medium text-[var(--lb-text)]">
              {selectedFile.name}
            </span>
            <span className="text-sm font-normal text-[var(--lb-text-muted)]">
              {formatFileSizeMb(selectedFile.size)} — click or drop to replace
            </span>
          </>
        ) : (
          "Select or drop files."
        )}
      </button>
    </div>
  );
}
