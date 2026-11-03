import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CopasScroll from "@/components/CopasScroll";

export const metadata: Metadata = { title: "Las 15 Copas de Europa", description: "Recorre las 15 finales de Copa de Europa y Champions League que ganó el Real Madrid, de 1956 a 2024." };

export default function CopasPage() {
  return (
    <>
      <section className="container-x py-16 lg:py-24">
        <SectionHeading title="Las 15 Copas de Europa" text="Desplázate para recorrer cada final, de París 1956 a Wembley 2024." />
      </section>
      <CopasScroll />
    </>
  );
}
