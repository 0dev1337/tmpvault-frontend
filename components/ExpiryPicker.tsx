"use client";

import { useState } from "react";
import { PillButton } from "@/components/PillButton";

export const EXPIRY_OPTIONS = [
  { value: "1h", label: "1 Hour" },
  { value: "12h", label: "12 Hours" },
  { value: "1d", label: "1 Day" },
  { value: "3d", label: "3 Days" },
] as const;

export type ExpiryValue = (typeof EXPIRY_OPTIONS)[number]["value"];

type ExpiryPickerProps = {
  value?: ExpiryValue;
  defaultValue?: ExpiryValue;
  onChange?: (value: ExpiryValue) => void;
};

export function ExpiryPicker({
  value,
  defaultValue = "1h",
  onChange,
}: ExpiryPickerProps) {
  const [internal, setInternal] = useState<ExpiryValue>(defaultValue);
  const expiry = value ?? internal;
  const setExpiry = (v: ExpiryValue) => {
    if (value === undefined) setInternal(v);
    onChange?.(v);
  };

  return (
    <div className="mt-2 flex w-full flex-col items-start gap-2.5">
      <p className="text-sm font-bold text-[var(--lb-text)]">Expire after:</p>
      <div
        role="group"
        aria-label="Expiry duration"
        className="flex w-full flex-wrap justify-start gap-2"
      >
        {EXPIRY_OPTIONS.map((opt) => (
          <PillButton
            key={opt.value}
            selected={expiry === opt.value}
            onClick={() => setExpiry(opt.value)}
          >
            {opt.label}
          </PillButton>
        ))}
      </div>
    </div>
  );
}
