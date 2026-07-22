import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const WHY_US = [
  {
    icon: "fa-solid fa-shield-halved",
    title: "নিরাপদ ভ্রমণ",
    text: "অভিজ্ঞ চালক, ফিটনেসযুক্ত গাড়ি এবং সার্বক্ষণিক ট্র্যাকিং ব্যবস্থার মাধ্যমে আমরা নিশ্চিত করি আপনার সম্পূর্ণ নিরাপদ যাত্রা।",
    chip: "bg-lagoon/15 text-lagoon",
    hoverChip: "group-hover:bg-lagoon group-hover:text-white",
  },
  {
    icon: "fa-solid fa-hotel",
    title: "প্রিমিয়াম আবাসন",
    text: "আপনার বাজেটের মধ্যে আরামদায়ক ও মানসম্মত হোটেল-রিসোর্ট বুকিং নিশ্চিত করি প্রতিটি ট্যুরে।",
    chip: "bg-marigold/15 text-marigold",
    hoverChip: "group-hover:bg-marigold group-hover:text-white",
  },
  {
    icon: "fa-solid fa-headset",
    title: "২৪/৭ কাস্টমার সাপোর্ট",
    text: "যেকোনো প্রয়োজনে যাত্রার আগে, চলাকালীন এবং পরে আমাদের টিম সবসময় আপনার পাশে আছে।",
    chip: "bg-vermillion/15 text-vermillion",
    hoverChip: "group-hover:bg-vermillion group-hover:text-white",
  },
];

export default function HomePage() {
  return (
    <>
      <Navbar />

      {/* HERO — the caravan sets out at dusk. */}
      <section className="relative overflow-hidden bg-dusk-sky px-5 pb-28 pt-44 text-center text-white">
        <div
          aria-hidden
          className="caravan-drift pointer-events-none absolute left-1/2 top-16 h-72 w-[140%] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
        />
        <svg
          aria-hidden
          viewBox="0 0 1200 200"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-40 w-full text-primary/70"
          preserveAspectRatio="none"
        >
          <path
            d="M-50 220 Q 300 40 600 130 T 1250 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="2 18"
            strokeLinecap="round"
          />
        </svg>

        <div className="relative mx-auto max-w-3xl">
          <span className="mb-5 inline-flex items-center gap-2 rounded-pill border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-white/80 backdrop-blur-sm">
            <i className="fa-solid fa-route text-primary" /> ময়মনসিংহ থেকে সারা বাংলাদেশ
          </span>
          <h1 className="mb-6 font-display text-3xl font-bold leading-snug drop-shadow-lg sm:text-5xl">
            <span className="mr-1 inline-block rounded-lg bg-primary px-4 py-0.5 text-dark">
              কাফেলা
            </span>{" "}
            ট্যুরস এন্ড ট্রাভেলস-এ স্বাগতম
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-base font-light text-white/75 sm:text-xl">
            আপনার নিরাপদ, আরামদায়ক এবং নির্ভরযোগ্য ভ্রমণের বিশ্বস্ত সঙ্গী। আমরা দেশজুড়ে প্রিমিয়াম
            ট্যুর প্যাকেজ এবং আধুনিক যাতায়াত সেবা প্রদান করি।
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            <Link
              href="/packages"
              className="inline-flex w-full max-w-[280px] items-center justify-center gap-2 rounded-pill bg-primary px-8 py-3.5 text-lg font-bold text-dark shadow-lg shadow-primary/30 transition hover:-translate-y-0.5 hover:bg-primary-hover hover:text-white sm:w-[280px]"
            >
              আমাদের প্যাকেজসমূহ দেখুন <i className="fa-solid fa-arrow-right" />
            </Link>
            <Link
              href="/features"
              className="inline-flex w-full max-w-[280px] items-center justify-center gap-2 rounded-pill border-2 border-white/25 bg-white/5 px-8 py-3.5 text-lg font-bold text-white backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/10 sm:w-[280px]"
            >
              আমাদের ফিচারসমূহ দেখুন <i className="fa-solid fa-arrow-right" />
            </Link>
          </div>
        </div>
      </section>

      {/* WHY US — first waypoint on the route line. */}
      <section className="pattern-dots relative bg-navy px-5 py-20">
        <div className="relative mx-auto max-w-6xl">
          <div className="mb-14 flex flex-col items-center">
            <div className="route-dot mb-4" />
            <h2 className="text-center font-display text-3xl font-bold text-white">
              কেন আমাদের বেছে নেবেন?
            </h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((item) => (
              <div
                key={item.title}
                className="group rounded-2xl border border-white/10 bg-surface p-9 text-center shadow-lg shadow-black/20 transition hover:-translate-y-2 hover:border-white/20"
              >
                <div
                  className={`mx-auto mb-6 flex h-[75px] w-[75px] items-center justify-center rounded-full text-3xl transition ${item.chip} ${item.hoverChip}`}
                >
                  <i className={item.icon} />
                </div>
                <h3 className="mb-3 font-display text-xl font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ADMISSION BANNER — second waypoint. */}
      <section className="relative bg-navy px-5 pb-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center">
          <div className="route-dot mb-10" />
          <div className="flex flex-col items-center gap-6 rounded-2xl bg-gradient-to-br from-lagoon to-lagoon/80 p-10 text-white shadow-xl shadow-lagoon/20 sm:flex-row">
            <i className="fa-solid fa-bus rounded-full bg-white/15 p-6 text-5xl" />
            <div className="text-center sm:text-left">
              <h3 className="mb-2 font-display text-2xl font-bold">Admission Bus Service</h3>
              <p className="text-white/90">
                বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষার জন্য আপনার প্রয়োজনীয় বিশ্ববিদ্যালয়টি খুঁজে নিন এবং
                সরাসরি বাস সিট বুক করুন।
              </p>
              <Link
                href="/packages/admission-search"
                className="mt-4 inline-flex items-center gap-2 rounded-pill bg-white px-6 py-2.5 font-bold text-lagoon transition hover:-translate-y-0.5"
              >
                এখনই খুঁজুন <i className="fa-solid fa-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
