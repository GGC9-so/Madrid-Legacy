import { RARITY_LABEL, type Card } from "@/data/cards";

const STYLE = {
  comun: { box: "border-gold/40 bg-night text-white", sub: "text-white/65", years: "text-gold" },
  epico: { box: "border-gold bg-gradient-to-b from-night-light to-night text-white shadow-gold", sub: "text-gold-light", years: "text-gold" },
  mitico: { box: "border-gold-light bg-gradient-to-br from-gold-light via-gold to-gold-dark text-night shadow-gold", sub: "text-night/75", years: "text-night" },
} as const;

type Props = { card: Card; locked?: boolean; count?: number; isNew?: boolean };

export default function AlbumCard({ card, locked = false, count = 1, isNew = false }: Props) {
  if (locked) {
    return (
      <div className="flex aspect-[3/4] flex-col items-center justify-center rounded-xl border border-gold/20 bg-night/70 p-3 text-center text-white/40">
        <span className="font-display text-4xl">?</span>
        <span className="mt-2 text-xs">{RARITY_LABEL[card.rarity]}</span>
      </div>
    );
  }
  const s = STYLE[card.rarity];
  return (
    <div className={`flex h-full aspect-[3/4] flex-col justify-between rounded-xl border-2 p-3 sm:p-4 ${s.box}`}>
      <div className="flex items-start justify-between gap-2">
        <p className={`text-xs font-semibold ${s.sub}`}>{RARITY_LABEL[card.rarity]}</p>
        {isNew ? <span className="rounded-full bg-win px-2 py-0.5 text-xs font-bold text-white">¡Nueva!</span> : count > 1 ? <span className="rounded-full bg-gold px-2 py-0.5 text-xs font-bold text-night">×{count}</span> : null}
      </div>
      <div>
        <p className={`font-display leading-none tabular-nums ${card.years.length > 10 ? "text-lg" : "text-2xl sm:text-3xl"} ${s.years}`}>{card.years}</p>
        <h3 className="mt-2 text-lg leading-tight sm:text-xl">{card.name}</h3>
        <p className={`mt-1 text-xs ${s.sub}`}>{card.role}</p>
      </div>
      <p className={`font-display text-sm italic leading-snug ${s.sub}`}>{card.headline}</p>
    </div>
  );
}
