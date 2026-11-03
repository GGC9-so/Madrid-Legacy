"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AlbumCard from "./AlbumCard";
import PackReveal from "./PackReveal";
import Skeleton from "./Skeleton";
import { CARDS, RARITY_PLURAL, type Card, type Rarity } from "@/data/cards";
import { todayKey } from "@/lib/dates";
import { drawPack } from "@/lib/packs";

const KEY = "madrid-legacy:album";
const DAILY_KEY = "madrid-legacy:daily";
const RARITIES: Rarity[] = ["mitico", "epico", "comun"];

type Store = { owned: Record<string, number>; lastDaily: string | null; lastExtra: string | null };
type Opening = { cards: { card: Card; isNew: boolean }[]; before: Record<string, number> };
const EMPTY: Store = { owned: {}, lastDaily: null, lastExtra: null };

export default function AlbumView() {
  const [store, setStore] = useState<Store>(EMPTY);
  const [today, setToday] = useState("");
  const [reto, setReto] = useState<{ score: number; total: number } | null>(null);
  const [opening, setOpening] = useState<Opening | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = todayKey();
    setToday(t);
    try { const raw = localStorage.getItem(KEY); if (raw) setStore({ ...EMPTY, ...JSON.parse(raw) }); } catch {}
    try { const d = JSON.parse(localStorage.getItem(DAILY_KEY) ?? "null"); if (d?.days?.[t]) setReto(d.days[t]); } catch {}
    setReady(true);
  }, []);

  if (!ready) return <Skeleton className="h-80" />;

  const dailyReady = store.lastDaily !== today;
  const extra = store.lastExtra === today ? "claimed" : !reto ? "pending" : reto.score / reto.total >= 0.5 ? "ready" : "low";

  const openPack = (kind: "daily" | "extra") => {
    const owned = { ...store.owned };
    const cards = drawPack().map((card) => {
      const isNew = !owned[card.slug];
      owned[card.slug] = (owned[card.slug] ?? 0) + 1;
      return { card, isNew };
    });
    const next: Store = { owned, lastDaily: kind === "daily" ? today : store.lastDaily, lastExtra: kind === "extra" ? today : store.lastExtra };
    setOpening({ cards, before: store.owned });
    setStore(next);
    try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
  };

  const view = opening ? opening.before : store.owned;
  const have = CARDS.filter((c) => view[c.slug]).length;

  return (
    <div>
      {opening && <div className="mb-12"><PackReveal cards={opening.cards} onClose={() => setOpening(null)} /></div>}

      <div className="mb-10 grid gap-4 md:grid-cols-2">
        <div className="card flex flex-col justify-between gap-5 p-6">
          <div>
            <h2 className="text-xl text-night">Sobre diario</h2>
            <p className="mt-1 text-muted">Tres cartas gratis cada día, siempre con una épica o mejor.</p>
          </div>
          {dailyReady ? (
            <button type="button" disabled={!!opening} onClick={() => openPack("daily")} className="btn-gold self-start disabled:opacity-50">Abrir sobre</button>
          ) : (
            <p className="font-semibold text-night">Ya abriste el de hoy. Vuelve mañana.</p>
          )}
        </div>
        <div className="card flex flex-col justify-between gap-5 p-6">
          <div>
            <h2 className="text-xl text-night">Sobre del Reto del Día</h2>
            <p className="mt-1 text-muted">
              {extra === "pending" && "Completa el Reto del Día con la mitad de los puntos o más y ganas otro sobre."}
              {extra === "low" && "Hoy no llegaste a la mitad de los puntos. Mañana tienes otra oportunidad."}
              {extra === "ready" && `¡Reto superado con ${reto?.score} de ${reto?.total}! Tienes un sobre extra.`}
              {extra === "claimed" && "Ya abriste el sobre extra de hoy."}
            </p>
          </div>
          {extra === "ready" && <button type="button" disabled={!!opening} onClick={() => openPack("extra")} className="btn-gold self-start disabled:opacity-50">Abrir sobre extra</button>}
          {extra === "pending" && <Link href="/daily" className="btn-night self-start">Jugar el Reto del Día</Link>}
        </div>
      </div>

      <div className="mb-2 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl text-night">Tu colección</h2>
        <p className="font-display text-2xl tabular-nums text-gold-dark">{have} / {CARDS.length}</p>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-night/10"><div className="h-full rounded-full bg-gold transition-all" style={{ width: `${(have / CARDS.length) * 100}%` }} /></div>

      {RARITIES.map((r) => {
        const list = CARDS.filter((c) => c.rarity === r);
        return (
          <section key={r} className="mt-12">
            <h2 className="text-2xl text-night">{RARITY_PLURAL[r]} <span className="text-muted">{list.filter((c) => view[c.slug]).length}/{list.length}</span></h2>
            <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {list.map((c) => <li key={c.slug}><AlbumCard card={c} locked={!view[c.slug]} count={view[c.slug]} /></li>)}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
