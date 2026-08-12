import Link from "next/link";
import type { ReactNode } from "react";

const LEGAL_LINKS = [
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

const SOCIALS = [
  {
    name: "Facebook",
    icon: "fa-brands fa-facebook-f",
    href: "https://www.facebook.com/share/14cxgpCuwvZ/",
    hover: "hover:bg-[#1877F2] hover:border-[#1877F2]",
  },
  {
    name: "WhatsApp",
    icon: "fa-brands fa-whatsapp",
    href: "https://wa.me/8801595548707",
    hover: "hover:bg-[#25D366] hover:border-[#25D366]",
  },
  {
    name: "Instagram",
    icon: "fa-brands fa-instagram",
    href: "https://www.instagram.com/kafelatoursandtravels/",
    hover:
      "hover:border-transparent hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:via-[#ee2a7b] hover:to-[#6228d7]",
  },
  {
    name: "TikTok",
    icon: "fa-brands fa-tiktok",
    href: "https://www.tiktok.com/@kafela_tours",
    hover: "hover:bg-white hover:border-white hover:text-dark",
  },
];

const CONTACT_ITEMS = [
  { icon: "fa-solid fa-location-dot", content: <span>মীরবাড়ি, কলেজ রোড, ময়মনসিংহ</span> },
  {
    icon: "fa-solid fa-phone",
    content: (
      <a href="tel:01918689484" className="transition hover:text-primary">
        01918-689484
      </a>
    ),
  },
  {
    icon: "fa-solid fa-envelope",
    content: (
      <a href="mailto:kafelatours9ndtravels@gmail.com" className="break-all transition hover:text-primary">
        kafelatours9ndtravels@gmail.com
      </a>
    ),
  },
];

function ColumnCard({
  icon,
  title,
  children,
}: {
  icon: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7 shadow-premium backdrop-blur-sm transition hover:border-primary/20">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15 text-sm text-primary">
          <i className={icon} />
        </span>
        <h3 className="font-display text-lg font-bold text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <section className="pattern-dots relative overflow-hidden bg-dark px-5 pb-8 pt-16 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] animate-shimmer bg-gold-gradient bg-[length:250%_100%]" />

      <div className="mx-auto grid max-w-5xl gap-6 border-b border-white/10 pb-10 sm:grid-cols-3">
        <ColumnCard icon="fa-solid fa-share-nodes" title="Social Link">
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                title={s.name}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-gold-glow ${s.hover}`}
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </ColumnCard>

        <ColumnCard icon="fa-solid fa-headset" title="যোগাযোগ করুন">
          <ul className="space-y-4 text-sm text-gray-300">
            {CONTACT_ITEMS.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs text-primary">
                  <i className={item.icon} />
                </span>
                {item.content}
              </li>
            ))}
          </ul>
        </ColumnCard>

        <ColumnCard icon="fa-solid fa-file-shield" title="নীতিমালা">
          <div className="flex flex-col gap-3">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group flex items-center justify-between rounded-lg border border-white/15 bg-white/5 px-4 py-2.5 text-sm text-gray-200 transition hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
              >
                <span>{link.label}</span>
                <i className="fa-solid fa-angle-right text-xs text-primary transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </ColumnCard>
      </div>

      <div className="mx-auto flex max-w-5xl flex-col items-center gap-2 pt-6 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} কাফেলা ট্যুরস এন্ড ট্রাভেলস। সর্বস্বত্ব সংরক্ষিত।
        </p>
        <p className="text-xs text-gray-600">ময়মনসিংহ থেকে সারা বাংলাদেশ</p>
      </div>
    </section>
  );
}
