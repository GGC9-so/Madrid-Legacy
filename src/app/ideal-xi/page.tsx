import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import IdealXI from "@/components/IdealXI";

export const metadata: Metadata = { title: "11 Ideal", description: "Arma tu alineación ideal del Real Madrid en 4-3-3 o 4-2-3-1 y guárdala en tu navegador." };

export default function IdealXIPage() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Arma tu 11 ideal" text="Elige la formación, toca una posición y coloca a tu titular. Tu alineación queda guardada en este navegador." className="mb-10" />
      <IdealXI />
    </section>
  );
}
