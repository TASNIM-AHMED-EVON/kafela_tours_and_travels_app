"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "হোম" },
  { href: "/packages", label: "প্যাকেজসমূহ" },
  { href: "/features", label: "ফিচারসমূহ" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? "border-primary/15 bg-dark/90 shadow-premium backdrop-blur-xl"
          : "border-white/5 bg-dark/50 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="rounded-md bg-gold-gradient px-4 py-1.5 font-display text-xl font-bold text-dark shadow-gold-glow">
            কাফেলা
          </span>
          <span className="hidden text-xs font-bold uppercase leading-tight tracking-wide text-white/70 sm:block">
            Tours &<br />Travels
          </span>
        </Link>

        <nav
          className={`${
            open ? "block" : "hidden"
          } absolute left-0 top-full w-full border-t border-white/10 bg-dark/95 px-5 py-4 shadow-lg backdrop-blur-xl md:static md:block md:w-auto md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <ul className="flex flex-col gap-2 md:flex-row md:items-center md:gap-2">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`block rounded-pill px-4 py-2 text-[15px] font-semibold transition ${
                      isActive
                        ? "bg-primary/15 text-primary shadow-gold-glow"
                        : "text-white/85 hover:bg-primary/10 hover:text-primary hover:shadow-gold-glow"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:01918689484"
            className="hidden items-center gap-2 rounded-pill bg-gold-gradient px-5 py-2.5 text-sm font-bold text-dark shadow-gold-glow transition hover:-translate-y-0.5 hover:brightness-110 sm:inline-flex"
          >
            <i className="fa-solid fa-phone" /> কল করুন
          </a>
          <button
            aria-label="Toggle menu"
            className="text-2xl text-white md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <i className="fa-solid fa-bars" />
          </button>
        </div>
      </div>
    </header>
  );
}
