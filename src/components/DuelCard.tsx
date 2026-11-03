import { RARITY_LABEL, type Card } from "@/data/cards";

const BOX = {
  comun: "border-gold/40 bg-night text-white",
  epico: "border-gold bg-gradient-to-b from-night-light to-night text-white",
  mitico: "border-gold-light bg-gradient-to-br from-gold-light via-gold to-gold-dark text-night",
} as const;
const SUB = { comun: "text-white/70", epico: "text-gold-light", mitico: "text-night/75" } as const;
const YEARS = { comun: "text-gold", epico: "text-gold", mitico: "text-night" } as const;

type Props = { card: Card; state?: "idle" | "won" | "lost"; disabled?: boolean; onPick?: () => void };

export default function DuelCard({ card, state = "idle", disabled = false, onPick }: Props) {
  const s = state === "won" ? "scale-[1.03] ring-4 ring-gold shadow-gold" : state === "lost" ? "scale-95 opacity-40" : "enabled:hover:-translate-y-1 enabled:hover:shadow-gold";
  return (
    <button type="button" onClick={onPick} disabled={disabled} className={`flex h-full w-full flex-col rounded-2xl border-2 p-6 text-left shadow-card transition duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold sm:p-8 ${BOX[card.rarity]} ${s}`}>
      <span className={`text-xs font-semibold ${SUB[card.rarity]}`}>{RARITY_LABEL[card.rarity]}</span>
      <span className={`mt-4 block font-display leading-none tabular-nums ${card.years.length > 10 ? "text-xl sm:text-2xl" : "text-3xl sm:text-4xl"} ${YEARS[card.rarity]}`}>{card.years}</span>
      <span className="mt-3 block font-display text-3xl leading-tight sm:text-4xl">{card.name}</span>
      <span className={`mt-1 block text-sm ${SUB[card.rarity]}`}>{card.role}</span>
      <span className={`mt-5 block font-display text-lg italic leading-snug ${SUB[card.rarity]}`}>{card.headline}</span>
      <span className="mt-3 block text-sm leading-relaxed opacity-90">{card.bio}</span>
      {onPick && <span className="mt-auto block pt-6 text-sm font-semibold">Elegir a {card.name.split(" ")[0]}</span>}
    </button>
  );
}
