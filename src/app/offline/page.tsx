import Link from "next/link";

export const metadata = { title: "Sin conexión" };

export default function OfflinePage() {
  return (
    <section className="container-x py-28 text-center">
      <h1 className="text-4xl text-night sm:text-5xl">Sin conexión</h1>
      <p className="mx-auto mt-4 max-w-md text-lg text-muted">Parece que no tienes internet. Cuando vuelvas a conectarte, la web seguirá donde la dejaste.</p>
      <Link href="/" className="btn-night mt-8">Reintentar</Link>
    </section>
  );
}
