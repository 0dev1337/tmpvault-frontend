/** Decorative falling sakura petals; fixed positions keep it static-render safe */
const PETALS = [
  { left: 4, delay: 0, duration: 13, size: 12 },
  { left: 14, delay: 6, duration: 16, size: 9 },
  { left: 24, delay: 2.5, duration: 12, size: 14 },
  { left: 36, delay: 9, duration: 15, size: 10 },
  { left: 47, delay: 4, duration: 17, size: 8 },
  { left: 58, delay: 11, duration: 13, size: 13 },
  { left: 68, delay: 1.5, duration: 14, size: 10 },
  { left: 78, delay: 7.5, duration: 18, size: 12 },
  { left: 88, delay: 3, duration: 12, size: 9 },
  { left: 95, delay: 10, duration: 16, size: 11 },
];

export function SakuraPetals() {
  return (
    <div
      aria-hidden
      className='pointer-events-none fixed inset-0 z-0 overflow-hidden'>
      {PETALS.map((p, i) => (
        <span
          key={i}
          className='lb-petal'
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
