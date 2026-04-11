import { cn } from "@/lib/utils";

/** Open box — line art similar to Litterbox branding */
export function BoxLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn(
        "h-[4.5rem] w-[4.5rem] shrink-0 text-[var(--lb-blue-active-deep)] dark:text-[var(--lb-blue-active)]",
        className,
      )}
      viewBox="0 0 72 72"
    >
      <path
        d="M8 28 L36 12 L64 28 L64 52 L36 62 L8 52 Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M8 28 L36 38 L64 28"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M36 12 L36 38"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
      <path
        d="M36 38 L36 62"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}
