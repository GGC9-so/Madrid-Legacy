"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PlayerCard from "./PlayerCard";
import { PLAYERS, POSITIONS, type Position } from "@/data/players";

type Filter = "ALL" | Position;

const TABS: { id: Filter; label: string }[] = [{ id: "ALL", label: "Todos" }, ...POSITIONS.map((p) => ({ id: p.id as Filter, label: p.plural }))];

export default function SquadGrid() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const list = filter === "ALL" ? PLAYERS : PLAYERS.filter((p) => p.position === filter);

  return (
    <>
      <div role="tablist" aria-label="Filtrar por posición" className="flex flex-wrap gap-2">
        {TABS.map((t) => {
          const active = filter === t.id;
          const count = t.id === "ALL" ? PLAYERS.length : PLAYERS.filter((p) => p.position === t.id).length;
          return (
            <button key={t.id} role="tab" aria-selected={active} onClick={() => setFilter(t.id)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active ? "border-night bg-night text-white" : "border-gold/40 text-night hover:border-gold"}`}>
              {t.label} <span className={active ? "text-gold" : "text-muted"}>{count}</span>
            </button>
          );
        })}
      </div>
      <motion.ul layout className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {list.map((p) => (
          <motion.li layout key={p.slug} initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.25 }}>
            <PlayerCard player={p} />
          </motion.li>
        ))}
      </motion.ul>
    </>
  );
}
