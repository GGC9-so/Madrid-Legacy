import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Badge from "@/components/Badge";
import { PHOTOS } from "@/data/photos";
import { RATINGS } from "@/data/ratings";
import StatsPill from "@/components/StatsPill";
import { PLAYERS, getPlayer, positionLabel } from "@/data/players";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PLAYERS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const player = getPlayer((await params).slug);
  return player ? { title: player.name, description: player.bio } : {};
}

export default async function PlayerPage({ params }: Props) {
  const player = getPlayer((await params).slug);
  if (!player) notFound();
  const photo = PHOTOS[player.slug];

  return (
    <article className="relative isolate overflow-hidden bg-night text-white">
      <span aria-hidden className="absolute -right-4 top-0 -z-10 font-display text-[16rem] leading-none text-gold/15 sm:text-[26rem]">{player.number}</span>
      <div className="container-x py-16 sm:py-24">
        <Link href="/squad" className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold">
          <ArrowLeft className="h-4 w-4" /> Volver a la plantilla
        </Link>
        <div className="mt-10 max-w-2xl">
          <Badge tone="gold">{positionLabel(player.position)}</Badge>
          <h1 className="mt-4 text-5xl leading-tight sm:text-7xl">{player.name}</h1>
          <p className="mt-6 text-lg leading-relaxed text-white/75">{player.bio}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <StatsPill label="dorsal" value={player.number} />
            <StatsPill label="selección" value={player.country} />
          </div>
          <Link href="/ideal-xi" className="btn-gold mt-10">Añadir a mi 11 ideal</Link>
          {RATINGS[player.slug] && <Link href={`/comparador?a=${player.slug}`} className="btn-ghost ml-3 mt-10">Comparar con otro jugador</Link>}
        </div>
        {photo && (
          <figure className="mt-10 max-w-xs">
            <Image src={photo.src} alt={player.name} width={480} height={600} className="h-auto w-full rounded-xl border border-gold/40 object-cover" />
            <figcaption className="mt-2 text-xs text-white/50">{photo.credit}</figcaption>
          </figure>
        )}
      </div>
    </article>
  );
}
