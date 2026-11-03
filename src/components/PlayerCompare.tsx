"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Shuffle, ArrowLeftRight } from "lucide-react";
import RadarChart from "./RadarChart";
import { AXES, RATINGS } from "@/data/ratings";
import { PLAYERS, POSITIONS, getPlayer, positionLabel } from "@/data/players";
import { PLAYER_STATS } from "@/data/stats";

const OPTIONS = PLAYERS.filter((p) => RATINGS[p.slug]);
const COLORS = ["#C4A35A", "#0B1F3A"];
const avg = (v: number[]) => v.reduce((n, x) => n + x, 0) / v.length;

function PlayerSelect({ label, value, onChange, color }: { label: string; value: string; onChange: (v: string) => void; color: string }) {
  return (
    <div>
      <label htmlFor={`sel-${label}`} className="flex items-center gap-2 text-sm font-semibold text-night">
        <span aria-hidden className="h-3 w-3 rounded-full" style={{ background: color }} /> {label}
      </label>
      <select id={`sel-${label}`} value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full rounded-xl border border-gold/50 bg-white px-4 py-3 font-display text-xl text-night focus:border-gold focus:outline-none">
        {POSITIONS.filter((pos) => OPTIONS.some((p) => p.position === pos.id)).map((pos) => (
          <optgroup key={pos.id} label={pos.plural}>
            {OPTIONS.filter((p) => p.position === pos.id).map((p) => <option key={p.slug} value={p.slug}>{p.name}</option>)}
          </optgroup>
        ))}
      </select>
    </div>
  );
}

export default function PlayerCompare() {
  const [a, setA] = useState("kylian-mbappe");
  const [b, setB] = useState("vinicius-junior");

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const qa = q.get("a"), qb = q.get("b");
    if (qa && RATINGS[qa]) setA(qa);
    if (qb && RATINGS[qb]) setB(qb);
  }, []);

  useEffect(() => {
    window.history.replaceState(null, "", `?a=${a}&b=${b}`);
  }, [a, b]);

  const pa = getPlayer(a)!;
  const pb = getPlayer(b)!;
  const va = RATINGS[a];
  const vb = RATINGS[b];
  const wins = va.reduce((n, v, i) => n + (v > vb[i] ? 1 : 0), 0);
  const losses = va.reduce((n, v, i) => n + (v < vb[i] ? 1 : 0), 0);
  const random = () => {
    const [x, y] = [...OPTIONS].sort(() => Math.random() - 0.5);
    setA(x.slug); setB(y.slug);
  };
  const season = (slug: string) => PLAYER_STATS.find((s) => s.slug === slug);

  const verdict =
    wins === losses ? `${pa.name} y ${pb.name} están igualados: ${wins} categorías para cada uno.`
    : wins > losses ? `${pa.name} gana en ${wins} de ${AXES.length} categorías; ${pb.name} en ${losses}.`
    : `${pb.name} gana en ${losses} de ${AXES.length} categorías; ${pa.name} en ${wins}.`;

  return (
    <div>
      <div className="grid items-end gap-4 sm:grid-cols-[1fr_auto_1fr]">
        <PlayerSelect label="Jugador 1" value={a} onChange={setA} color={COLORS[0]} />
        <button type="button" onClick={() => { setA(b); setB(a); }} aria-label="Intercambiar jugadores" className="mx-auto grid h-11 w-11 place-items-center rounded-full border border-gold/50 text-night transition-colors hover:border-gold"><ArrowLeftRight className="h-5 w-5" /></button>
        <PlayerSelect label="Jugador 2" value={b} onChange={setB} color={COLORS[1]} />
      </div>
      <div className="mt-4 text-center">
        <button type="button" onClick={random} className="inline-flex items-center gap-2 text-sm font-semibold text-gold-dark hover:underline"><Shuffle className="h-4 w-4" /> Duelo aleatorio</button>
      </div>

      <div className="mt-10 grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
        <RadarChart key={`${a}-${b}`} axes={AXES} series={[{ label: pa.name, color: COLORS[0], values: va }, { label: pb.name, color: COLORS[1], values: vb }]} />

        <div>
          <p className="font-display text-2xl leading-snug text-night">{verdict}</p>
          <p className="mt-2 text-muted">Valoración media: <strong className="text-night">{avg(va).toFixed(1)}</strong> contra <strong className="text-night">{avg(vb).toFixed(1)}</strong>.</p>

          <ul className="mt-6 space-y-3">
            {AXES.map((axis, i) => (
              <li key={axis}>
                <div className="grid grid-cols-[2.5rem_1fr_2.5rem] items-center gap-3 text-sm">
                  <span className={`text-right font-display text-lg tabular-nums ${va[i] >= vb[i] ? "text-gold-dark" : "text-muted"}`}>{va[i]}</span>
                  <span className="text-center text-night">{axis}</span>
                  <span className={`font-display text-lg tabular-nums ${vb[i] >= va[i] ? "text-night" : "text-muted"}`}>{vb[i]}</span>
                </div>
                <div className="mt-1 flex h-1.5 gap-1">
                  <div className="flex flex-1 justify-end overflow-hidden rounded-full bg-night/10"><div className="h-full rounded-full" style={{ width: `${va[i]}%`, background: COLORS[0] }} /></div>
                  <div className="flex-1 overflow-hidden rounded-full bg-night/10"><div className="h-full rounded-full" style={{ width: `${vb[i]}%`, background: COLORS[1] }} /></div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {[pa, pb].map((p, k) => {
          const s = season(p.slug);
          return (
            <section key={p.slug} className="card p-6" style={{ borderColor: COLORS[k] }}>
              <h2 className="text-2xl text-night">{p.name}</h2>
              <p className="mt-1 text-sm text-muted">Dorsal {p.number} · {positionLabel(p.position)} · {p.country}</p>
              <p className="mt-3 text-sm text-night/80">{p.bio}</p>
              <p className="mt-3 text-sm text-muted">{s ? <>LaLiga 2026/27: <strong className="text-night">{s.goals}</strong> goles y <strong className="text-night">{s.assists}</strong> asistencias.</> : "Sin goles ni asistencias registrados en LaLiga esta temporada."}</p>
              <Link href={`/squad/${p.slug}`} className="mt-3 inline-block text-sm font-semibold text-gold-dark hover:underline">Ver su ficha</Link>
            </section>
          );
        })}
      </div>
      <p className="mt-8 text-sm text-muted">Las valoraciones son editoriales (0-99), basadas en el estilo de juego de cada futbolista; no son datos oficiales. Los goles y asistencias sí son reales.</p>
    </div>
  );
}
