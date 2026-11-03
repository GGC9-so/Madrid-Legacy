"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { Download, RotateCcw, Share2, Undo2 } from "lucide-react";
import DuelCard from "./DuelCard";
import { CARDS, type Card } from "@/data/cards";
import type { LegendGroup } from "@/data/legends";
import { shuffle } from "@/lib/random";
import { renderChampion } from "@/lib/tournamentImage";

type Phase = "setup" | "duel" | "done";
type Group = "ALL" | LegendGroup;
type Entry = { round: string; a: Card; b: Card; w: Card };
type Snap = { bracket: Card[]; pairIdx: number; winners: Card[]; history: Entry[] };
type Store = { played: number; champions: Record<string, number>; wins: Record<string, number>; losses: Record<string, number> };

const KEY = "madrid-legacy:torneo";
const EMPTY: Store = { played: 0, champions: {}, wins: {}, losses: {} };
const GROUPS: { id: Group; label: string }[] = [
  { id: "ALL", label: "Todas las leyendas" },
  { id: "DEL", label: "Delanteros" },
  { id: "MED", label: "Medios" },
  { id: "DEF", label: "Defensas" },
];
const SIZES = [8, 16];
const roundName = (n: number) => (n === 2 ? "Final" : n === 4 ? "Semifinales" : n === 8 ? "Cuartos de final" : "Octavos de final");
const poolOf = (g: Group) => (g === "ALL" ? CARDS : CARDS.filter((c) => c.group === g));

function Pill({ active, disabled, onClick, children }: { active: boolean; disabled?: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" disabled={disabled} aria-pressed={active} onClick={onClick} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-40 ${active ? "border-night bg-night text-white" : "border-gold/40 text-night enabled:hover:border-gold"}`}>
      {children}
    </button>
  );
}

export default function Tournament() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [group, setGroup] = useState<Group>("ALL");
  const [size, setSize] = useState(16);
  const [bracket, setBracket] = useState<Card[]>([]);
  const [pairIdx, setPairIdx] = useState(0);
  const [winners, setWinners] = useState<Card[]>([]);
  const [history, setHistory] = useState<Entry[]>([]);
  const [stack, setStack] = useState<Snap[]>([]);
  const [picked, setPicked] = useState<Card | null>(null);
  const [champion, setChampion] = useState<Card | null>(null);
  const [store, setStore] = useState<Store>(EMPTY);
  const [canShare, setCanShare] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) setStore({ ...EMPTY, ...JSON.parse(raw) }); } catch {}
    setCanShare(!!navigator.share && !!navigator.canShare);
  }, []);

  const pool = poolOf(group);
  const changeSize = (s: number) => { setSize(s); if (poolOf(group).length < s) setGroup("ALL"); };

  const start = () => {
    setBracket(shuffle(pool).slice(0, size));
    setPairIdx(0); setWinners([]); setHistory([]); setStack([]); setPicked(null); setChampion(null);
    setPhase("duel");
  };

  const finish = (w: Card, hist: Entry[]) => {
    const next: Store = { played: store.played + 1, champions: { ...store.champions, [w.slug]: (store.champions[w.slug] ?? 0) + 1 }, wins: { ...store.wins }, losses: { ...store.losses } };
    hist.forEach((e) => {
      const loser = e.a.slug === e.w.slug ? e.b : e.a;
      next.wins[e.w.slug] = (next.wins[e.w.slug] ?? 0) + 1;
      next.losses[loser.slug] = (next.losses[loser.slug] ?? 0) + 1;
    });
    setStore(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
    setHistory(hist); setChampion(w); setPicked(null); setPhase("done");
  };

  const advance = (w: Card) => {
    const entry: Entry = { round: roundName(bracket.length), a: bracket[pairIdx * 2], b: bracket[pairIdx * 2 + 1], w };
    const hist = [...history, entry];
    const wins = [...winners, w];
    const snap: Snap = { bracket, pairIdx, winners, history };
    setPicked(null);
    if ((pairIdx + 1) * 2 < bracket.length) { setStack([...stack, snap]); setHistory(hist); setWinners(wins); setPairIdx(pairIdx + 1); return; }
    if (wins.length === 1) { finish(w, hist); return; }
    setStack([...stack, snap]); setHistory(hist); setBracket(wins); setWinners([]); setPairIdx(0);
  };

  const choose = (w: Card) => {
    if (picked) return;
    setPicked(w);
    setTimeout(() => advance(w), 700);
  };

  const undo = () => {
    const s = stack[stack.length - 1];
    if (!s || picked) return;
    setBracket(s.bracket); setPairIdx(s.pairIdx); setWinners(s.winners); setHistory(s.history); setStack(stack.slice(0, -1));
  };

  const exportImage = async (mode: "download" | "share") => {
    if (!champion) return;
    setBusy(true);
    try {
      const finalEntry = history[history.length - 1];
      const finalist = finalEntry ? (finalEntry.a.slug === champion.slug ? finalEntry.b : finalEntry.a) : undefined;
      const semis = history.filter((e) => e.round === "Semifinales").map((e) => (e.a.slug === e.w.slug ? e.b : e.a));
      const canvas = await renderChampion(champion, finalist, semis, size);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;
      const file = new File([blob], "mi-campeon-madridista.png", { type: "image/png" });
      if (mode === "share" && navigator.canShare?.({ files: [file] })) { await navigator.share({ files: [file], title: "Mi mejor madridista de la historia" }); return; }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "mi-campeon-madridista.png"; a.click();
      URL.revokeObjectURL(url);
    } catch {
      // se canceló el menú de compartir o el navegador no lo permite
    } finally {
      setBusy(false);
    }
  };

  // ---------- Preparación
  if (phase === "setup") {
    const ranking = Object.keys(store.wins)
      .map((slug) => ({ card: CARDS.find((c) => c.slug === slug), wins: store.wins[slug] ?? 0, titles: store.champions[slug] ?? 0 }))
      .filter((r): r is { card: Card; wins: number; titles: number } => !!r.card)
      .sort((a, b) => b.titles - a.titles || b.wins - a.wins)
      .slice(0, 5);

    return (
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr]">
        <div className="card p-6 sm:p-8">
          <p className="font-semibold text-night">¿Quién compite?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {GROUPS.map((g) => <Pill key={g.id} active={group === g.id} disabled={poolOf(g.id).length < size} onClick={() => setGroup(g.id)}>{g.label} {poolOf(g.id).length}</Pill>)}
          </div>
          <p className="mt-6 font-semibold text-night">¿Cuántas leyendas?</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {SIZES.map((s) => <Pill key={s} active={size === s} disabled={poolOf("ALL").length < s} onClick={() => changeSize(s)}>{s} leyendas</Pill>)}
          </div>
          <p className="mt-6 text-muted">Se sortean {size} nombres, se enfrentan por eliminatoria y tú decides cada duelo hasta coronar a tu campeón.</p>
          <button type="button" onClick={start} disabled={pool.length < size} className="btn-gold mt-8 disabled:opacity-50">Empezar el torneo</button>
        </div>

        <div>
          <h2 className="text-2xl text-night">Tu ranking personal</h2>
          {ranking.length === 0 ? (
            <p className="mt-3 text-muted">Juega tu primer torneo y aquí aparecerán tus leyendas favoritas.</p>
          ) : (
            <>
              <ol className="mt-4 divide-y divide-gold/30 border-y border-gold/30">
                {ranking.map((r, i) => (
                  <li key={r.card.slug} className="flex items-baseline justify-between gap-4 py-3">
                    <span><span className="mr-3 font-display tabular-nums text-gold-dark">{i + 1}</span><span className="font-semibold text-night">{r.card.name}</span></span>
                    <span className="text-sm text-muted">{r.titles > 0 ? `${r.titles} ${r.titles === 1 ? "título" : "títulos"} · ` : ""}{r.wins} {r.wins === 1 ? "victoria" : "victorias"}</span>
                  </li>
                ))}
              </ol>
              <p className="mt-3 text-sm text-muted">Torneos jugados: {store.played}</p>
            </>
          )}
        </div>
      </div>
    );
  }

  // ---------- Resultado
  if (phase === "done" && champion) {
    const rounds = history.reduce<Record<string, Entry[]>>((acc, e) => { (acc[e.round] ||= []).push(e); return acc; }, {});
    return (
      <div>
        <p className="text-center font-display text-3xl text-night sm:text-4xl">Tu mejor madridista de la historia</p>
        <div className="mx-auto mt-8 max-w-md"><DuelCard card={champion} state="won" disabled /></div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button type="button" disabled={busy} onClick={() => exportImage("download")} className="btn-gold disabled:opacity-50"><Download className="h-4 w-4" /> {busy ? "Creando imagen…" : "Descargar imagen"}</button>
          {canShare && <button type="button" disabled={busy} onClick={() => exportImage("share")} className="btn-night disabled:opacity-50"><Share2 className="h-4 w-4" /> Compartir</button>}
          <button type="button" onClick={() => setPhase("setup")} className="btn-ghost-dark"><RotateCcw className="h-4 w-4" /> Jugar otro torneo</button>
        </div>
        <h2 className="mt-14 text-2xl text-night">Así fue tu torneo</h2>
        <div className="mt-4 grid gap-8 md:grid-cols-2">
          {Object.entries(rounds).map(([name, list]) => (
            <section key={name}>
              <h3 className="text-lg text-gold-dark">{name}</h3>
              <ul className="mt-2 space-y-1 text-night/80">
                {list.map((e, i) => (
                  <li key={i}>
                    <span className={e.w.slug === e.a.slug ? "font-semibold text-night" : "text-muted"}>{e.a.name}</span> vs <span className={e.w.slug === e.b.slug ? "font-semibold text-night" : "text-muted"}>{e.b.name}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    );
  }

  // ---------- Duelo
  const a = bracket[pairIdx * 2];
  const b = bracket[pairIdx * 2 + 1];
  if (!a || !b) return null;
  const duels = bracket.length / 2;
  const stateOf = (c: Card) => (!picked ? "idle" : picked.slug === c.slug ? "won" : "lost");

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm text-muted">
        <span><strong className="text-night">{roundName(bracket.length)}</strong> · duelo {pairIdx + 1} de {duels}</span>
        <span>{history.length} / {size - 1}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-night/10"><div className="h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${(history.length / (size - 1)) * 100}%` }} /></div>

      <div className="mt-8 grid items-stretch gap-4 md:grid-cols-2 md:gap-8">
        <motion.div key={`${bracket.length}-${pairIdx}-a`} initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <DuelCard card={a} state={stateOf(a)} disabled={!!picked} onPick={() => choose(a)} />
        </motion.div>
        <span aria-hidden className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-night font-display text-lg text-gold md:hidden">VS</span>
        <motion.div key={`${bracket.length}-${pairIdx}-b`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}>
          <DuelCard card={b} state={stateOf(b)} disabled={!!picked} onPick={() => choose(b)} />
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button type="button" onClick={undo} disabled={stack.length === 0 || !!picked} className="inline-flex items-center gap-2 text-sm font-semibold text-night disabled:opacity-40"><Undo2 className="h-4 w-4" /> Deshacer</button>
        <button type="button" onClick={() => setPhase("setup")} className="text-sm text-muted hover:underline">Abandonar torneo</button>
      </div>
    </div>
  );
}
