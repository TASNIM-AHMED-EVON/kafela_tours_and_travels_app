"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "হোম" },
  { href: "/packages", label: "প্যাকেজসমূহ" },
  { href: "/features", label: "ফিচারসমূহ" },
  { href: "/about", label: "আমাদের সম্পর্কে" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-white/10 bg-dark/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3">
        <Link href="/" className="flex items-center gap-3">
          <span className="rounded-md bg-gradient-to-br from-primary to-primary-hover px-4 py-1.5 font-display text-xl font-bold text-dark shadow-md shadow-primary/30">
            কাফেলা
          </span>
          <span className="hidden text-xs font-bold uppercase leading-tight tracking-wide text-white/70 sm:block">
            Tours &<br />Travels
          </span>
        </Link>

        <nav
          className={`${
            open ? "block" : "hidden"
          } absolute left-0 top-full w-full border-t border-white/10 bg-dark px-5 py-4 shadow-lg md:static md:block md:w-auto md:border-0 md:bg-transparent md:p-0 md:shadow-none`}
        >
          <ul className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-[15px] font-semibold transition hover:text-primary ${
                    pathname === link.href ? "text-primary" : "text-white/85"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="tel:01918689484"
            className="hidden items-center gap-2 rounded-pill bg-primary px-5 py-2.5 text-sm font-bold text-dark shadow-md shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary-hover hover:text-white sm:inline-flex"
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
