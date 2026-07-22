import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "কাফেলা ট্যুরস এন্ড ট্রাভেলস",
  description:
    "কাফেলা ট্যুরস এন্ড ট্রাভেলস - ভর্তি পরীক্ষা বাস সার্ভিস, দলগত ভ্রমণ, পারিবারিক ভ্রমণ, কর্পোরেট ও কাস্টম ট্যুর প্যাকেজ।",
  icons: { icon: "/huks.png" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Baloo+Da+2:wght@500;600;700;800&family=Hind+Siliguri:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
