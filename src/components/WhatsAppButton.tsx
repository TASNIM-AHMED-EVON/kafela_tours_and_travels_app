"use client";

import { usePathname } from "next/navigation";

const WHATSAPP_NUMBER = "8801595548707";
const DEFAULT_MESSAGE = "আসসালামু আলাইকুম, আমি কাফেলা ট্যুরস এন্ড ট্রাভেলস সম্পর্কে জানতে চাই।";

export default function WhatsAppButton() {
  const pathname = usePathname();

  // A customer-contact button doesn't belong inside the staff admin panel.
  if (pathname?.startsWith("/admin")) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="হোয়াটসঅ্যাপে মেসেজ করুন"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-2xl text-white shadow-lg shadow-black/40 transition hover:-translate-y-1 hover:shadow-xl sm:bottom-8 sm:right-8"
    >
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-40" />
      <i className="fa-brands fa-whatsapp relative" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-md bg-dark px-3 py-1.5 text-sm font-semibold text-white opacity-0 shadow-lg transition group-hover:opacity-100">
        হোয়াটসঅ্যাপে মেসেজ করুন
      </span>
    </a>
  );
}
