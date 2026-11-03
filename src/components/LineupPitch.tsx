"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowDown, Minus, Plus, Star } from "lucide-react";
import Badge from "./Badge";
import Jersey from "./Jersey";
import Modal from "./Modal";
import { PLAYER_STATS } from "@/data/stats";
import type { LPlayer, MatchReport, TeamLineup } from "@/data/lineups";

type Team = "rm" | "opp";
type Placed = { p: LPlayer; team: Team; x: number; y: number; row: number; rows: number };

const R_KEY = "madrid-legacy:match-ratings";
const M_KEY = "madrid-legacy:match-mvp";
const at = (minute: string) => (minute ? ` en el ${minute}` : "");
const ROLE = (row: number, rows: number) => (row === 0 ? "Portero" : row === 1 ? "Defensa" : row === rows - 1 ? "Delantero" : "Centrocampista");

// Real Madrid abajo (ataca hacia arriba) y el rival arriba. El rival mira hacia abajo, así que su izquierda es la derecha de la pantalla.
function place(team: Team, lineup: TeamLineup): Placed[] {
  const n = lineup.rows.length;
  return lineup.rows.flatMap((row, r) =>
    row.map((p, i) => {
      const xb = ((i + 1) / (row.length + 1)) * 100;
      const t = n > 1 ? r / (n - 1) : 0;
      return { p, team, row: r, rows: n, x: team === "rm" ? xb : 100 - xb, y: team === "rm" ? 94 - t * 38 : 6 + t * 38 };
    }),
  );
}

export default function LineupPitch({ matchId, report }: { matchId: string; report: MatchReport }) {
  const [sel, setSel] = useState<Placed | null>(null);
  const [open, setOpen] = useState(false);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [mvp, setMvp] = useState<string | null>(null);

  useEffect(() => {
    try { setRatings(JSON.parse(localStorage.getItem(R_KEY) ?? "{}")[matchId] ?? {}); } catch {}
    try { setMvp(JSON.parse(localStorage.getItem(M_KEY) ?? "{}")[matchId] ?? null); } catch {}
  }, [matchId]);

  const persist = (storageKey: string, value: unknown) => {
    try { const all = JSON.parse(localStorage.getItem(storageKey) ?? "{}"); all[matchId] = value; localStorage.setItem(storageKey, JSON.stringify(all)); } catch {}
  };
  const setRating = (k: string, v: number | null) =>
    setRatings((prev) => {
      const next = { ...prev };
      if (v === null) delete next[k]; else next[k] = Math.min(10, Math.max(1, v));
      persist(R_KEY, next);
      return next;
    });
  const toggleMvp = (k: string) => { const v = mvp === k ? null : k; setMvp(v); persist(M_KEY, v); };

  const statsOf = (team: Team, name: string) => {
    const ev = report.events.filter((e) => e.team === team);
    return {
      goals: ev.filter((e) => e.type === "goal" && e.player === name),
      assists: ev.filter((e) => e.type === "goal" && e.assist === name),
      yellow: ev.filter((e) => e.type === "yellow" && e.player === name),
      red: ev.filter((e) => e.type === "red" && e.player === name),
      off: ev.find((e) => e.type === "sub" && e.out === name),
      on: ev.find((e) => e.type === "sub" && e.player === name),
    };
  };

  const all = [...place("opp", report.opp), ...place("rm", report.rm)];
  const kit = (t: Team) => (t === "rm" ? report.rm : report.opp);

  const s = sel ? statsOf(sel.team, sel.p.name) : null;
  const key = sel ? `${sel.team}:${sel.p.name}` : "";
  const season = sel?.p.slug ? PLAYER_STATS.find((x) => x.slug === sel.p.slug) : undefined;
  const r = ratings[key];
  const stepBtn = "grid h-9 w-9 place-items-center rounded-full border border-gold/50 text-night transition-colors hover:border-gold";

  return (
    <div>
      <p className="mb-2 flex justify-between text-sm"><span className="font-semibold text-night">{report.opp.name}</span><span className="text-muted">{report.opp.formation}</span></p>
      <div className="relative mx-auto aspect-[3/4.2] w-full max-w-xl overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-b from-night-light to-night bg-[repeating-linear-gradient(180deg,rgba(255,255,255,0.035)_0_9%,transparent_9%_18%)] shadow-card">
        <div aria-hidden className="absolute inset-3 rounded-lg border border-gold/30" />
        <div aria-hidden className="absolute inset-x-3 top-1/2 h-px bg-gold/30" />
        <div aria-hidden className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/30" />
        <div aria-hidden className="absolute inset-x-[24%] top-3 h-[13%] border border-t-0 border-gold/30" />
        <div aria-hidden className="absolute inset-x-[24%] bottom-3 h-[13%] border border-b-0 border-gold/30" />

        {report.opp.rows.length === 0 && <p className="absolute inset-x-6 top-[18%] text-center text-sm text-white/60">Once del rival no disponible</p>}

        {all.map((pl) => {
          const st = statsOf(pl.team, pl.p.name);
          const k = `${pl.team}:${pl.p.name}`;
          const t = kit(pl.team);
          return (
            <button key={k} type="button" onClick={() => { setSel(pl); setOpen(true); }} aria-label={pl.p.number ? `${pl.p.name}, dorsal ${pl.p.number}` : pl.p.name} style={{ left: `${pl.x}%`, top: `${pl.y}%` }} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold">
              <span className="relative">
                <Jersey color={t.kit} textColor={t.kitText} number={pl.p.number} size={46} />
                {st.goals.length > 0 && (
                  <span title="Goles" className="absolute -left-2 -top-1 flex items-center gap-0.5 rounded-full bg-white px-1 py-0.5 text-[10px] font-bold leading-none text-night shadow">
                    <span className="h-2.5 w-2.5 rounded-full border-2 border-night" />{st.goals.length > 1 ? `×${st.goals.length}` : ""}
                  </span>
                )}
                {st.yellow.length > 0 && <span title="Tarjeta amarilla" className="absolute -right-1 -top-2 h-3.5 w-2.5 rounded-[2px] bg-[#FACC15] shadow" />}
                {st.red.length > 0 && <span title="Tarjeta roja" className="absolute -right-1 -top-2 h-3.5 w-2.5 rounded-[2px] bg-loss shadow" />}
                {st.off && <ArrowDown aria-label="Sustituido" className="absolute -bottom-1 -left-2 h-4 w-4 rounded-full bg-loss p-0.5 text-white" />}
                {pl.p.captain && <span title="Capitán" className="absolute -bottom-1 -right-2 grid h-4 w-4 place-items-center rounded-full bg-gold text-[9px] font-bold text-night">C</span>}
                {mvp === k && <Star aria-label="Tu MVP" className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 fill-gold text-gold" />}
                {ratings[k] !== undefined && <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-night px-1.5 text-[10px] font-bold leading-4 text-gold ring-1 ring-gold/60">{ratings[k].toFixed(1)}</span>}
              </span>
              <span className="mt-1.5 max-w-[5.5rem] truncate text-[11px] font-semibold text-white [text-shadow:0_1px_2px_rgba(0,0,0,0.6)]">{pl.p.name}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-2 flex justify-between text-sm"><span className="font-semibold text-night">{report.rm.name}</span><span className="text-muted">{report.rm.formation}</span></p>
      <p className="mt-4 text-center text-sm text-muted">Toca una camiseta para ver sus datos y ponerle nota. Tus notas se guardan en este navegador. La colocación dentro de cada línea es orientativa.</p>

      <Modal open={open} onClose={() => setOpen(false)} title={sel?.p.name ?? "Jugador"}>
        {sel && s && (
          <>
            <div className="flex items-center gap-4">
              <Jersey color={kit(sel.team).kit} textColor={kit(sel.team).kitText} number={sel.p.number} size={72} />
              <div>
                <h2 className="text-3xl text-night">{sel.p.name}</h2>
                <p className="text-sm text-muted">{kit(sel.team).name} · {ROLE(sel.row, sel.rows)}</p>
                {sel.p.captain && <div className="mt-1"><Badge>Capitán</Badge></div>}
              </div>
            </div>

            <h3 className="mt-6 text-lg text-night">En este partido</h3>
            <ul className="mt-2 space-y-1 text-night/80">
              {s.goals.map((e, i) => <li key={`g${i}`}>Gol{at(e.minute)}</li>)}
              {s.assists.map((e, i) => <li key={`a${i}`}>Asistencia{at(e.minute)}</li>)}
              {s.yellow.map((e, i) => <li key={`y${i}`}>Tarjeta amarilla{at(e.minute)}</li>)}
              {s.red.map((e, i) => <li key={`r${i}`}>Tarjeta roja{at(e.minute)}</li>)}
              {s.off && <li>Sustituido{at(s.off.minute)} por {s.off.player}</li>}
              {!s.goals.length && !s.assists.length && !s.yellow.length && !s.red.length && !s.off && <li className="text-muted">Sin incidencias destacadas.</li>}
            </ul>
            {season && <p className="mt-4 text-sm text-muted">En LaLiga 2026/27: <strong className="text-night">{season.goals}</strong> goles y <strong className="text-night">{season.assists}</strong> asistencias.</p>}

            <div className="mt-6 border-t border-gold/30 pt-5">
              <p className="text-sm font-semibold text-night">Tu nota</p>
              <div className="mt-2 flex items-center gap-3">
                <button type="button" aria-label="Bajar la nota" onClick={() => setRating(key, (r ?? 7) - 0.5)} className={stepBtn}><Minus className="h-4 w-4" /></button>
                <span className="w-14 text-center font-display text-3xl tabular-nums text-night">{r !== undefined ? r.toFixed(1) : "—"}</span>
                <button type="button" aria-label="Subir la nota" onClick={() => setRating(key, (r ?? 6.5) + 0.5)} className={stepBtn}><Plus className="h-4 w-4" /></button>
                {r !== undefined && <button type="button" onClick={() => setRating(key, null)} className="text-sm text-muted hover:underline">Quitar</button>}
              </div>
              <button type="button" onClick={() => toggleMvp(key)} aria-pressed={mvp === key} className={`mt-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${mvp === key ? "border-gold bg-gold/15 text-night" : "border-gold/40 text-night hover:border-gold"}`}>
                <Star className={`h-4 w-4 ${mvp === key ? "fill-gold text-gold" : ""}`} /> {mvp === key ? "Es tu MVP del partido" : "Elegir como MVP del partido"}
              </button>
            </div>
            {sel.p.slug && <Link href={`/squad/${sel.p.slug}`} className="mt-5 inline-block text-sm font-semibold text-gold-dark hover:underline">Ver su ficha</Link>}
          </>
        )}
      </Modal>
    </div>
  );
}
