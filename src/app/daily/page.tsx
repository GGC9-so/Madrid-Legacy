import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import DailyChallenge from "@/components/DailyChallenge";

export const metadata: Metadata = { title: "Reto del Día", description: "Cinco preguntas nuevas cada día sobre el Real Madrid. Mantén tu racha y comparte tu resultado." };

export default function DailyPage() {
  return (
    <section className="container-x max-w-3xl py-16 lg:py-24">
      <SectionHeading title="Reto del Día" text="Las mismas cinco preguntas para todos los madridistas. Una oportunidad al día." className="mb-10" />
      <DailyChallenge />
    </section>
  );
}
