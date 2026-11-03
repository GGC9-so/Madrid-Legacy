import Link from "next/link";
import { getPlayer } from "@/data/players";

export default function Leaderboard({ title, rows, unit }: { title: string; rows: { slug: string; value: number }[]; unit: string }) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <section>
      <h2 className="text-2xl text-night">{title}</h2>
      <ol className="mt-5 space-y-4">
        {rows.map((r, i) => {
          const p = getPlayer(r.slug);
          if (!p) return null;
          return (
            <li key={r.slug}>
              <Link href={`/squad/${p.slug}`} className="group block">
                <div className="flex items-baseline justify-between gap-3">
                  <span className="flex items-baseline gap-3">
                    <span className="w-5 font-display tabular-nums text-gold-dark">{i + 1}</span>
                    <span className="font-semibold text-night transition-colors group-hover:text-gold-dark">{p.name}</span>
                  </span>
                  <span className="font-display text-xl tabular-nums text-night">{r.value}<span className="sr-only"> {unit}</span></span>
                </div>
                <div className="ml-8 mt-1 h-1.5 overflow-hidden rounded-full bg-night/10">
                  <div className={`h-full rounded-full ${i === 0 ? "bg-gold" : "bg-night/40"}`} style={{ width: `${(r.value / max) * 100}%` }} />
                </div>
              </Link>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
