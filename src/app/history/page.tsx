import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Trophies from "@/components/home/Trophies";
import { TIMELINE } from "@/data/history";

export const metadata: Metadata = { title: "Historia y títulos", description: "La historia del Real Madrid: títulos, Copas de Europa y los momentos que construyeron al club." };

export default function HistoryPage() {
  return (
    <>
      <section className="bg-night py-20 text-white lg:py-28">
        <div className="container-x">
          <h1 className="max-w-3xl text-5xl leading-tight sm:text-7xl">Más de un siglo de grandeza</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">Desde 1902, el Madrid ha hecho de Europa su casa. Este es el recorrido de los títulos y las noches que lo explican.</p>
        </div>
      </section>
      <Trophies />
      <section className="container-x py-20 lg:py-28">
        <SectionHeading title="Línea del tiempo" text="Del nacimiento del club a la Decimoquinta." />
        <ol className="relative mt-14 space-y-10 border-l border-gold/40 pl-8">
          {TIMELINE.map((t) => (
            <li key={t.year} className="relative">
              <span aria-hidden className="absolute -left-[2.4rem] top-3 h-3 w-3 rounded-full bg-gold ring-4 ring-mist" />
              <p className="font-display text-3xl tabular-nums text-gold-dark">{t.year}</p>
              <h3 className="mt-1 text-xl text-night">{t.title}</h3>
              <p className="mt-2 max-w-xl text-muted">{t.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
