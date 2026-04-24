import { cn } from "@/lib/utils";

/** Minimal share-bin mark with timer cue */
export function BoxLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn(
        "h-[4.5rem] w-[4.5rem] shrink-0 text-[var(--lb-blue-active-deep)] dark:text-[var(--lb-blue-active)]",
        className,
      )}
      viewBox='0 0 72 96'
      fill='none'>
      {/* File body */}
      <path
        d='M6 0 L54 0 L72 18 L72 88 L6 88 Z'
        fill='currentColor'
        fillOpacity='0.12'
        stroke='currentColor'
        strokeWidth='2.2'
        strokeLinejoin='round'
      />
      {/* Folded corner */}
      <path
        d='M54 0 L54 18 L72 18'
        fill='currentColor'
        fillOpacity='0.25'
        stroke='currentColor'
        strokeWidth='2.2'
        strokeLinejoin='round'
      />
      {/* Lines fading out */}
      <line
        x1='16'
        y1='32'
        x2='62'
        y2='32'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
      />
      <line
        x1='16'
        y1='43'
        x2='62'
        y2='43'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        opacity='0.6'
      />
      <line
        x1='16'
        y1='54'
        x2='52'
        y2='54'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        opacity='0.3'
      />
      <line
        x1='16'
        y1='65'
        x2='40'
        y2='65'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        opacity='0.1'
      />
      {/* Clock badge — center at 62,78 r=16 → bottom edge 94, fits in viewBox 96 */}
      <circle cx='62' cy='78' r='16' fill='currentColor' />
      <circle cx='62' cy='78' r='2' fill='white' />
      {/* Hour hand */}
      <line
        x1='62'
        y1='78'
        x2='62'
        y2='69'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
      />
      {/* Minute hand */}
      <line
        x1='62'
        y1='78'
        x2='68'
        y2='81'
        stroke='white'
        strokeWidth='2'
        strokeLinecap='round'
        opacity='0.55'
      />
      {/* Tick marks */}
      <line
        x1='62'
        y1='65.5'
        x2='62'
        y2='67.5'
        stroke='white'
        strokeWidth='1.2'
        strokeLinecap='round'
        opacity='0.45'
      />
      <line
        x1='75'
        y1='78'
        x2='73'
        y2='78'
        stroke='white'
        strokeWidth='1.2'
        strokeLinecap='round'
        opacity='0.45'
      />
      <line
        x1='62'
        y1='90.5'
        x2='62'
        y2='88.5'
        stroke='white'
        strokeWidth='1.2'
        strokeLinecap='round'
        opacity='0.45'
      />
      <line
        x1='49'
        y1='78'
        x2='51'
        y2='78'
        stroke='white'
        strokeWidth='1.2'
        strokeLinecap='round'
        opacity='0.45'
      />
    </svg>
  );
}
