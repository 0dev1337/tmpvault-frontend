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
        "lb-pop flex-1 whitespace-nowrap rounded-full px-2 py-1.5 text-[13px] font-bold sm:flex-none sm:px-4 sm:text-sm",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--lb-blue-active)]",
        selected
          ? "bg-[var(--lb-blue-active-deep)] text-white"
          : "bg-[var(--lb-card)] text-[var(--lb-text)] hover:bg-[var(--lb-blue-pale)]",
        className,
      )}
    >
      {children}
    </button>
  );
}
