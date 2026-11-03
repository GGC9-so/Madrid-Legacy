import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import GameRunner from "@/components/GameRunner";
import { GAMES, getGame } from "@/data/games";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return GAMES.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const game = getGame((await params).slug);
  return game ? { title: game.title, description: game.text } : {};
}

export default async function GamePage({ params }: Props) {
  const slug = (await params).slug;
  const game = getGame(slug);
  if (!game) notFound();

  return (
    <section className="container-x max-w-3xl py-14 lg:py-20">
      <Link href="/games" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-gold-dark">
        <ArrowLeft className="h-4 w-4" /> Todos los minijuegos
      </Link>
      <h1 className="mt-6 text-4xl text-night sm:text-5xl">{game.title}</h1>
      <p className="mb-10 mt-3 text-lg text-muted">{game.text}</p>
      {game.ready ? (
        <GameRunner slug={slug} />
      ) : (
        <div className="card p-8 text-night/80">Este minijuego llega en la próxima entrega. Mientras tanto, prueba los que ya están disponibles.</div>
      )}
    </section>
  );
}
