"use client";

import { cn } from "@/lib/utils";

type PillButtonProps = {
  children: React.ReactNode;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
};

export function PillButton({
  children,
  selected = false,
  onClick,
  className,
}: PillButtonProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "rounded-full px-5 py-2 text-sm transition-colors",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lb-blue-active)]",
        selected
          ? "bg-[var(--lb-blue-active-deep)] font-bold text-white"
          : "bg-[var(--lb-blue-pale)] font-normal text-[var(--lb-blue-active-deep)] hover:brightness-[0.97]",
        className,
      )}
    >
      {children}
    </button>
  );
}
