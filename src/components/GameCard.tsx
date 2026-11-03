import Link from "next/link";
import Badge from "./Badge";
import type { Game } from "@/data/games";

export default function GameCard({ game }: { game: Game }) {
  const content = (
    <>
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/50 text-gold-dark">
        <game.icon className="h-6 w-6" aria-hidden />
      </span>
      <div>
        <h3 className="text-xl leading-snug text-night">{game.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{game.text}</p>
        <div className="mt-3"><Badge tone={game.ready ? "win" : "night"}>{game.ready ? "Jugable" : "Próximamente"}</Badge></div>
      </div>
    </>
  );
  const base = "card flex gap-5 p-5 sm:p-6";
  return game.ready ? (
    <Link href={`/games/${game.slug}`} className={`${base} card-hover`}>{content}</Link>
  ) : (
    <div className={`${base} opacity-70`}>{content}</div>
  );
}
