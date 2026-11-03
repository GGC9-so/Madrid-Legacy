import Badge from "./Badge";
import type { Legend } from "@/data/legends";

export default function LegendCard({ legend }: { legend: Legend }) {
  return (
    <article className="flex h-full flex-col rounded-xl border border-gold/40 bg-night p-6 text-white shadow-card">
      <p className="font-display text-3xl tabular-nums text-gold">{legend.years}</p>
      <h3 className="mt-4 text-2xl">{legend.name}</h3>
      <div className="mt-2"><Badge>{legend.role}</Badge></div>
      <p className="mt-4 font-display text-lg italic text-gold-light">{legend.headline}</p>
      <p className="mt-2 leading-relaxed text-white/70">{legend.bio}</p>
    </article>
  );
}
