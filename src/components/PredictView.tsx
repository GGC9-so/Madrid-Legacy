"use client";

import { useEffect, useState } from "react";
import { Lock, Minus, Plus } from "lucide-react";
import Badge from "./Badge";
import Skeleton from "./Skeleton";
import StatsPill from "./StatsPill";
import { COMPETITIONS, type Match } from "@/data/matches";
import { todayKey } from "@/lib/dates";
import { loadPredictions, pointsFor, savePredictions, totalPoints, type Pred } from "@/lib/predictions";

const fmt = (d: string) => new Intl.DateTimeFormat("es-ES", { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(`${d}T12:00:00Z`));

function Stepper({ label, value, disabled, onChange }: { label: string; value: number; disabled: boolean; onChange: (v: number) => void }) {
  const btn = "grid h-9 w-9 place-items-center rounded-full border border-gold/50 text-night transition-colors enabled:hover:border-gold disabled:opacity-40";
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="max-w-[8rem] text-center text-sm font-semibold text-night">{label}</span>
      <div className="flex items-center gap-2">
        <button type="button" aria-label={`Quitar un gol a ${label}`} disabled={disabled || value === 0} onClick={() => onChange(value - 1)} className={btn}><Minus className="h-4 w-4" /></button>
        <span className="w-8 text-center font-display text-3xl tabular-nums text-night">{value}</span>
        <button type="button" aria-label={`Añadir un gol a ${label}`} disabled={disabled || value === 9} onClick={() => onChange(value + 1)} className={btn}><Plus className="h-4 w-4" /></button>
      </div>
    </div>
  );
}

export default function PredictView({ matches }: { matches: Match[] }) {
  const [preds, setPreds] = useState<Record<string, Pred>>({});
  const [today, setToday] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setPreds(loadPredictions());
    setToday(todayKey());
    setReady(true);
  }, []);

  if (!ready) return <Skeleton className="h-64" />;

  const change = (id: string, idx: 0 | 1, value: number) =>
    setPreds((prev) => {
      const cur: Pred = prev[id] ?? [0, 0];
      const next: Pred = idx === 0 ? [value, cur[1]] : [cur[0], value];
      const all = { ...prev, [id]: next };
      savePredictions(all);
      return all;
    });

  const upcoming = matches.filter((m) => m.status !== "finished").slice(0, 6);
  const graded = matches.filter((m) => m.status === "finished" && m.score && preds[m.id]).reverse();

  return (
    <div>
      <div className="mb-10 flex flex-wrap items-center gap-3">
        <StatsPill label="puntos de predicción" value={totalPoints(preds, matches)} />
        <p className="text-sm text-muted">Marcador exacto: 5 puntos. Acertar victoria, empate o derrota: 2 puntos. Se cierra el día del partido.</p>
      </div>

      <h2 className="text-2xl text-night">Próximos partidos</h2>
      <ul className="mt-2 divide-y divide-gold/30">
        {upcoming.map((m) => {
          const locked = today >= m.date;
          const pred = preds[m.id];
          const mine = { label: "Real Madrid", idx: 0 as const };
          const rival = { label: m.opponent, idx: 1 as const };
          const sides = m.venue === "home" ? [mine, rival] : [rival, mine];
          return (
            <li key={m.id} className="py-6">
              <div className="mb-5 flex flex-wrap items-center gap-2">
                <Badge tone={m.competition === "ucl" ? "night" : "gold"}>{COMPETITIONS[m.competition]}</Badge>
                <span className="text-sm capitalize text-muted">{fmt(m.date)}</span>
              </div>
              <div className="flex items-center justify-center gap-6 sm:gap-10">
                <Stepper label={sides[0].label} value={pred?.[sides[0].idx] ?? 0} disabled={locked} onChange={(v) => change(m.id, sides[0].idx, v)} />
                <span aria-hidden className="font-display text-2xl text-gold-dark">-</span>
                <Stepper label={sides[1].label} value={pred?.[sides[1].idx] ?? 0} disabled={locked} onChange={(v) => change(m.id, sides[1].idx, v)} />
              </div>
              <p className="mt-4 flex items-center justify-center gap-2 text-sm text-muted">
                {locked ? <><Lock className="h-4 w-4" aria-hidden /> Predicción cerrada</> : pred ? "Predicción guardada" : "Toca + para hacer tu predicción"}
              </p>
            </li>
          );
        })}
      </ul>

      {graded.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl text-night">Tus predicciones resueltas</h2>
          <ul className="mt-4 divide-y divide-gold/30 border-y border-gold/30">
            {graded.map((m) => {
              const p = pointsFor(preds[m.id], m.score!);
              return (
                <li key={m.id} className="flex flex-wrap items-center justify-between gap-3 py-4">
                  <div>
                    <p className="font-semibold text-night">Real Madrid {m.score![0]} - {m.score![1]} {m.opponent}</p>
                    <p className="text-sm text-muted">Tu predicción: {preds[m.id][0]} - {preds[m.id][1]}</p>
                  </div>
                  <Badge tone={p === 5 ? "win" : p === 2 ? "gold" : "loss"}>{p === 5 ? "Exacto +5" : p === 2 ? "Resultado +2" : "Fallo +0"}</Badge>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </div>
  );
}
