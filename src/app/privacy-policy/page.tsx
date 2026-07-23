import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "We collect personal data from you when you submit it to us, such as when you book an Admission Test Package, Family Tour, or contact us for inquiries. This information may include your name, email address, physical address, phone number, and payment information.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use the data we collect to fulfill your travel requests and respond to your inquiries. Furthermore, your data helps us perform internal business analysis, provide targeted deals, and improve our services.",
  },
  {
    title: "3. Cookies and Tracking",
    body: "We employ cookie technology to collect data and help visitors move faster through our site. You can manage your cookie preferences through your web browser settings.",
  },
  {
    title: "4. Data Protection and Retention",
    body: "We hold your personal data only for the period necessary to process your bookings and comply with applicable laws. We employ reasonable technical and administrative safeguards designed to protect your data against unauthorized access. However, no data transmission over the Internet can be guaranteed as totally secure.",
  },
  {
    title: "5. Your Rights",
    body: "You have the right to access, modify, correct, or delete your personal data. To exercise these rights, or if you have any questions regarding this policy, please contact our website administrator.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <section className="pattern-dots bg-navy px-5 pb-20 pt-48">
        <Reveal>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-pill bg-primary/15 px-4 py-1.5 text-sm font-bold text-primary">
              <i className="fa-solid fa-shield-halved" /> গোপনীয়তা নীতি
            </span>
            <h1 className="font-display text-3xl font-bold text-white">Privacy Policy</h1>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="glass-panel mx-auto max-w-3xl rounded-2xl p-8 shadow-premium sm:p-11">
            {SECTIONS.map((s) => (
              <div key={s.title} className="mb-8 last:mb-0">
                <h2 className="mb-2 font-display text-lg font-bold text-primary">{s.title}</h2>
                <p className="leading-relaxed text-white/70">{s.body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
      <Footer />
    </>
  );
}
