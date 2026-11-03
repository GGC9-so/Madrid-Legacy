import type { ReactNode } from "react";

export default function FilterPill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active ? "border-night bg-night text-white" : "border-gold/40 text-night hover:border-gold"}`}>
      {children}
    </button>
  );
}
