type Props = { color: string; textColor: string; number?: number; size?: number };

export default function Jersey({ color, textColor, number, size = 44 }: Props) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden>
      <path d="M16 4 L6 10 L2 22 L10 25 L12 20 L12 44 L36 44 L36 20 L38 25 L46 22 L42 10 L32 4 C30 8 18 8 16 4 Z" fill={color} stroke="rgba(0,0,0,0.3)" strokeWidth="1.5" strokeLinejoin="round" />
      {number !== undefined && <text x="24" y="33" textAnchor="middle" fontSize="15" fontWeight="700" fill={textColor} style={{ fontFamily: "var(--font-display), Georgia, serif" }}>{number}</text>}
    </svg>
  );
}
