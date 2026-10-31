import { cn } from "@/lib/utils";

const INK = "stroke-[var(--lb-ink)]";
const BLUSH = "#f9b9cc";
const STRIPE = "#c9c9c9";

/** Hand-drawn neko (traced from the owner's sketch) sitting in a storage box */
export function MascotLogo({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("h-28 w-28 shrink-0 overflow-visible", className)}
      viewBox='20 120 720 640'
      fill='none'>
      {/* Box back flap — sits behind the cat */}
      <g transform='translate(0 107.5) scale(6.25)'>
        <path
          d='M14 63 L106 63 L98 56 L22 56 Z'
          className={cn("fill-[var(--lb-box-dark)]", INK)}
          strokeWidth='2.4'
          strokeLinejoin='round'
        />
      </g>

      {/* Body + head fill so the face stays opaque on any background */}
      <path
        d='M268 505 Q280 525 285 540 L285 578 Q300 582 310 570 L345 552 L370 572 Q384 580 396 574 L400 545 Q410 520 432 505 Z'
        className='fill-[var(--lb-cat)]'
      />
      <path
        d='M160 272 Q150 210 152 175 Q155 155 180 155 Q260 158 295 170 L310 192 Q390 182 478 198 L488 212 Q540 180 585 165 Q605 160 608 190 Q610 250 596 305 Q600 420 572 462 Q565 478 540 485 L320 492 Q230 490 185 445 Q150 380 160 272 Z'
        className='fill-[var(--lb-cat)]'
      />

      {/* Tabby stripes */}
      <g stroke={STRIPE} strokeWidth='24' strokeLinecap='round'>
        <path d='M318 212 L314 260' />
        <path d='M368 208 L366 260' />
        <path d='M416 208 L420 262' />
      </g>

      {/* Outline: left ear + head top + right ear, face bottom, body */}
      <g
        className={INK}
        strokeWidth='16'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <path d='M160 272 Q148 210 152 175 Q155 155 180 155 Q260 158 295 170 L310 192' />
        <path d='M305 192 Q390 182 478 198 L488 212 Q540 180 585 165 Q605 160 608 190 Q610 250 596 305' />
        <path d='M185 445 Q230 490 320 492 L540 485 Q565 478 572 462' />
        <path d='M268 505 Q280 525 285 540 L285 578 Q300 582 310 570 L345 552 L370 572 Q384 580 396 574 L400 545 Q410 520 432 505' />
        {/* Whiskers */}
        <path d='M80 316 L135 344' />
        <path d='M72 384 L130 393' />
        <path d='M615 358 L675 330' />
        <path d='M622 405 L690 408' />
      </g>

      {/* Big shiny eyes */}
      <ellipse
        cx='240'
        cy='378'
        rx='78'
        ry='82'
        transform='rotate(-10 240 378)'
        className='fill-[var(--lb-ink)]'
      />
      <ellipse cx='512' cy='392' rx='82' ry='76' className='fill-[var(--lb-ink)]' />
      <circle cx='233' cy='342' r='34' fill='white' />
      <circle cx='292' cy='430' r='7' fill='white' />
      <ellipse cx='503' cy='368' rx='40' ry='28' fill='white' />
      <circle cx='498' cy='440' r='7' fill='white' />

      {/* Blush */}
      <ellipse cx='175' cy='436' rx='25' ry='15' fill={BLUSH} />
      <ellipse cx='585' cy='455' rx='27' ry='15' fill={BLUSH} />

      {/* Box front, tape, clock sticker and sparkles (original 120-unit art, scaled) */}
      <g transform='translate(0 107.5) scale(6.25)'>
        <path
          d='M14 63 L106 63 L102 101 L18 101 Z'
          className={cn("fill-[var(--lb-box)]", INK)}
          strokeWidth='2.4'
          strokeLinejoin='round'
        />
        <rect
          x='54'
          y='63'
          width='12'
          height='38'
          className='fill-[var(--lb-box-dark)]'
          opacity='0.55'
        />
        <circle
          cx='86'
          cy='82'
          r='9'
          className={cn("fill-[var(--lb-blue-active-deep)]", INK)}
          strokeWidth='2'
        />
        <path
          d='M86 77 L86 82 L90 84'
          stroke='white'
          strokeWidth='2'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
        <path
          d='M108 8 L110 14 L116 16 L110 18 L108 24 L106 18 L100 16 L106 14 Z'
          className={cn("lb-twinkle fill-[var(--lb-sparkle)]", INK)}
          strokeWidth='1.2'
          strokeLinejoin='round'
        />
        <path
          d='M8 18 L9.2 22 L13 23 L9.2 24 L8 28 L6.8 24 L3 23 L6.8 22 Z'
          className={cn("lb-twinkle fill-[var(--lb-sparkle)]", INK)}
          strokeWidth='1.2'
          strokeLinejoin='round'
        />
      </g>
    </svg>
  );
}
