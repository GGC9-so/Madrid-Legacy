import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen, Flame } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import GameCard from "@/components/GameCard";
import { GAMES } from "@/data/games";

export const metadata: Metadata = { title: "Minijuegos", description: "Diez minijuegos para demostrar cuánto sabes del Real Madrid: quizzes, alineaciones, dorsales y penaltis." };

export default function GamesPage() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Minijuegos" text="Diez retos para demostrar cuánto sabes del Madrid. Elige uno y a jugar." className="mb-12" />
      <div className="mb-8 grid gap-4 md:grid-cols-2">
      <Link href="/daily" className="card card-hover flex items-center gap-5 border-gold bg-night p-6 text-white sm:p-8">
        <Flame className="h-10 w-10 shrink-0 text-gold" aria-hidden />
        <div>
          <h2 className="text-2xl">Reto del Día</h2>
          <p className="mt-1 text-white/70">Cinco preguntas nuevas cada día, las mismas para todos. ¿Cuánta racha puedes llevar?</p>
        </div>
      </Link>
      <Link href="/album" className="card card-hover flex items-center gap-5 border-gold bg-night p-6 text-white sm:p-8">
        <BookOpen className="h-10 w-10 shrink-0 text-gold" aria-hidden />
        <div>
          <h2 className="text-2xl">Álbum de cromos</h2>
          <p className="mt-1 text-white/70">Un sobre gratis al día con cartas de leyendas. ¿Podrás completarlo?</p>
        </div>
      </Link>
      </div>
      <ul className="grid gap-4 md:grid-cols-2">
        {GAMES.map((g) => <li key={g.slug}><GameCard game={g} /></li>)}
      </ul>
    </section>
  );
}
