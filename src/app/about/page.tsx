import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import TiltCard from "@/components/TiltCard";
import LiquidBlobs from "@/components/LiquidBlobs";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className="pattern-dots relative overflow-hidden bg-navy px-5 pb-20 pt-48">
        <LiquidBlobs variant="jewel" />
        <div className="relative">
          <Reveal>
            <div className="mx-auto mb-10 max-w-3xl text-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-pill bg-primary/15 px-4 py-1.5 text-sm font-bold text-primary">
                <i className="fa-solid fa-circle-check" /> ট্রাভেল এজেন্সি
              </span>
              <h2 className="font-display text-3xl font-bold text-white">আমাদের সম্পর্কে জানুন</h2>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="glass-panel mx-auto max-w-4xl rounded-2xl p-8 shadow-premium sm:p-11">
              <p className="mb-5 leading-relaxed text-white/70">
                কাফেলা ট্যুরস এন্ড ট্রাভেলস ময়মনসিংহের একটি অত্যন্ত বিশ্বস্ত ও ঐতিহ্যবাহী ট্রাভেল
                এজেন্সি। আমরা সুদীর্ঘ সময় ধরে অত্যন্ত সুনামের সাথে আমাদের সকল সম্মানিত গ্রাহকদের
                অভ্যন্তরীণ পর্যটন ও যাতায়াত সেবা নিশ্চিত করে আসছি। নিরাপদ যাতায়াত ব্যবস্থা, মানসম্মত
                আবাসন এবং দক্ষ গাইডেন্সের কারণে আমরা আজ ভ্রমণপিপাসুদের আস্থার প্রথম পছন্দে পরিণত হয়েছি।
              </p>
              <p className="mb-8 leading-relaxed text-white/70">
                ডিজিটাল বাংলাদেশের আধুনিক যুগের সাথে তাল মিলিয়ে আমাদের সকল গ্রাহকরা এখন ঘরে বসেই অনলাইন
                বুকিং এবং যেকোনো ট্যুর সংক্রান্ত তথ্য ও সেবা সহজে উপভোগ করতে পারেন। আমাদের একঝাঁক তরুণ ও
                অভিজ্ঞ টিম দিন-রাত ২৪ ঘণ্টা আপনার ট্যুর ম্যানেজমেন্টকে সুন্দর, নিখুঁত ও আরামদায়ক করতে
                অক্লান্ত পরিশ্রম করে যাচ্ছে।
              </p>

              <div className="grid gap-6 sm:grid-cols-2">
                <TiltCard>
                  <div className="rounded-xl border border-lagoon/20 bg-lagoon/10 p-7 text-center">
                    <i className="fa-solid fa-eye mb-4 block text-3xl text-lagoon" />
                    <h4 className="mb-2 font-display text-lg font-bold text-white">আমাদের লক্ষ্য</h4>
                    <p className="text-sm text-white/65">
                      স্বল্প খরচে দেশের প্রতিটি প্রান্তে প্রিমিয়াম কোয়ালিটির ট্যুর সেবা সাধারণ মানুষের
                      দোরগোড়ায় পৌঁছে দেওয়া।
                    </p>
                  </div>
                </TiltCard>
                <TiltCard>
                  <div className="rounded-xl border border-vermillion/20 bg-vermillion/10 p-7 text-center">
                    <i className="fa-solid fa-heart mb-4 block text-3xl text-vermillion" />
                    <h4 className="mb-2 font-display text-lg font-bold text-white">মূল্যবোধ</h4>
                    <p className="text-sm text-white/65">
                      গ্রাহকদের নিরাপত্তা, শতভাগ সততা এবং চমৎকার কাস্টমার কেয়ারের মাধ্যমে স্থায়ী সম্পর্ক
                      গড়ে তোলা।
                    </p>
                  </div>
                </TiltCard>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
      <Footer />
    </>
  );
}
