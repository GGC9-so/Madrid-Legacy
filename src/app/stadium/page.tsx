import type { Metadata } from "next";
import { FIGURES, GREAT_NIGHTS } from "@/data/stadium";

export const metadata: Metadata = { title: "Santiago Bernabéu", description: "El estadio del Real Madrid: historia, cifras y las grandes noches que ha vivido." };

export default function StadiumPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-night text-white">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(55%_60%_at_80%_50%,rgba(196,163,90,0.2),transparent_70%)]" />
        <div className="container-x grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-32">
          <div>
            <h1 className="text-5xl leading-tight sm:text-7xl">Santiago Bernabéu</h1>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">La casa del Real Madrid desde 1947. Un estadio que ha visto nacer leyendas y que cambia de piel sin perder su alma.</p>
          </div>
          <svg viewBox="0 0 400 300" role="img" aria-label="Dibujo esquemático del estadio" className="mx-auto w-full max-w-md">
            {[190, 165, 140, 115].map((rx, i) => (
              <ellipse key={rx} cx="200" cy="150" rx={rx} ry={rx * 0.7} fill="none" stroke="#C4A35A" strokeOpacity={0.9 - i * 0.2} strokeWidth={i === 0 ? 2 : 1.2} />
            ))}
            <rect x="140" y="112" width="120" height="76" rx="4" fill="#C4A35A" fillOpacity="0.12" stroke="#C4A35A" strokeOpacity="0.7" />
            <line x1="200" y1="112" x2="200" y2="188" stroke="#C4A35A" strokeOpacity="0.7" />
            <circle cx="200" cy="150" r="14" fill="none" stroke="#C4A35A" strokeOpacity="0.7" />
          </svg>
        </div>
      </section>

      <section className="container-x py-16 lg:py-20">
        <dl className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {FIGURES.map((f) => (
            <div key={f.label} className="border-t border-gold/40 pt-4">
              <dd className="font-display text-2xl leading-snug text-night">{f.value}</dd>
              <dt className="mt-2 text-sm text-muted">{f.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <section className="container-x grid gap-14 pb-20 lg:grid-cols-2 lg:pb-28">
        <div className="space-y-5 text-lg leading-relaxed text-night/80">
          <h2 className="text-3xl text-night sm:text-4xl">Una casa con historia</h2>
          <p>Abrió sus puertas en 1947 como Nuevo Estadio de Chamartín y en 1955 pasó a llevar el nombre del presidente que lo hizo posible.</p>
          <p>Tras su gran reforma, cuenta con cubierta retráctil y un césped que puede guardarse bajo el graderío, para que el estadio viva también más allá de los partidos.</p>
          <p>Aquí el Madrid ha celebrado Copas de Europa, Ligas y noches de remontada que forman parte de la memoria de todo el club.</p>
        </div>
        <div>
          <h2 className="text-3xl text-night sm:text-4xl">Las grandes citas</h2>
          <ul className="mt-6 divide-y divide-gold/30 border-y border-gold/30">
            {GREAT_NIGHTS.map((n) => (
              <li key={n.year} className="grid grid-cols-[4.5rem_1fr] gap-4 py-4">
                <span className="font-display text-2xl tabular-nums text-gold-dark">{n.year}</span>
                <span className="text-night/80">{n.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
