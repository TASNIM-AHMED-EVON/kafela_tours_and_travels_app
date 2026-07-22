import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ACCENT_CLASSES, type AccentKey } from "@/lib/categories";

const ACCENT_ORDER: AccentKey[] = ["lagoon", "marigold", "vermillion", "coral", "iris", "meadow"];

const FEATURES = [
  {
    icon: "fa-solid fa-graduation-cap",
    title: "ভর্তি পরীক্ষার সুবিধাসমূহ",
    points: ["প্যাকেজটিতে আসা-যাওয়ার টিকিট", "সকালের নাস্তা", "অভিজ্ঞ গাইডের নির্দেশনা অন্তর্ভুক্ত রয়েছে"],
  },
  {
    icon: "fa-solid fa-shield-halved",
    title: "সর্বোচ্চ নিরাপত্তা",
    points: ["প্রতিটি ট্রিপে অভিজ্ঞ ট্যুর গাইড নিশ্চিত করা হয়।"],
  },
  {
    icon: "fa-solid fa-bus",
    title: "আধুনিক যাতায়াত ব্যবস্থা",
    points: ["ভ্রমণকে আনন্দদায়ক করতে আমাদের রয়েছে অভিজ্ঞ চালকের সুব্যবস্থা।"],
  },
  {
    icon: "fa-solid fa-headset",
    title: "২৪/৭ সার্বক্ষণিক সাপোর্ট",
    points: [
      "ট্যুর বুকিং থেকে শুরু করে যেকোনো সমস্যা বা জিজ্ঞাসায় আমাদের সাপোর্ট টিম দিন-রাত ২৪ ঘণ্টা আপনার সেবায় নিয়োজিত থাকে।",
    ],
  },
  {
    icon: "fa-solid fa-wallet",
    title: "সাশ্রয়ী ও স্বচ্ছ বাজেট",
    points: ["আমাদের যেকোনো সার্ভিসে কোনো লুকানো খরচ (Hidden Charges) নেই। সাধ্যের মধ্যে সেরা মানের ভ্রমণের গ্যারান্টি আমরা দিই।"],
  },
  {
    icon: "fa-solid fa-sliders",
    title: "কাস্টমাইজড রুট প্ল্যান",
    points: ["আপনি আপনার সুবিধা এবং বাজেট অনুযায়ী নিজের পছন্দের দর্শনীয় স্থানগুলো বেছে নিয়ে ট্যুর প্ল্যান কাস্টমাইজ করে নিতে পারবেন।"],
  },
];

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <section className="pattern-dots bg-navy px-5 pb-20 pt-48">
        <h2 className="mb-4 text-center font-display text-3xl font-bold text-white sm:text-4xl">
          আমাদের সেবাসমূহের বৈশিষ্ট্য
        </h2>
        <p className="mx-auto mb-14 max-w-xl text-center text-white/60">
          যাত্রীদের নিখুঁত ভ্রমণ অভিজ্ঞতা এবং সর্বোচ্চ সন্তুষ্টি নিশ্চিত করতে আমরা সর্বদা সেরা মানের
          সেবা প্রদান করি।
        </p>

        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
          {FEATURES.map((f, i) => {
            const accent = ACCENT_CLASSES[ACCENT_ORDER[i % ACCENT_ORDER.length]];
            return (
              <div
                key={f.title}
                className="flex gap-5 rounded-2xl border border-white/10 bg-surface p-7 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl ${accent.chipBg} ${accent.text}`}>
                  <i className={f.icon} />
                </div>
                <div>
                  <h4 className="mb-2 font-display text-lg font-bold text-white">{f.title}</h4>
                  {f.points.map((p) => (
                    <p key={p} className="text-sm leading-relaxed text-white/70">
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <Footer />
    </>
  );
}
