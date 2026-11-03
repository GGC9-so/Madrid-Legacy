import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import PlayerCompare from "@/components/PlayerCompare";

export const metadata: Metadata = { title: "Comparador de jugadores", description: "Compara a dos jugadores del Real Madrid en un gráfico de radar: ritmo, remate, pase, regate, defensa y físico." };

export default function ComparadorPage() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Comparador de jugadores" text="Elige a dos futbolistas de la plantilla y míralos cara a cara en un gráfico de radar." className="mb-10" />
      <PlayerCompare />
    </section>
  );
}
