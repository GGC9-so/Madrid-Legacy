"use client";

import { useEffect, useState } from "react";
import { Download, RotateCcw, Share2 } from "lucide-react";
import FormationBoard from "./FormationBoard";
import Badge from "./Badge";
import { FORMATIONS } from "@/data/formations";
import { PLAYERS } from "@/data/players";
import { renderLineup } from "@/lib/lineupImage";

type Lineup = Record<string, string>;
const KEY = "madrid-legacy:ideal-xi";

export default function IdealXI() {
  const [formationId, setFormationId] = useState(FORMATIONS[0].id);
  const [lineups, setLineups] = useState<Record<string, Lineup>>({});
  const [active, setActive] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [canShare, setCanShare] = useState(false);

  useEffect(() => {
    setCanShare(typeof navigator !== "undefined" && !!navigator.share && !!navigator.canShare);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setFormationId(saved.formation);
        setLineups(saved.lineups ?? {});
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify({ formation: formationId, lineups })); } catch {}
  }, [ready, formationId, lineups]);

  const formation = FORMATIONS.find((f) => f.id === formationId) ?? FORMATIONS[0];
  const lineup = lineups[formation.id] ?? {};
  const slot = formation.slots.find((s) => s.id === active);
  const used = new Set(Object.values(lineup));
  const filled = Object.keys(lineup).length;
  const candidates = slot
    ? PLAYERS.filter((p) => !used.has(p.slug)).sort((a, b) => Number(b.position === slot.role) - Number(a.position === slot.role))
    : [];

  const assign = (slug: string | null) => {
    if (!slot) return;
    setLineups((prev) => {
      const next = { ...(prev[formation.id] ?? {}) };
      if (slug) next[slot.id] = slug; else delete next[slot.id];
      return { ...prev, [formation.id]: next };
    });
    setActive(null);
  };

  const exportImage = async (mode: "download" | "share") => {
    setBusy(true);
    try {
      const canvas = await renderLineup(formation, lineup);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;
      const file = new File([blob], "mi-11-ideal.png", { type: "image/png" });
      if (mode === "share" && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: "Mi 11 ideal del Real Madrid" });
        return;
      }
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "mi-11-ideal.png";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // el usuario canceló el menú de compartir o el navegador no lo permite
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_22rem]">
      <div>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          {FORMATIONS.map((f) => (
            <button key={f.id} onClick={() => { setFormationId(f.id); setActive(null); }} aria-pressed={f.id === formation.id} className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${f.id === formation.id ? "border-night bg-night text-white" : "border-gold/40 text-night hover:border-gold"}`}>
              {f.name}
            </button>
          ))}
          <span className="text-sm text-muted">{filled}/11 titulares · se guarda solo</span>
          <button onClick={() => { setLineups((p) => ({ ...p, [formation.id]: {} })); setActive(null); }} className="ml-auto inline-flex items-center gap-2 text-sm font-semibold text-loss hover:underline">
            <RotateCcw className="h-4 w-4" /> Resetear
          </button>
        </div>
        <FormationBoard formation={formation} lineup={lineup} activeSlot={active} onSelect={(id) => setActive(id === active ? null : id)} />
        <div className="mx-auto mt-6 flex max-w-xl flex-wrap items-center gap-3">
          <button type="button" disabled={filled === 0 || busy} onClick={() => exportImage("download")} className="btn-gold disabled:opacity-50">
            <Download className="h-4 w-4" /> {busy ? "Creando imagen…" : "Descargar imagen"}
          </button>
          {canShare && (
            <button type="button" disabled={filled === 0 || busy} onClick={() => exportImage("share")} className="btn-night disabled:opacity-50">
              <Share2 className="h-4 w-4" /> Compartir
            </button>
          )}
          <p className="text-sm text-muted">Formato vertical, ideal para Instagram y estados de WhatsApp.</p>
        </div>
      </div>

      <aside aria-live="polite" className="card h-fit p-5">
        {!slot ? (
          <p className="text-muted">Toca una posición del campo para elegir a tu jugador.</p>
        ) : (
          <>
            <h2 className="text-xl text-night">Elige tu {slot.label}</h2>
            {lineup[slot.id] && <button onClick={() => assign(null)} className="mt-2 text-sm font-semibold text-loss hover:underline">Quitar jugador actual</button>}
            <ul className="mt-4 max-h-[28rem] space-y-1 overflow-y-auto pr-1">
              {candidates.map((p) => (
                <li key={p.slug}>
                  <button onClick={() => assign(p.slug)} className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors hover:bg-gold/10">
                    <span className="w-7 font-display text-lg text-gold-dark">{p.number}</span>
                    <span className="flex-1 text-night">{p.name}</span>
                    {p.position === slot.role && <Badge>Ideal</Badge>}
                  </button>
                </li>
              ))}
              {candidates.length === 0 && <li className="text-muted">Ya usaste a toda la plantilla.</li>}
            </ul>
          </>
        )}
      </aside>
    </div>
  );
}
