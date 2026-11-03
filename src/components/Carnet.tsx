"use client";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import Skeleton from "./Skeleton";
import { CARDS } from "@/data/cards";
import type { Match } from "@/data/matches";
import { todayKey } from "@/lib/dates";
import { PROFILE_KEY, readProfile } from "@/lib/profile";

type Saved = { name: string; since: string };

export default function Carnet({ matches }: { matches: Match[] }) {
  const [data, setData] = useState<ReturnType<typeof readProfile> | null>(null);
  const [saved, setSaved] = useState<Saved>({ name: "", since: "" });

  useEffect(() => {
    let s: Saved = { name: "", since: todayKey() };
    try { const raw = localStorage.getItem(PROFILE_KEY); if (raw) s = { ...s, ...JSON.parse(raw) }; localStorage.setItem(PROFILE_KEY, JSON.stringify(s)); } catch {}
    setSaved(s);
    setData(readProfile(matches));
  }, []);

  if (!data) return <Skeleton className="h-96" />;

  const rename = (name: string) => {
    const s = { ...saved, name };
    setSaved(s);
    try { localStorage.setItem(PROFILE_KEY, JSON.stringify(s)); } catch {}
  };

  const { level, next, xp } = data;
  const pct = next ? ((xp - level.min) / (next.min - level.min)) * 100 : 100;
  const stats = [
    { label: "Racha actual", value: `${data.streak} ${data.streak === 1 ? "día" : "días"}` },
    { label: "Mejor racha", value: `${data.bestStreak} ${data.bestStreak === 1 ? "día" : "días"}` },
    { label: "Retos del Día", value: data.challenges },
    { label: "Cromos", value: `${data.cards} / ${CARDS.length}` },
    { label: "Puntos de predicción", value: data.predPoints },
    { label: "Torneos de leyendas", value: data.tournaments },
    { label: "11 ideal", value: `${data.xiCount} / 11` },
  ];

  return (
    <div>
      <div className="mx-auto max-w-xl rounded-2xl border-2 border-gold bg-gradient-to-br from-night-light to-night p-7 text-white shadow-gold sm:p-9">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-gold-light">Carné de madridista</p>
            <label htmlFor="carnet-name" className="sr-only">Tu nombre</label>
            <input id="carnet-name" value={saved.name} onChange={(e) => rename(e.target.value)} maxLength={30} placeholder="Tu nombre" className="mt-2 w-full border-b border-gold/50 bg-transparent pb-1 font-display text-3xl text-white placeholder:text-white/40 focus:border-gold focus:outline-none" />
          </div>
          <Logo className="h-16 w-auto" />
        </div>
        <p className="mt-8 font-display text-5xl text-gold">{level.name}</p>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/15"><div className="h-full rounded-full bg-gold transition-all" style={{ width: `${pct}%` }} /></div>
        <p className="mt-2 text-sm text-white/70">{xp} puntos{next ? ` · te faltan ${next.min - xp} para ser ${next.name}` : " · nivel máximo"}</p>
        {saved.since && <p className="mt-6 text-xs text-white/50">Socio desde {saved.since}</p>}
      </div>

      <dl className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-t border-gold/40 pt-3">
            <dd className="font-display text-3xl tabular-nums text-night">{s.value}</dd>
            <dt className="mt-1 text-sm text-muted">{s.label}</dt>
          </div>
        ))}
      </dl>

      {data.bests.length > 0 && (
        <>
          <h2 className="mt-12 text-2xl text-night">Tus mejores marcadores</h2>
          <ul className="mt-4 divide-y divide-gold/30 border-y border-gold/30">
            {data.bests.map((b) => (
              <li key={b.title} className="flex justify-between gap-4 py-3"><span className="text-night">{b.title}</span><strong className="font-display text-xl tabular-nums text-gold-dark">{b.best}</strong></li>
            ))}
          </ul>
        </>
      )}
      <p className="mt-8 text-sm text-muted">Los puntos salen de tus cromos, retos, rachas, predicciones, torneos, 11 ideal y mejores marcadores. Todo se guarda en este navegador.</p>
    </div>
  );
}
