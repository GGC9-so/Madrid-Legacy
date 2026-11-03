"use client";

import { useState } from "react";
import FilterPill from "./FilterPill";
import MatchCard from "./MatchCard";
import { COMPETITIONS, type Competition, type Match } from "@/data/matches";

type View = "upcoming" | "finished" | "all";
type Comp = "all" | Competition;

const VIEWS: { id: View; label: string }[] = [
  { id: "upcoming", label: "Próximos" },
  { id: "finished", label: "Finalizados" },
  { id: "all", label: "Toda la temporada" },
];

const byDate = (a: Match, b: Match) => a.date.localeCompare(b.date) || (a.time ?? "").localeCompare(b.time ?? "");

export default function CalendarView({ matches }: { matches: Match[] }) {
  const nextId = matches.filter((m) => m.status !== "finished").sort(byDate)[0]?.id;
  const [view, setView] = useState<View>("upcoming");
  const [comp, setComp] = useState<Comp>("all");

  const list = matches.filter((m) => (view === "all" || (m.status === "finished") === (view === "finished")) && (comp === "all" || m.competition === comp)).sort(byDate);
  if (view === "finished") list.reverse();

  const groups = list.reduce<Record<string, Match[]>>((acc, m) => {
    (acc[m.date.slice(0, 7)] ||= []).push(m);
    return acc;
  }, {});

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Estado del partido">
          {VIEWS.map((v) => <FilterPill key={v.id} active={view === v.id} onClick={() => setView(v.id)}>{v.label}</FilterPill>)}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Competición">
          <FilterPill active={comp === "all"} onClick={() => setComp("all")}>Todas las competiciones</FilterPill>
          {(Object.keys(COMPETITIONS) as Competition[]).map((c) => <FilterPill key={c} active={comp === c} onClick={() => setComp(c)}>{COMPETITIONS[c]}</FilterPill>)}
        </div>
      </div>

      {list.length === 0 && <p className="mt-10 text-muted">No hay partidos con estos filtros.</p>}

      {Object.entries(groups).map(([month, matches]) => (
        <section key={month} className="mt-10">
          <h2 className="mb-4 text-2xl capitalize text-night">
            {new Intl.DateTimeFormat("es-ES", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${month}-15T12:00:00Z`))}
          </h2>
          <ul className="space-y-3">
            {matches.map((m) => <li key={m.id}><MatchCard match={m} isNext={m.id === nextId} /></li>)}
          </ul>
        </section>
      ))}
    </>
  );
}
