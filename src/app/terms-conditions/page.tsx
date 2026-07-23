import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By accessing the Kafela Tours website and utilizing our services, you expressly accept these Terms and Conditions. If you do not agree with any part of these terms, you must not use our website.",
  },
  {
    title: "2. Services Provided",
    body: "Kafela Tours provides dynamic travel packages, including but not limited to Corporate Tours, Custom Tours, Group Tours, and specific Admission Test Packages. All itineraries, seat capacities, and transport costs displayed are subject to change. The most current data is always maintained by our administration.",
  },
  {
    title: "3. User Conduct and Bookings",
    body: "You agree to use this website only to make legitimate inquiries and reservations. You shall not use this site to make any speculative, false, or fraudulent bookings. You are responsible for maintaining the confidentiality of any account credentials you use on our site.",
  },
  {
    title: "4. Intellectual Property",
    body: "All content published on this website, including text, graphics, logos, and images, is the property of Kafela Tours or its content suppliers and is protected by intellectual property laws.",
  },
  {
    title: "5. Limitation of Liability",
    body: "We are not liable for any personal injury, property damage, or other loss that may occur due to the actions, omissions, or negligence.",
  },
  {
    title: "6. Policy Modifications",
    body: "We may change these Terms and Conditions or our Privacy Policy from time to time. Your continued use of the site after we make changes is deemed to be acceptance of those changes. We encourage you to review these pages periodically.",
  },
];

export default function TermsConditionsPage() {
  return (
    <>
      <Navbar />
      <section className="pattern-dots bg-navy px-5 pb-20 pt-48">
        <Reveal>
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <span className="mb-4 inline-flex items-center gap-2 rounded-pill bg-primary/15 px-4 py-1.5 text-sm font-bold text-primary">
              <i className="fa-solid fa-file-contract" /> শর্তাবলী
            </span>
            <h1 className="font-display text-3xl font-bold text-white">Terms and Conditions</h1>
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
