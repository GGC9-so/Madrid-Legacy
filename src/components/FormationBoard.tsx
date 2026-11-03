import { getPlayer } from "@/data/players";
import type { Formation } from "@/data/formations";

type Props = {
  formation: Formation;
  lineup: Record<string, string>;
  activeSlot: string | null;
  onSelect: (slotId: string) => void;
};

export default function FormationBoard({ formation, lineup, activeSlot, onSelect }: Props) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-xl overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-b from-night-light to-night shadow-card">
      <div aria-hidden className="absolute inset-3 rounded-lg border border-gold/30" />
      <div aria-hidden className="absolute inset-x-3 top-1/2 h-px bg-gold/30" />
      <div aria-hidden className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30" />
      <div aria-hidden className="absolute inset-x-[22%] top-3 h-[14%] border border-t-0 border-gold/30" />
      <div aria-hidden className="absolute inset-x-[22%] bottom-3 h-[14%] border border-b-0 border-gold/30" />

      {formation.slots.map((slot) => {
        const player = getPlayer(lineup[slot.id] ?? "");
        const active = activeSlot === slot.id;
        return (
          <button
            key={slot.id}
            type="button"
            onClick={() => onSelect(slot.id)}
            aria-label={player ? `${slot.label}: ${player.name}` : `Elegir ${slot.label}`}
            style={{ left: `${slot.x}%`, top: `${slot.y}%` }}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold"
          >
            <span className={`grid h-12 w-12 place-items-center rounded-full border-2 font-display text-lg transition sm:h-14 sm:w-14 ${player ? "border-gold bg-white text-night" : "border-dashed border-gold/60 text-gold"} ${active ? "scale-110 ring-4 ring-gold/40" : ""}`}>
              {player ? player.number : "+"}
            </span>
            <span className="max-w-[5.5rem] truncate text-[11px] font-semibold text-white">{player ? player.short : slot.label}</span>
          </button>
        );
      })}
    </div>
  );
}
