import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import LegendsBrowser from "@/components/LegendsBrowser";
import { LEGENDS } from "@/data/legends";

export const metadata: Metadata = { title: "Leyendas", description: "Las leyendas que hicieron grande al Real Madrid, de Santiago Bernabéu a Cristiano Ronaldo y Vinícius." };

export default function LegendsPage() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Leyendas del club" text={`${LEGENDS.length} nombres que dejaron la camiseta blanca más alta de lo que la encontraron. Filtra por línea o por banquillo.`} className="mb-10" />
      <LegendsBrowser />
    </section>
  );
}
