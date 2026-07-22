import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES, ACCENT_CLASSES } from "@/lib/categories";

export default function PackagesPage() {
  return (
    <>
      <Navbar />
      <section className="pattern-dots bg-navy px-5 pb-24 pt-48">
        <div className="mb-14 text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-pill bg-primary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
            <i className="fa-solid fa-compass" /> ৬টি প্যাকেজ, ৬টি স্বাদ
          </span>
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            আমাদের ট্যুর প্যাকেজ সমূহ
          </h2>
        </div>
        <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const accent = ACCENT_CLASSES[cat.accent];
            return (
              <Link
                key={cat.slug}
                href={`/packages/${cat.slug}`}
                className={`group flex flex-col justify-between overflow-hidden rounded-2xl border-2 border-white/10 bg-surface p-9 text-center shadow-lg shadow-black/20 transition hover:-translate-y-2 hover:border-white/20 ${accent.hoverBorder}`}
              >
                <div>
                  <div
                    className={`mx-auto mb-6 flex h-[75px] w-[75px] items-center justify-center rounded-full text-3xl transition ${accent.chipBg} ${accent.text} ${accent.chipHoverBg} group-hover:text-white`}
                  >
                    <i className={cat.icon} />
                  </div>
                  <h4 className="mb-4 font-display text-xl font-bold text-white">{cat.label}</h4>
                  <p className="mb-6 text-sm leading-relaxed text-white/60">{cat.description}</p>
                </div>
                <span className={`inline-flex items-center justify-center gap-2 text-sm font-bold ${accent.text}`}>
                  বিস্তারিত দেখুন <i className="fa-solid fa-arrow-right" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}
