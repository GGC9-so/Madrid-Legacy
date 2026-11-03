"use client";

import { useState } from "react";
import FilterPill from "./FilterPill";
import LegendCard from "./LegendCard";
import { LEGENDS, type LegendGroup } from "@/data/legends";

type Filter = "ALL" | LegendGroup;
const TABS: { id: Filter; label: string }[] = [
  { id: "ALL", label: "Todas" },
  { id: "POR", label: "Porteros" },
  { id: "DEF", label: "Defensas" },
  { id: "MED", label: "Medios" },
  { id: "DEL", label: "Delanteros" },
  { id: "BAN", label: "Banquillo y presidencia" },
];

export default function LegendsBrowser() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const list = filter === "ALL" ? LEGENDS : LEGENDS.filter((x) => x.group === filter);

  return (
    <>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar leyendas">
        {TABS.map((t) => (
          <FilterPill key={t.id} active={filter === t.id} onClick={() => setFilter(t.id)}>
            {t.label} <span className={filter === t.id ? "text-gold" : "text-muted"}>{t.id === "ALL" ? LEGENDS.length : LEGENDS.filter((x) => x.group === t.id).length}</span>
          </FilterPill>
        ))}
      </div>
      <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {list.map((x) => <li key={x.slug}><LegendCard legend={x} /></li>)}
      </ul>
    </>
  );
}
