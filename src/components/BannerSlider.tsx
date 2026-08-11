"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BannerItem } from "@/types/database";

export default function BannerSlider({ banners }: { banners: BannerItem[] }) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoveringRef = useRef(false);

  const next = useCallback(() => {
    setCurrent((i) => (i + 1) % banners.length);
  }, [banners.length]);

  const prev = useCallback(() => {
    setCurrent((i) => (i - 1 + banners.length) % banners.length);
  }, [banners.length]);

  useEffect(() => {
    if (banners.length <= 1) return;
    timerRef.current = setInterval(() => {
      if (!hoveringRef.current) next();
    }, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [next, banners.length]);

  return (
    <div className="px-5 pt-24 sm:pt-28">
      <div
        className="glass-panel relative mx-auto aspect-[16/7] w-full max-w-6xl overflow-hidden rounded-2xl shadow-premium sm:aspect-[21/8]"
        onMouseEnter={() => (hoveringRef.current = true)}
        onMouseLeave={() => (hoveringRef.current = false)}
      >
        {banners.map((banner, i) => {
          const content = (
            <Image
              src={banner.image_url}
              alt={banner.title ?? "প্রোমো ব্যানার"}
              fill
              priority={i === 0}
              sizes="(max-width: 768px) 100vw, 1152px"
              className="object-cover"
            />
          );
          return (
            <div
              key={banner.id}
              className={`absolute inset-0 transition-opacity duration-700 ${
                i === current ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              {banner.link_url ? (
                <Link href={banner.link_url} className="block h-full w-full">
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          );
        })}

        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="পূর্ববর্তী ব্যানার"
              className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-dark/50 text-white backdrop-blur-sm transition hover:border-primary/50 hover:bg-dark/80 hover:text-primary sm:h-11 sm:w-11"
            >
              <i className="fa-solid fa-chevron-left" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="পরবর্তী ব্যানার"
              className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-dark/50 text-white backdrop-blur-sm transition hover:border-primary/50 hover:bg-dark/80 hover:text-primary sm:h-11 sm:w-11"
            >
              <i className="fa-solid fa-chevron-right" />
            </button>

            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
              {banners.map((banner, i) => (
                <button
                  key={banner.id}
                  type="button"
                  aria-label={`স্লাইড ${i + 1}`}
                  onClick={() => setCurrent(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-6 bg-primary" : "w-2 bg-white/40 hover:bg-white/60"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
