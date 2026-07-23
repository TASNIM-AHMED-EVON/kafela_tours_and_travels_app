import Link from "next/link";

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

export default function Footer() {
  return (
    <section className="relative overflow-hidden bg-dark px-5 pb-8 pt-16 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] animate-shimmer bg-gold-gradient bg-[length:250%_100%]" />

      <div className="mx-auto grid max-w-5xl gap-10 border-b border-white/10 pb-10 sm:grid-cols-3">
        {/* Column 1 — Social links */}
        <div>
          <h3 className="relative mb-6 pb-2 font-display text-lg font-bold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:bg-primary">
            Social Link
          </h3>
          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                title={s.name}
                className={`flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition ${s.hover}`}
              >
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — Contact */}
        <div>
          <h3 className="relative mb-6 pb-2 font-display text-lg font-bold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:bg-primary">
            যোগাযোগ করুন
          </h3>
          <ul className="space-y-4 text-sm text-gray-300">
            <li className="flex items-start gap-3">
              <i className="fa-solid fa-location-dot mt-1 text-primary" />
              <span>মীরবাড়ি, কলেজ রোড, ময়মনসিংহ</span>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-phone text-primary" />
              <a href="tel:01918689484" className="hover:text-white">
                01918-689484
              </a>
            </li>
            <li className="flex items-center gap-3">
              <i className="fa-solid fa-envelope text-primary" />
              <a href="mailto:kafelatours9ndtravels@gmail.com" className="break-all hover:text-white">
                kafelatours9ndtravels@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3 — Legal */}
        <div>
          <h3 className="relative mb-6 pb-2 font-display text-lg font-bold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:bg-primary">
            নীতিমালা
          </h3>
          <ul className="space-y-3 text-sm text-gray-300">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="inline-flex items-center gap-2 transition hover:text-primary">
                  <i className="fa-solid fa-angle-right text-xs text-primary" /> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <footer className="pt-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} কাফেলা ট্যুরস এন্ড ট্রাভেলস। সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>
    </section>
  );
}
