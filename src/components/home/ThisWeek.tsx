import Link from "next/link";
import MatchCard from "@/components/MatchCard";
import SectionHeading from "@/components/SectionHeading";
import StatsPill from "@/components/StatsPill";
import DaysLeft from "./DaysLeft";
import { lastMatch, lastResults, nextMatch, resultOf } from "@/data/matches";
import { getPlayer } from "@/data/players";
import { PLAYER_STATS } from "@/data/stats";
import { getLeague, getMatches } from "@/lib/live";

const CHIP = { win: { l: "V", c: "bg-win" }, draw: { l: "E", c: "bg-gold" }, loss: { l: "D", c: "bg-loss" } } as const;
const leader = (key: "goals" | "assists") => [...PLAYER_STATS].sort((a, b) => b[key] - a[key])[0];

export default async function ThisWeek() {
  const matches = await getMatches();
  const league = await getLeague();
  const next = nextMatch(matches);
  const last = lastMatch(matches);
  const form = lastResults(5, matches);
  const scorer = leader("goals");
  const assister = leader("assists");

  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Esta semana en el Madrid" />
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-8">
          {next && (
            <div>
              <div className="mb-3 flex items-baseline justify-between gap-4">
                <h3 className="text-xl text-night">Siguiente partido</h3>
                <DaysLeft date={next.date} />
              </div>
              <MatchCard match={next} isNext />
              <Link href="/predict" className="mt-3 inline-block text-sm font-semibold text-gold-dark hover:underline">Predice el marcador y gana puntos</Link>
            </div>
          )}
          {last && (
            <div>
              <h3 className="mb-3 text-xl text-night">Último resultado</h3>
              <MatchCard match={last} />
            </div>
          )}
        </div>

        <aside className="space-y-9">
          <div>
            <h3 className="text-xl text-night">Forma reciente</h3>
            <ul className="mt-3 flex gap-2">
              {form.map((m) => {
                const chip = CHIP[resultOf(m)!];
                return <li key={m.id} title={m.opponent} className={`grid h-10 w-10 place-items-center rounded-lg font-bold text-white ${chip.c}`}>{chip.l}</li>;
              })}
            </ul>
          </div>
          <div>
            <h3 className="text-xl text-night">En LaLiga</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              <StatsPill label="en la tabla" value={`${league.position}.º`} />
              <StatsPill label="puntos" value={league.points} />
            </div>
          </div>
          <div>
            <h3 className="text-xl text-night">Líderes de la temporada</h3>
            <ul className="mt-3 space-y-2 text-night/80">
              <li>Goles: <strong className="text-night">{getPlayer(scorer.slug)?.name}</strong> ({scorer.goals})</li>
              <li>Asistencias: <strong className="text-night">{getPlayer(assister.slug)?.name}</strong> ({assister.assists})</li>
            </ul>
            <Link href="/stats" className="mt-3 inline-block text-sm font-semibold text-gold-dark hover:underline">Ver todas las estadísticas</Link>
          </div>
        </aside>
      </div>
    </section>
  );
}
