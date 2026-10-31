import { cn } from "@/lib/utils";

const INK = "stroke-[var(--lb-ink)]";

/** Original chibi mascot "Vault-chan" holding a file folder */
export function VaultChan({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={cn("overflow-visible", className)}
      viewBox='0 0 160 220'
      fill='none'>
      {/* Twin tails */}
      <path
        d='M38 70 Q4 90 14 150 Q20 170 34 176 Q22 140 40 104 Z'
        className={cn("fill-[var(--lb-hair)]", INK)}
        strokeWidth='2.6'
        strokeLinejoin='round'
      />
      <path
        d='M122 70 Q156 90 146 150 Q140 170 126 176 Q138 140 120 104 Z'
        className={cn("fill-[var(--lb-hair)]", INK)}
        strokeWidth='2.6'
        strokeLinejoin='round'
      />
      {/* Hair ties */}
      <circle cx='38' cy='74' r='6' className={cn("fill-[var(--lb-accent)]", INK)} strokeWidth='2' />
      <circle cx='122' cy='74' r='6' className={cn("fill-[var(--lb-accent)]", INK)} strokeWidth='2' />
      {/* Legs + shoes */}
      <rect x='64' y='196' width='10' height='16' className='fill-[var(--lb-skin)]' />
      <rect x='86' y='196' width='10' height='16' className='fill-[var(--lb-skin)]' />
      <ellipse cx='68' cy='213' rx='9' ry='5' className={cn("fill-[var(--lb-accent)]", INK)} strokeWidth='2.2' />
      <ellipse cx='92' cy='213' rx='9' ry='5' className={cn("fill-[var(--lb-accent)]", INK)} strokeWidth='2.2' />
      {/* Dress */}
      <path
        d='M60 140 L100 140 L116 200 L44 200 Z'
        className={cn("fill-[var(--lb-blue-active-deep)]", INK)}
        strokeWidth='2.6'
        strokeLinejoin='round'
      />
      <path
        d='M64 140 L80 156 L96 140 Z'
        fill='white'
        className={INK}
        strokeWidth='2'
        strokeLinejoin='round'
      />
      <circle cx='80' cy='160' r='3' className='fill-[var(--lb-sparkle)]' />
      {/* Folder held in front */}
      <path
        d='M52 168 L66 168 L70 163 L84 163 L84 168 L108 168 L108 198 L52 198 Z'
        className={cn("fill-[var(--lb-box)]", INK)}
        strokeWidth='2.4'
        strokeLinejoin='round'
      />
      <circle cx='96' cy='184' r='7' className={cn("fill-[var(--lb-accent)]", INK)} strokeWidth='1.8' />
      <path
        d='M96 180 L96 184 L99 186'
        stroke='white'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <line x1='60' y1='180' x2='84' y2='180' className={INK} strokeWidth='2' strokeLinecap='round' opacity='0.5' />
      <line x1='60' y1='188' x2='78' y2='188' className={INK} strokeWidth='2' strokeLinecap='round' opacity='0.35' />
      {/* Hands */}
      <circle cx='52' cy='180' r='6' className={cn("fill-[var(--lb-skin)]", INK)} strokeWidth='2.2' />
      <circle cx='108' cy='180' r='6' className={cn("fill-[var(--lb-skin)]", INK)} strokeWidth='2.2' />
      {/* Head */}
      <circle cx='80' cy='88' r='50' className={cn("fill-[var(--lb-skin)]", INK)} strokeWidth='2.6' />
      {/* Bangs */}
      <path
        d='M30 92 Q26 36 80 34 Q134 36 130 92 L120 72 L110 86 L100 64 L90 82 L80 60 L70 82 L60 64 L50 86 L40 72 Z'
        className={cn("fill-[var(--lb-hair)]", INK)}
        strokeWidth='2.6'
        strokeLinejoin='round'
      />
      {/* Ahoge */}
      <path
        d='M80 36 Q86 12 102 18 Q88 20 84 36'
        className={cn("fill-[var(--lb-hair)]", INK)}
        strokeWidth='2.4'
        strokeLinejoin='round'
      />
      {/* Hair shine */}
      <path d='M50 56 Q60 46 72 44' stroke='white' strokeWidth='3' strokeLinecap='round' opacity='0.6' />
      {/* Star hair clip */}
      <path
        d='M114 50 L117 57 L124 58 L119 63 L120 70 L114 66 L108 70 L109 63 L104 58 L111 57 Z'
        className={cn("lb-twinkle fill-[var(--lb-sparkle)]", INK)}
        strokeWidth='1.6'
        strokeLinejoin='round'
      />
      {/* Eyes */}
      <ellipse cx='62' cy='100' rx='10' ry='13' className='fill-[var(--lb-ink)]' />
      <ellipse cx='98' cy='100' rx='10' ry='13' className='fill-[var(--lb-ink)]' />
      <ellipse cx='62' cy='106' rx='7' ry='5' className='fill-[var(--lb-accent)]' />
      <ellipse cx='98' cy='106' rx='7' ry='5' className='fill-[var(--lb-accent)]' />
      <circle cx='66' cy='95' r='4' fill='white' />
      <circle cx='102' cy='95' r='4' fill='white' />
      <circle cx='58' cy='106' r='1.8' fill='white' />
      <circle cx='94' cy='106' r='1.8' fill='white' />
      {/* Lashes */}
      <path d='M49 92 Q62 82 75 92' className={INK} strokeWidth='3.2' strokeLinecap='round' />
      <path d='M85 92 Q98 82 111 92' className={INK} strokeWidth='3.2' strokeLinecap='round' />
      {/* Blush */}
      <ellipse cx='48' cy='118' rx='8' ry='4' className='fill-[var(--lb-blush)]' opacity='0.5' />
      <ellipse cx='112' cy='118' rx='8' ry='4' className='fill-[var(--lb-blush)]' opacity='0.5' />
      <path d='M44 116 L47 120 M50 116 L53 120' className={INK} strokeWidth='1.2' strokeLinecap='round' opacity='0.5' />
      <path d='M108 116 L111 120 M114 116 L117 120' className={INK} strokeWidth='1.2' strokeLinecap='round' opacity='0.5' />
      {/* Open smile */}
      <path
        d='M72 117 Q80 127 88 117 Z'
        className={cn("fill-[#e24a6e]", INK)}
        strokeWidth='2'
        strokeLinejoin='round'
      />
    </svg>
  );
}
