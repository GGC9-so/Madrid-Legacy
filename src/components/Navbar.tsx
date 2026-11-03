"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV, SITE } from "@/data/site";
import Logo from "./Logo";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-night/90 text-white backdrop-blur">
      <div className="container-x flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
          <span className="font-display text-xl">{SITE.name}</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-1 xl:flex">
          {NAV.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href} className={`relative rounded-full px-2.5 py-2 text-sm transition-colors ${active ? "text-gold" : "text-white/75 hover:text-white"}`}>
                {item.label}
                {active && <motion.span layoutId="nav-active" className="absolute inset-x-2.5 -bottom-px h-px bg-gold" />}
              </Link>
            );
          })}
        </nav>

        <button type="button" aria-label={open ? "Cerrar menú" : "Abrir menú"} aria-expanded={open} onClick={() => setOpen((v) => !v)} className="rounded-full p-2 text-white/80 hover:text-gold xl:hidden">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav aria-label="Móvil" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden border-t border-gold/20 bg-night xl:hidden">
            <ul className="container-x divide-y divide-white/10 py-2">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} onClick={() => setOpen(false)} className={`block py-3 font-display text-xl ${pathname.startsWith(item.href) ? "text-gold" : "text-white"}`}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
