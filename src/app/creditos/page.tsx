import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { PHOTOS } from "@/data/photos";
import { getPlayer } from "@/data/players";

export const metadata: Metadata = { title: "Créditos de las fotos", description: "Autores y licencias de las fotos que aparecen en Madrid Legacy." };

export default function CreditosPage() {
  const entries = Object.entries(PHOTOS);
  return (
    <section className="container-x max-w-3xl py-16 lg:py-24">
      <SectionHeading title="Créditos de las fotos" text="Las fotografías de jugadores proceden de Wikimedia Commons con licencias libres. Estos son sus autores." className="mb-10" />
      {entries.length === 0 ? (
        <p className="text-muted">Todavía no hay fotos de jugadores en la web.</p>
      ) : (
        <ul className="divide-y divide-gold/30 border-y border-gold/30">
          {entries.map(([slug, p]) => (
            <li key={slug} className="py-4">
              <p className="font-semibold text-night">{getPlayer(slug)?.name ?? slug}</p>
              <p className="text-sm text-muted">{p.credit}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
