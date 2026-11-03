import Link from "next/link";
import Logo from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="bg-night py-28 text-center text-white">
      <div className="container-x">
        <Logo className="mx-auto mb-6 h-24 w-auto" />
        <p className="font-display text-8xl text-gold">404</p>
        <h1 className="mt-4 text-3xl sm:text-4xl">Fuera de juego</h1>
        <p className="mx-auto mt-4 max-w-md text-white/70">Esta página no existe o todavía no se ha jugado. Vuelve al centro del campo.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-gold">Ir al inicio</Link>
          <Link href="/games" className="btn-ghost">Ver los minijuegos</Link>
        </div>
      </div>
    </section>
  );
}
