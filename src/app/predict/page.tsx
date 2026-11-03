import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import PredictView from "@/components/PredictView";
import { getMatches } from "@/lib/live";

export const metadata: Metadata = { title: "Predice el marcador", description: "Predice el resultado de los próximos partidos del Real Madrid y suma puntos cuando aciertes." };

export default async function PredictPage() {
  const matches = await getMatches();
  return (
    <section className="container-x max-w-3xl py-16 lg:py-24">
      <SectionHeading title="Predice el marcador" text="Pon tu resultado antes de cada partido. Cuando se juegue y se actualice, la web te da los puntos." className="mb-10" />
      <PredictView matches={matches} />
    </section>
  );
}
