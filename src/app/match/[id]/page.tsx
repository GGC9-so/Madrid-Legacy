import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Badge from "@/components/Badge";
import LineupPitch from "@/components/LineupPitch";
import VideoSummary from "@/components/VideoSummary";
import { COMPETITIONS, resultOf } from "@/data/matches";
import { REPORTS, type MatchEvent } from "@/data/lineups";
import { findSummary } from "@/lib/youtube";
import { getMatches } from "@/lib/live";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const m = (await getMatches()).find((x) => x.id === id);
  return m ? { title: `Real Madrid - ${m.opponent}`, description: `Alineaciones, goles y estadísticas del partido ${COMPETITIONS[m.competition]} frente a ${m.opponent}.` } : {};
}

const label = (e: MatchEvent) =>
  e.type === "goal" ? `Gol de ${e.player}${e.note ? ` (${e.note})` : ""}${e.assist ? ` (asistencia de ${e.assist})` : ""}` : e.type === "yellow" ? `Tarjeta amarilla: ${e.player}` : e.type === "red" ? `Tarjeta roja: ${e.player}` : `Cambio: entra ${e.player}, sale ${e.out}`;

export default async function MatchPage({ params }: Props) {
  const { id } = await params;
  const m = (await getMatches()).find((x) => x.id === id);
  if (!m || m.status === "upcoming") notFound();

  const report = REPORTS[m.id];
  const hasPitch = !!report && (report.rm.rows.length > 0 || report.opp.rows.length > 0);
  const videoId = await findSummary(m);
  const home = m.venue === "home";
  const score = m.score ? (home ? `${m.score[0]} - ${m.score[1]}` : `${m.score[1]} - ${m.score[0]}`) : "vs";
  const date = new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${m.date}T12:00:00Z`));
  const result = resultOf(m);

  return (
    <>
      <section className="bg-night py-14 text-white lg:py-20">
        <div className="container-x">
          <Link href="/calendar" className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold"><ArrowLeft className="h-4 w-4" /> Volver al calendario</Link>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <Badge tone="gold">{COMPETITIONS[m.competition]}</Badge>
            <span className="text-sm text-white/60">{m.round}</span>
            {m.status === "live" && <span className="inline-flex items-center gap-2 rounded-full border border-loss/50 bg-loss/20 px-3 py-1 text-xs font-semibold text-white"><span className="h-2 w-2 animate-pulse rounded-full bg-loss" /> En juego</span>}
            {result && <Badge tone={result === "win" ? "win" : result === "loss" ? "loss" : "gold"}>{result === "win" ? "Victoria" : result === "loss" ? "Derrota" : "Empate"}</Badge>}
          </div>
          <h1 className="mt-5 text-4xl leading-tight sm:text-6xl">
            {home ? "Real Madrid" : m.opponent} <span className="px-2 text-gold">{score}</span> {home ? m.opponent : "Real Madrid"}
          </h1>
          <p className="mt-4 capitalize text-white/70">{date}{report?.stadium ? ` · ${report.stadium}` : ""}{report?.referee ? ` · Árbitro: ${report.referee}` : ""}</p>
        </div>
      </section>

      {report ? (
        <section className="container-x grid gap-14 py-14 lg:grid-cols-[1.2fr_1fr] lg:py-20">
          {hasPitch ? <LineupPitch matchId={m.id} report={report} /> : <p className="text-muted">Las alineaciones de este partido todavía no están cargadas.</p>}
          <div>
            <h2 className="text-3xl text-night">Cronología</h2>
            <ol className="mt-6 divide-y divide-gold/30 border-y border-gold/30">
              {report.events.map((e, i) => (
                <li key={i} className={`grid grid-cols-[4rem_1fr] gap-3 py-3 ${e.team === "rm" ? "border-l-4 border-l-gold pl-3" : "pl-4 text-night/70"}`}>
                  <span className="font-display tabular-nums text-gold-dark">{e.minute || "–"}</span>
                  <span className="text-night">{label(e)}</span>
                </li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-muted">Con barra dorada, los sucesos del Real Madrid.</p>
          </div>
        </section>
      ) : (
        <section className="container-x py-20 text-center">
          <h2 className="text-3xl text-night">Alineaciones y estadísticas próximamente</h2>
          <p className="mx-auto mt-3 max-w-md text-muted">Estamos preparando el once, los goles y los datos de este partido.</p>
        </section>
      )}

      {videoId && (
        <section className="container-x max-w-4xl pb-16 lg:pb-24">
          <h2 className="mb-6 text-3xl text-night">Resumen del partido</h2>
          <VideoSummary id={videoId} title={`Resumen: Real Madrid - ${m.opponent}`} />
        </section>
      )}
    </>
  );
}
