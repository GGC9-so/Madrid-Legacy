import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Tournament from "@/components/Tournament";

export const metadata: Metadata = { title: "Torneo de Leyendas", description: "Elige entre las leyendas del Real Madrid duelo a duelo, por eliminatoria, hasta coronar a tu mejor madridista de la historia." };

export default function TorneoPage() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Torneo de Leyendas" text="Un sorteo, una eliminatoria y un solo campeón. Tú decides cada duelo y al final te llevas la tarjeta de tu mejor madridista." className="mb-10" />
      <Tournament />
    </section>
  );
}
