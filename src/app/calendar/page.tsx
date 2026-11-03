import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import StatsPill from "@/components/StatsPill";
import CalendarView from "@/components/CalendarView";
import { seasonRecord } from "@/data/matches";
import { getMatches } from "@/lib/live";

export const metadata: Metadata = { title: "Calendario", description: "Calendario y resultados del Real Madrid 2026/27 en LaLiga y Champions League." };

export default async function CalendarPage() {
  const matches = await getMatches();
  const r = seasonRecord(matches);
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Calendario 2026/27" text="Resultados y próximos partidos. Horarios de España; fechas y horas pueden cambiar." className="mb-8" />
      <div className="mb-10 flex flex-wrap gap-3">
        <StatsPill label="jugados" value={r.played} />
        <StatsPill label="victorias" value={r.wins} />
        <StatsPill label="empates" value={r.draws} />
        <StatsPill label="derrotas" value={r.losses} />
        <StatsPill label="goles a favor / en contra" value={`${r.goalsFor} / ${r.goalsAgainst}`} />
      </div>
      <CalendarView matches={matches} />
    </section>
  );
}
