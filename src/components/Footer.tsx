import Link from "next/link";
import { NAV, SITE } from "@/data/site";
import Logo from "./Logo";
import InstallButton from "./InstallButton";

const CLUB = [
  { href: "/news", label: "Noticias" },
  { href: "/album", label: "Álbum de cromos" },
  { href: "/predict", label: "Predice el marcador" },
  { href: "/carnet", label: "Carné de madridista" },
  { href: "/stats", label: "Estadísticas" },
  { href: "/comparador", label: "Comparador de jugadores" },
  { href: "/creditos", label: "Créditos de las fotos" },
  { href: "/history", label: "Historia y títulos" },
  { href: "/copas", label: "Las 15 Copas" },
  { href: "/stadium", label: "Santiago Bernabéu" },
  { href: "/moments", label: "Momentos icónicos" },
  { href: "/legends", label: "Leyendas" },
];

export default function Footer() {
  return (
    <footer className="bg-coal text-white/70">
      <div className="container-x grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3 text-white">
            <Logo />
            <span className="font-display text-xl">{SITE.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed">{SITE.tagline}. Hecho por un madridista, para madridistas.</p>
          <InstallButton />
        </div>
        <FooterList title="Explora" links={NAV.slice(0, 5)} />
        <FooterList title="El club" links={CLUB} />
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        Proyecto de aficionado, sin afiliación con el Real Madrid C.F. © {new Date().getFullYear()} {SITE.name}
      </div>
    </footer>
  );
}

function FooterList({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
      <h3 className="font-display text-lg text-gold">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className="transition-colors hover:text-white">{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
