import SectionHeading from "@/components/SectionHeading";
import { TROPHIES } from "@/data/site";
import CountUp from "./CountUp";

export default function Trophies() {
  return (
    <section className="bg-coal py-20 text-white lg:py-28">
      <div className="container-x">
        <SectionHeading dark title="La vitrina más grande del fútbol" text="Títulos oficiales ganados por el club." />
        <dl className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {TROPHIES.map((t) => (
            <div key={t.label} className="border-t border-gold/40 pt-4">
              <dd className="font-display text-6xl tabular-nums text-gold"><CountUp to={t.count} /></dd>
              <dt className="mt-2 text-sm text-white/70">{t.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
