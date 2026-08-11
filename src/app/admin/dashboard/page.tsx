import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CATEGORIES, ACCENT_CLASSES } from "@/lib/categories";
import TiltCard from "@/components/TiltCard";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Don't rely on middleware alone to gate this page — check again here,
  // directly in the page's own server render, as a second independent layer.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const { data } = await supabase.from("packages").select("category");
  const { count: bannerCount } = await supabase
    .from("banners")
    .select("*", { count: "exact", head: true });

  const counts = new Map<string, number>();
  (data ?? []).forEach((row) => {
    counts.set(row.category, (counts.get(row.category) ?? 0) + 1);
  });

  return (
    <div className="mx-auto max-w-5xl px-5 py-12">
      <h1 className="mb-2 font-display text-2xl font-bold text-white">হোম পেজ</h1>
      <p className="mb-6 text-white/60">
        হোম পেজের হেডারের নিচে দেখানো স্লাইডশো ব্যানার পরিচালনা করুন।
      </p>
      <TiltCard className="mb-10">
        <Link
          href="/admin/banners"
          className="group flex items-center gap-5 rounded-2xl border-2 border-white/10 bg-surface p-7 shadow-premium transition hover:border-primary/40"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-2xl text-primary">
            <i className="fa-solid fa-images" />
          </div>
          <div className="flex-1">
            <h3 className="mb-1 font-display text-lg font-bold text-white">হোম পেজ ব্যানার</h3>
            <p className="text-sm text-white/55">{bannerCount ?? 0} টি ব্যানার যোগ করা আছে</p>
          </div>
          <span className="text-sm font-bold text-primary">
            পরিচালনা করুন <i className="fa-solid fa-arrow-right ml-1" />
          </span>
        </Link>
      </TiltCard>

      <h1 className="mb-2 font-display text-2xl font-bold text-white">প্যাকেজ ম্যানেজমেন্ট</h1>
      <p className="mb-10 text-white/60">
        নিচের যেকোনো প্যাকেজে ক্লিক করে বিশ্ববিদ্যালয় বা প্যাকেজ আইটেম যোগ, এডিট বা ডিলিট করুন।
        পরিবর্তনগুলো সাথে সাথে মূল ওয়েবসাইটে দেখা যাবে।
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORIES.map((cat) => {
          const accent = ACCENT_CLASSES[cat.accent];
          return (
            <TiltCard key={cat.slug} className="h-full">
              <Link
                href={`/admin/packages/${cat.slug}`}
                className={`group block h-full rounded-2xl border-2 border-white/10 bg-surface p-7 shadow-premium transition hover:border-white/20 ${accent.hoverBorder}`}
              >
                <div className={`mb-4 flex h-14 w-14 items-center justify-center rounded-xl text-2xl ${accent.chipBg} ${accent.text}`}>
                  <i className={cat.icon} />
                </div>
                <h3 className="mb-1 font-display text-lg font-bold text-white">{cat.label}</h3>
                <p className="mb-4 text-sm text-white/55">
                  {counts.get(cat.slug) ?? 0} টি {cat.itemNounSingular} যোগ করা আছে
                  {cat.hasImage && " · ছবি আপলোড সুবিধা আছে"}
                </p>
                <span className={`text-sm font-bold ${accent.text}`}>
                  পরিচালনা করুন <i className="fa-solid fa-arrow-right ml-1" />
                </span>
              </Link>
            </TiltCard>
          );
        })}
      </div>
    </div>
  );
}
