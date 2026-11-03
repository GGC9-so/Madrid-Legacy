import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Leaderboard from "@/components/Leaderboard";
import { seasonRecord, teamExtras } from "@/data/matches";
import { PLAYER_STATS, STATS_META } from "@/data/stats";
import { getMatches } from "@/lib/live";

export const metadata: Metadata = { title: "Estadísticas", description: "Goleadores, asistentes y números del Real Madrid en la temporada 2026/27." };

const top = (rows: { slug: string; value: number }[]) => rows.filter((r) => r.value > 0).sort((a, b) => b.value - a.value).slice(0, 8);

export default async function StatsPage() {
  const matches = await getMatches();
  const r = seasonRecord(matches);
  const x = teamExtras(matches);
  const team = [
    { label: "Partidos jugados", value: r.played },
    { label: "Victorias seguidas", value: x.streak },
    { label: "Goles a favor", value: r.goalsFor },
    { label: "Goles en contra", value: r.goalsAgainst },
    { label: "Porterías a cero", value: x.cleanSheets },
    { label: "En el Bernabéu", value: x.home },
    { label: "A domicilio", value: x.away },
    { label: "Mayor victoria", value: x.best },
  ];
  const goals = top(PLAYER_STATS.map((s) => ({ slug: s.slug, value: s.goals })));
  const assists = top(PLAYER_STATS.map((s) => ({ slug: s.slug, value: s.assists })));
  const both = top(PLAYER_STATS.map((s) => ({ slug: s.slug, value: s.goals + s.assists })));

  return (
    <>
      <section className="container-x py-16 lg:py-24">
        <SectionHeading title="La temporada en números" text="El equipo en todas las competiciones y los líderes individuales de LaLiga." className="mb-12" />
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((t) => (
            <div key={t.label} className="border-t border-gold/40 pt-4">
              <dd className="font-display text-3xl leading-snug tabular-nums text-night">{t.value}</dd>
              <dt className="mt-1 text-sm text-muted">{t.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="container-x">
          <p className="mb-10 text-sm text-muted">Estadísticas individuales de {STATS_META.scope} hasta {STATS_META.upTo}. Toca un jugador para ver su ficha.</p>
          <div className="grid gap-12 lg:grid-cols-3">
            <Leaderboard title="Máximos goleadores" rows={goals} unit="goles" />
            <Leaderboard title="Máximos asistentes" rows={assists} unit="asistencias" />
            <Leaderboard title="Goles más asistencias" rows={both} unit="participaciones en gol" />
          </div>
        </div>
      </section>
    </>
  );
}
