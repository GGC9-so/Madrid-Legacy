import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import SigningsBrowser from "@/components/SigningsBrowser";

export const metadata: Metadata = { title: "Mejores fichajes de la historia", description: "Ranking de los fichajes que marcaron la historia del Real Madrid, de Di Stéfano a Mbappé." };

export default function SigningsPage() {
  return (
    <section className="container-x py-16 lg:py-24">
      <SectionHeading title="Los mejores fichajes de la historia" text="Un ranking editorial de los traspasos que cambiaron al club. El número es su puesto; filtra por época o posición." className="mb-10" />
      <SigningsBrowser />
    </section>
  );
}
