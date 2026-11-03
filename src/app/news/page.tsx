import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import NewsBrowser from "@/components/NewsBrowser";

export const metadata: Metadata = { title: "Noticias", description: "Las últimas noticias del Real Madrid: partidos, fichajes y vida del club." };

export default function NewsPage() {
  return (
    <section className="container-x max-w-4xl py-16 lg:py-24">
      <SectionHeading title="Noticias del club" text="Resultados, fichajes y novedades de la temporada 2026/27." className="mb-10" />
      <NewsBrowser />
    </section>
  );
}
