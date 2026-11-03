import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { QUICK_LINKS } from "@/data/site";

export default function QuickLinks() {
  return (
    <section className="container-x py-20 lg:py-28">
      <SectionHeading title="Elige por dónde empezar" text="Todas las puertas de entrada al mundo blanco." />
      <ul className="mt-12 grid border-l border-t border-gold/30 sm:grid-cols-2 lg:grid-cols-4">
        {QUICK_LINKS.map((l) => (
          <li key={l.href} className="border-b border-r border-gold/30">
            <Link href={l.href} className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-gold/10">
              <l.icon className="h-6 w-6 text-gold-dark" aria-hidden />
              <span className="font-display text-2xl text-night">{l.title}</span>
              <span className="text-sm leading-relaxed text-muted">{l.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
