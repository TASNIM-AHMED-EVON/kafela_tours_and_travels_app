import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PackageGrid from "@/components/PackageGrid";
import { getCategory, ACCENT_CLASSES } from "@/lib/categories";
import { createClient } from "@/lib/supabase/server";
import type { PackageItem } from "@/types/database";

export const dynamic = "force-dynamic";

export default async function PackageCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const accent = ACCENT_CLASSES[category.accent];

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("packages")
    .select("*")
    .eq("category", category.slug)
    .order("display_order", { ascending: true })
    .order("title", { ascending: true });

  const items = (data ?? []) as PackageItem[];

  return (
    <>
      <Navbar />

      {/* Each package gets its own colored hero, so the site feels like six
          distinct destinations rather than one repeated template. */}
      <section className={`relative overflow-hidden bg-gradient-to-br ${accent.gradient} px-5 pb-20 pt-44 text-center text-white`}>
        <i
          aria-hidden
          className={`${category.icon} pointer-events-none absolute -right-6 -top-6 text-[180px] text-white/10 sm:text-[240px]`}
        />
        <div className="relative mx-auto max-w-2xl">
          <span className="mb-3 inline-flex items-center gap-2 rounded-pill bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-wide backdrop-blur-sm">
            <i className={category.icon} /> {category.itemNounSingular}
          </span>
          <h2 className="font-display text-2xl font-bold sm:text-4xl">{category.label}</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/85">{category.description}</p>
        </div>

        {error && (
          <p className="relative mx-auto mt-6 max-w-lg rounded-lg bg-white/90 p-4 text-sm text-vermillion">
            তথ্য লোড করতে সমস্যা হয়েছে। অনুগ্রহ করে Supabase কনফিগারেশন যাচাই করুন। ({error.message})
          </p>
        )}

        {/* Curve into the dark navy content area below. */}
        <svg
          aria-hidden
          viewBox="0 0 1440 60"
          className="absolute inset-x-0 bottom-0 h-10 w-full"
          preserveAspectRatio="none"
        >
          <path d="M0 60 C 480 0 960 0 1440 60 L1440 60 L0 60 Z" fill="#101B3D" />
        </svg>
      </section>

      <section className="pattern-dots bg-navy">
        <PackageGrid category={category} items={items} />
      </section>
      <Footer />
    </>
  );
}
