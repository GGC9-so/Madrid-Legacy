import Link from "next/link";
import { RotateCcw } from "lucide-react";

type Props = { score: number; total: number; message: string; best?: number | null; onReplay: () => void };

export default function GameResult({ score, total, message, best, onReplay }: Props) {
  return (
    <div className="card p-8 text-center">
      <p className="font-display text-7xl tabular-nums text-gold-dark">{score}<span className="text-3xl text-muted"> / {total}</span></p>
      <p className="mt-3 text-xl text-night">{message}</p>
      {best != null && <p className="mt-2 text-sm text-muted">Mejor marcador: {best}</p>}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={onReplay} className="btn-gold"><RotateCcw className="h-4 w-4" /> Jugar de nuevo</button>
        <Link href="/games" className="btn-night">Más juegos</Link>
      </div>
    </div>
  );
}
