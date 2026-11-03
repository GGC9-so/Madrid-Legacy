import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import AlbumView from "@/components/AlbumView";

export const metadata: Metadata = { title: "Álbum de cromos", description: "Colecciona las leyendas del Real Madrid: un sobre gratis cada día y otro extra si superas el Reto del Día." };

export default function AlbumPage() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Álbum de cromos" text="Abre un sobre gratis cada día y colecciona a las leyendas del club. Si superas el Reto del Día, ganas otro." className="mb-10" />
      <AlbumView />
    </section>
  );
}
