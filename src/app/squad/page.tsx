import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Link from "next/link";
import SquadGrid from "@/components/SquadGrid";
import { PHOTOS } from "@/data/photos";

export const metadata: Metadata = { title: "Plantilla", description: "El primer equipo del Real Madrid 2026/27: porteros, defensas, medios y delanteros." };

export default function SquadPage() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Plantilla 2026/27" text="Los 26 del primer equipo con sus dorsales. Filtra por línea y entra en cualquier ficha." className="mb-10" />
      {Object.keys(PHOTOS).length > 0 && (
        <p className="mb-6 text-sm text-muted">Fotos con licencia libre de Wikimedia Commons. <Link href="/creditos" className="font-semibold text-gold-dark hover:underline">Ver créditos</Link></p>
      )}
      <SquadGrid />
    </section>
  );
}
