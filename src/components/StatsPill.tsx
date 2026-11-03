export default function StatsPill({ label, value }: { label: string; value: string | number }) {
  return (
    <span className="inline-flex items-baseline gap-2 rounded-full border border-gold/30 bg-white px-4 py-1.5 text-sm shadow-card">
      <strong className="font-display text-base text-night">{value}</strong>
      <span className="text-muted">{label}</span>
    </span>
  );
}
