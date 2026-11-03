import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Carnet from "@/components/Carnet";
import { getMatches } from "@/lib/live";

export const metadata: Metadata = { title: "Carné de madridista", description: "Tu carné con nivel, racha, cromos, predicciones y récords en Madrid Legacy." };

export default async function CarnetPage() {
  const matches = await getMatches();
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Tu carné de madridista" text="Sube de Cantera a Leyenda jugando, coleccionando y prediciendo." className="mb-10" />
      <Carnet matches={matches} />
    </section>
  );
}
