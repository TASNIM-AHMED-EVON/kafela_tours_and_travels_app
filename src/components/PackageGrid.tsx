"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import type { PackageItem } from "@/types/database";
import { ACCENT_CLASSES, type CategoryConfig } from "@/lib/categories";

function formatCost(cost: number | null) {
  if (cost === null || cost === undefined || cost === 0) return "যোগাযোগ করুন";
  return `${cost} টাকা`;
}

export default function PackageGrid({
  category,
  items,
}: {
  category: CategoryConfig;
  items: PackageItem[];
}) {
  const [query, setQuery] = useState("");
  const accent = ACCENT_CLASSES[category.accent];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.location ?? "").toLowerCase().includes(q) ||
        (item.description ?? "").toLowerCase().includes(q)
    );
  }, [items, query]);

  return (
    <>
      <div className="mx-auto max-w-xl px-5 pt-10">
        <div className="relative">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              category.hasImage
                ? `${category.itemNounSingular} খুঁজুন...`
                : "বিশ্ববিদ্যালয়ের নাম বা লোকেশন লিখুন (যেমন: ঢাকা বিশ্ববিদ্যালয়, চুয়েট...)"
            }
            className={`w-full rounded-pill border-2 border-white/15 bg-surface py-4 pl-14 pr-6 text-base text-white shadow-sm outline-none placeholder:text-white/40 transition focus:shadow-md ${accent.ring}`}
          />
          <i className={`fa-solid fa-magnifying-glass absolute left-6 top-1/2 -translate-y-1/2 ${accent.text}`} />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 pb-24 pt-10">
        {items.length === 0 && (
          <div className="mx-auto max-w-lg rounded-xl border border-dashed border-white/15 bg-surface p-10 text-center text-white/50">
            <i className={`fa-solid fa-circle-info mb-3 block text-3xl ${accent.text}`} />
            এই প্যাকেজের জন্য এখনো কোনো তথ্য যোগ করা হয়নি। শীঘ্রই আপডেট করা হবে।
          </div>
        )}

        {items.length > 0 && filtered.length === 0 && (
          <div className="mx-auto max-w-lg rounded-xl border border-dashed border-white/15 bg-surface p-10 text-center text-white/50">
            <i className={`fa-solid fa-circle-info mb-3 block text-3xl ${accent.text}`} />
            আপনার সার্চের সাথে কোনো ফলাফল খুঁজে পাওয়া যায়নি। অনুগ্রহ করে সঠিক বানান লিখুন বা অন্য
            শব্দ ট্রাই করুন।
          </div>
        )}

        {category.hasImage ? (
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group overflow-hidden rounded-2xl border border-white/10 bg-surface shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div className={`relative h-48 w-full ${accent.chipBg}`}>
                  {item.image_url ? (
                    <Image
                      src={item.image_url}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`flex h-full items-center justify-center ${accent.text}`}>
                      <i className={`${category.icon} text-5xl`} />
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="mb-2 font-display text-lg font-bold text-white">{item.title}</h3>
                  {item.location && (
                    <p className="mb-2 flex items-center gap-2 text-sm text-white/55">
                      <i className={`fa-solid fa-location-dot ${accent.text}`} /> {item.location}
                    </p>
                  )}
                  {item.description && (
                    <p className="mb-4 text-sm leading-relaxed text-white/70">{item.description}</p>
                  )}
                  <div className="flex items-center justify-between border-t border-white/10 pt-4">
                    <span className={`font-bold ${accent.text}`}>{formatCost(item.cost)}</span>
                    <a
                      href="tel:01918689484"
                      className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-white transition ${accent.solidBg} hover:opacity-90`}
                    >
                      <i className="fa-solid fa-phone" /> বুক করুন
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="flex flex-col justify-between rounded-xl border border-white/10 bg-surface p-7 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:border-white/20"
              >
                <div>
                  <h3 className="mb-2 font-display text-lg font-bold leading-snug text-white">
                    {item.title}
                  </h3>
                  {item.location && (
                    <p className="mb-2 flex items-center gap-2 text-sm text-white/55">
                      <i className={`fa-solid fa-location-dot ${accent.text}`} /> {item.location}
                    </p>
                  )}
                  <p className="mb-6 flex items-center gap-2 text-sm text-white/55">
                    <i className={`fa-solid fa-money-bill ${accent.text}`} /> {formatCost(item.cost)}
                  </p>
                </div>
                <a
                  href="tel:01918689484"
                  className={`inline-flex items-center justify-center gap-2 rounded-md py-3 text-sm font-bold text-white transition ${accent.solidBg} hover:opacity-90`}
                >
                  <i className="fa-solid fa-bus" /> সিট বুক করুন
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
