import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CtaBand() {
  return (
    <section className="grid md:grid-cols-2">
      <Link href="/ideal-xi" className="group bg-night px-6 py-16 text-white sm:px-12 lg:py-24">
        <h2 className="text-3xl sm:text-4xl">Tu once de gala</h2>
        <p className="mt-3 max-w-sm text-white/70">Elige formación, coloca a tus titulares y guarda tu alineación.</p>
        <span className="mt-8 inline-flex items-center gap-2 font-semibold text-gold">Armar mi 11 ideal <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
      </Link>
      <Link href="/games" className="group bg-gold px-6 py-16 text-night sm:px-12 lg:py-24">
        <h2 className="text-3xl sm:text-4xl">Demuestra que eres madridista</h2>
        <p className="mt-3 max-w-sm text-night/75">Diez minijuegos: quizzes, penaltis, dorsales y mucho más.</p>
        <span className="mt-8 inline-flex items-center gap-2 font-semibold">Ir a los minijuegos <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
      </Link>
    </section>
  );
}
