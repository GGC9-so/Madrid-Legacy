"use client";

import { useState, type ReactNode } from "react";
import SigningCard from "./SigningCard";
import { SIGNINGS } from "@/data/signings";
import { POSITIONS, type Position } from "@/data/players";

const decadeOf = (year: number) => Math.floor(year / 10) * 10;
const DECADES = Array.from(new Set(SIGNINGS.map((s) => decadeOf(s.year)))).sort((a, b) => a - b);

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${active ? "border-night bg-night text-white" : "border-gold/40 text-night hover:border-gold"}`}>
      {children}
    </button>
  );
}

export default function SigningsBrowser() {
  const [decade, setDecade] = useState<number | null>(null);
  const [pos, setPos] = useState<Position | null>(null);

  const list = SIGNINGS.map((signing, i) => ({ signing, rank: i + 1 })).filter(
    ({ signing }) => (decade === null || decadeOf(signing.year) === decade) && (pos === null || signing.position === pos),
  );

  return (
    <>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por década">
          <Pill active={decade === null} onClick={() => setDecade(null)}>Todas las épocas</Pill>
          {DECADES.map((d) => <Pill key={d} active={decade === d} onClick={() => setDecade(d)}>{d}s</Pill>)}
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filtrar por posición">
          <Pill active={pos === null} onClick={() => setPos(null)}>Todas las posiciones</Pill>
          {POSITIONS.map((p) => <Pill key={p.id} active={pos === p.id} onClick={() => setPos(p.id)}>{p.plural}</Pill>)}
        </div>
      </div>

      {list.length === 0 ? (
        <p className="mt-10 text-muted">Ningún fichaje cumple esos filtros. Prueba con otra década o posición.</p>
      ) : (
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {list.map(({ signing, rank }) => <li key={signing.slug}><SigningCard signing={signing} rank={rank} /></li>)}
        </ul>
      )}
    </>
  );
}
