import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import LiquidBlobs from "@/components/LiquidBlobs";
import { CATEGORIES, ACCENT_CLASSES } from "@/lib/categories";

export default function PackagesPage() {
  return (
    <>
      <Navbar />
      <section className="pattern-dots relative overflow-hidden bg-navy px-5 pb-24 pt-48">
        <LiquidBlobs variant="jewel" />
        <div className="relative">
          <Reveal>
            <div className="mb-14 text-center">
              <span className="mb-3 inline-flex items-center gap-2 rounded-pill bg-primary/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-primary">
                <i className="fa-solid fa-compass" /> ৬টি প্যাকেজ, ৬টি স্বাদ
              </span>
              <h2 className="gold-shimmer-text font-display text-3xl font-bold drop-shadow-[0_0_25px_rgba(203,161,53,0.45)] sm:text-4xl">
                আমাদের ট্যুর প্যাকেজ সমূহ
              </h2>
            </div>
          </Reveal>
          <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => {
              const accent = ACCENT_CLASSES[cat.accent];
              return (
                <Reveal key={cat.slug} delay={(i % 3) * 0.1}>
                  <TiltCard className="h-full">
                    <Link
                      href={`/packages/${cat.slug}`}
                      className={`animated-border group flex h-full flex-col justify-between rounded-2xl border-2 border-white/10 bg-surface p-9 text-center shadow-premium transition hover:border-white/20 ${accent.hoverBorder}`}
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
                      <span
                        className={`group/btn relative inline-flex items-center justify-center gap-2 self-center overflow-hidden rounded-pill border border-current/40 px-5 py-2.5 text-sm font-bold transition group-hover:border-current ${accent.text}`}
                      >
                        <span className="pointer-events-none absolute inset-0 animate-shimmer bg-gold-sheen bg-[length:250%_100%]" />
                        <span className="relative">বিস্তারিত দেখুন</span>
                        <i className="fa-solid fa-arrow-right relative" />
                      </span>
                    </Link>
                  </TiltCard>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
