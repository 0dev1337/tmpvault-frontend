"use client";

import { useState } from "react";
import { PillButton } from "@/components/PillButton";

const NAME_LEN_OPTIONS = [
  { value: "8", label: "8 chars" },
  { value: "16", label: "16 chars" },
] as const;

export type FileNameLengthValue = (typeof NAME_LEN_OPTIONS)[number]["value"];

type FileNamePickerProps = {
  value?: FileNameLengthValue;
  defaultValue?: FileNameLengthValue;
  onChange?: (value: FileNameLengthValue) => void;
};

export function FileNamePicker({
  value,
  defaultValue = "8",
  onChange,
}: FileNamePickerProps) {
  const [internal, setInternal] = useState<FileNameLengthValue>(defaultValue);
  const nameLen = value ?? internal;

  const setNameLen = (next: FileNameLengthValue) => {
    if (value === undefined) setInternal(next);
    onChange?.(next);
  };

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <p className="flex items-center gap-2 text-sm font-bold text-[var(--lb-text)]">
        <span className="lb-sticker px-2 py-0.5 text-[11px] leading-none">
          名前
        </span>
        File name length:
      </p>
      <div
        role="group"
        aria-label="File name length"
        className="flex w-full flex-wrap justify-start gap-2">
        {NAME_LEN_OPTIONS.map((opt) => (
          <PillButton
            key={opt.value}
            selected={nameLen === opt.value}
            onClick={() => setNameLen(opt.value)}>
            {opt.label}
          </PillButton>
        ))}
      </div>
    </div>
  );
}
