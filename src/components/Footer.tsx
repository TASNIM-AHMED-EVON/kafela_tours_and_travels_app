export default function Footer() {
  return (
    <section className="relative overflow-hidden bg-dark px-5 pb-8 pt-16 text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] animate-shimmer bg-gold-gradient bg-[length:250%_100%]" />
      <div className="mx-auto grid max-w-6xl gap-10 border-b border-white/10 pb-10 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <h3 className="relative mb-6 pb-2 font-display text-xl font-bold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:bg-primary">
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
              <a href="mailto:kafelatours9ndtravels@gmail.com" className="hover:text-white">
                kafelatours9ndtravels@gmail.com
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="relative mb-6 pb-2 font-display text-xl font-bold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:bg-primary">
            ফেসবুক পেজ
          </h3>
          <p className="mb-4 text-sm text-gray-400">
            আমাদের নিত্যনতুন আপডেট, অফার এবং ট্যুর লাইভ দেখতে ফেসবুক পেজে যুক্ত হোন।
          </p>
          <a
            href="https://www.facebook.com/share/14cxgpCuwvZ/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-md bg-[#1877F2] px-6 py-3 font-semibold text-white shadow-md transition hover:bg-[#145dbf]"
          >
            <i className="fa-brands fa-facebook-f" /> ফেসবুক পেজে যুক্ত হোন
          </a>
        </div>

        <div>
          <h3 className="relative mb-6 pb-2 font-display text-xl font-bold after:absolute after:bottom-0 after:left-0 after:h-[3px] after:w-10 after:bg-primary">
            WhatsApp
          </h3>
          <a
            href="https://wa.me/8801595548707"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-lg font-semibold text-[#25D366] hover:underline"
          >
            <i className="fa-brands fa-whatsapp" /> +88 01595-548707
          </a>
        </div>
      </div>
      <footer className="pt-6 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} কাফেলা ট্যুরস এন্ড ট্রাভেলস। সর্বস্বত্ব সংরক্ষিত।</p>
      </footer>
    </section>
  );
}
