import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import MomentsGrid from "@/components/MomentsGrid";

export const metadata: Metadata = { title: "Momentos icónicos", description: "Goles, remontadas y finales que ya son parte de la memoria madridista." };

export default function MomentsPage() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Momentos que no se olvidan" text="Goles en el descuento, remontadas imposibles y finales eternas. Toca una tarjeta para leer la historia completa." className="mb-12" />
      <MomentsGrid />
    </section>
  );
}
