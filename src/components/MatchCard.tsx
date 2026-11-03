import Link from "next/link";
import { VIDEOS } from "@/data/videos";
import Badge from "./Badge";
import { COMPETITIONS, resultOf, type Match } from "@/data/matches";

const RESULT = {
  win: { label: "Victoria", tone: "win", bar: "border-l-win" },
  draw: { label: "Empate", tone: "gold", bar: "border-l-gold" },
  loss: { label: "Derrota", tone: "loss", bar: "border-l-loss" },
} as const;

const fmt = (opts: Intl.DateTimeFormatOptions, d: Date) => new Intl.DateTimeFormat("es-ES", { ...opts, timeZone: "UTC" }).format(d);

export default function MatchCard({ match, isNext = false }: { match: Match; isNext?: boolean }) {
  const d = new Date(`${match.date}T12:00:00Z`);
  const result = resultOf(match);
  const home = match.venue === "home";
  const left = home ? "Real Madrid" : match.opponent;
  const right = home ? match.opponent : "Real Madrid";
  const centre = match.score ? (home ? `${match.score[0]} - ${match.score[1]}` : `${match.score[1]} - ${match.score[0]}`) : "vs";
  const bar = result ? RESULT[result].bar : match.status === "live" ? "border-l-loss" : "border-l-night/30";

  return (
    <article className={`card grid grid-cols-[3.5rem_1fr] items-center gap-4 border-l-4 p-4 sm:grid-cols-[4.5rem_1fr_auto] sm:p-5 ${bar} ${isNext ? "ring-2 ring-gold/60" : ""}`}>
      <div className="text-center">
        <p className="font-display text-4xl leading-none tabular-nums text-night">{d.getUTCDate()}</p>
        <p className="mt-1 text-xs text-muted">{fmt({ month: "short" }, d)}</p>
      </div>
      <div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone={match.competition === "ucl" ? "night" : "gold"}>{COMPETITIONS[match.competition]}</Badge>
          <span className="text-xs text-muted">{match.round}</span>
        </div>
        <h3 className="mt-2 text-xl leading-snug text-night sm:text-2xl">
          {left} <span className="px-1 text-gold-dark">{centre}</span> {right}
        </h3>
        <p className="mt-1 text-sm capitalize text-muted">
          {fmt({ weekday: "long" }, d)}
          <span className="normal-case">{match.time ? ` · ${match.time} h (España)` : ""} · {home ? "Local" : "Visitante"}</span>
        </p>
      </div>
      <div className="col-span-2 flex items-center gap-2 sm:col-span-1 sm:flex-col sm:items-end">
        {result ? (
          <>
            <Badge tone={RESULT[result].tone}>{RESULT[result].label}</Badge>
            <span className="text-xs text-muted">Finalizado</span>
          </>
        ) : match.status === "live" ? (
          <span className="inline-flex items-center gap-2 rounded-full border border-loss/30 bg-loss/10 px-3 py-1 text-xs font-semibold text-loss">
            <span className="h-2 w-2 animate-pulse rounded-full bg-loss" /> En juego
          </span>
        ) : (
          <Badge tone={isNext ? "night" : "gold"}>{isNext ? "Siguiente partido" : "Próximo"}</Badge>
        )}
        {match.status !== "upcoming" && <Link href={`/match/${match.id}`} className="text-xs font-semibold text-gold-dark hover:underline">{VIDEOS[match.id] ? "Alineaciones, estadísticas y resumen" : "Alineaciones y estadísticas"}</Link>}
      </div>
    </article>
  );
}
