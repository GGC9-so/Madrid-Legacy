import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import RegisterSW from "@/components/RegisterSW";
import ChampionsNight from "@/components/ChampionsNight";
import LiveRefresh from "@/components/LiveRefresh";
import { getMatches } from "@/lib/live";
import { SITE } from "@/data/site";

const display = Bodoni_Moda({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const sans = Manrope({ subsets: ["latin"], variable: "--font-sans", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: `${SITE.name} · ${SITE.tagline}`, template: `%s · ${SITE.name}` },
  description: "Plantilla, 11 ideal, fichajes históricos, calendario y minijuegos del Real Madrid en una sola web de aficionados.",
  openGraph: { title: SITE.name, description: SITE.tagline, type: "website", locale: "es_ES" },
};

export const viewport: Viewport = { themeColor: "#0B1F3A" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const matches = await getMatches();
  return (
    <html lang="es" className={`${display.variable} ${sans.variable}`}>
      <body className="flex min-h-screen flex-col font-sans">
        <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gold focus:px-4 focus:py-2 focus:text-night">Saltar al contenido</a>
        <Providers>
          <RegisterSW />
          <LiveRefresh active={matches.some((m) => m.status === "live")} />
          <ChampionsNight matches={matches} />
          <Navbar />
        <main id="contenido" className="flex-1">{children}</main>
        <Footer />
        </Providers>
      </body>
    </html>
  );
}
