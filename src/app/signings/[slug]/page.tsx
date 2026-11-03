import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Badge from "@/components/Badge";
import MetricBar from "@/components/MetricBar";
import StatsPill from "@/components/StatsPill";
import { positionLabel } from "@/data/players";
import { SIGNINGS, getSigning } from "@/data/signings";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SIGNINGS.map((x) => ({ slug: x.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const signing = getSigning((await params).slug);
  return signing ? { title: `${signing.name}, fichaje de ${signing.year}`, description: signing.headline } : {};
}

export default async function SigningPage({ params }: Props) {
  const signing = getSigning((await params).slug);
  if (!signing) notFound();
  const i = SIGNINGS.indexOf(signing);
  const prev = SIGNINGS[i - 1];
  const next = SIGNINGS[i + 1];

  return (
    <>
      <article className="relative isolate overflow-hidden bg-night text-white">
        <span aria-hidden className="absolute -right-4 top-0 -z-10 font-display text-[14rem] leading-none text-gold/15 sm:text-[24rem]">{i + 1}</span>
        <div className="container-x py-16 sm:py-24">
          <Link href="/signings" className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-gold">
            <ArrowLeft className="h-4 w-4" /> Volver al ranking
          </Link>
          <div className="mt-10 max-w-2xl">
            <div className="flex flex-wrap gap-2">
              <Badge>{positionLabel(signing.position)}</Badge>
              <Badge tone="night">Puesto {i + 1} del ranking</Badge>
            </div>
            <h1 className="mt-4 text-5xl leading-tight sm:text-7xl">{signing.name}</h1>
            <p className="mt-4 text-xl text-gold-light">{signing.headline}</p>
            <p className="mt-6 text-lg leading-relaxed text-white/75">{signing.story}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <StatsPill label="año de llegada" value={signing.year} />
              <StatsPill label="procedencia" value={signing.from} />
            </div>
          </div>
        </div>
      </article>

      <section className="container-x grid gap-10 py-14 md:grid-cols-2">
        <div className="space-y-5">
          <h2 className="text-2xl text-night">Su peso en el club</h2>
          <MetricBar label="Impacto" value={signing.impact} />
          <MetricBar label="Legado" value={signing.legacy} />
          <p className="text-sm text-muted">Puntuaciones editoriales sobre 100.</p>
          <Link href="/torneo" className="btn-night">Jugar el Torneo de Leyendas</Link>
        </div>
        <nav aria-label="Otros fichajes" className="flex flex-col justify-end gap-3 md:items-end">
          {prev && <Link href={`/signings/${prev.slug}`} className="inline-flex items-center gap-2 font-semibold text-night hover:text-gold-dark"><ArrowLeft className="h-4 w-4" /> {prev.name}</Link>}
          {next && <Link href={`/signings/${next.slug}`} className="inline-flex items-center gap-2 font-semibold text-night hover:text-gold-dark">{next.name} <ArrowRight className="h-4 w-4" /></Link>}
        </nav>
      </section>
    </>
  );
}
