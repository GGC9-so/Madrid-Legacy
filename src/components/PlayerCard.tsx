import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";
import { PHOTOS } from "@/data/photos";
import { positionLabel, type Player } from "@/data/players";

export default function PlayerCard({ player }: { player: Player }) {
  const photo = PHOTOS[player.slug];
  return (
    <Link href={`/squad/${player.slug}`} className={`card card-hover group relative block overflow-hidden p-5 ${photo ? "min-h-[18rem]" : ""}`}>
      {photo && (
        <>
          <Image src={photo.src} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-top" />
          <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/30 to-transparent" />
        </>
      )}
      <span aria-hidden className={`pointer-events-none absolute -right-1 -top-5 font-display text-[7.5rem] leading-none transition-colors ${photo ? "text-white/25" : "text-gold/20 group-hover:text-gold/40"}`}>
        {player.number}
      </span>
      <div className="relative flex min-h-[9.5rem] flex-col justify-end">
        <span className="self-start"><Badge>{positionLabel(player.position)}</Badge></span>
        <h3 className={`mt-3 text-xl leading-tight ${photo ? "text-white" : "text-night"}`}>{player.name}</h3>
        <p className={`mt-1 text-sm ${photo ? "text-white/75" : "text-muted"}`}>{player.country}</p>
      </div>
    </Link>
  );
}
