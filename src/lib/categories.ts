export type CategorySlug =
  | "admission-search"
  | "group-tour"
  | "study-tour"
  | "family-tour"
  | "corporate-tour"
  | "custom-tour";

export type AccentKey = "lagoon" | "marigold" | "vermillion" | "coral" | "iris" | "meadow";

export interface CategoryConfig {
  slug: CategorySlug;
  label: string;
  shortLabel: string;
  icon: string; // Font Awesome class
  description: string;
  /** Every package can now have a photo uploaded from the admin panel. */
  hasImage: boolean;
  itemNounSingular: string;
  /** Each package gets its own color identity across the site. */
  accent: AccentKey;
  /** Wording for the booking button — admission is a bus seat, others are a call. */
  ctaLabel: string;
  ctaIcon: string;
  /** Optional custom search placeholder; falls back to a generic one. */
  searchPlaceholder?: string;
}

export const CATEGORIES: CategoryConfig[] = [
  {
    slug: "admission-search",
    label: "ভর্তি পরীক্ষা প্যাকেজ",
    shortLabel: "ভর্তি পরীক্ষা",
    icon: "fa-solid fa-graduation-cap",
    description:
      "বিভিন্ন বিশ্ববিদ্যালয়ের ভর্তি পরীক্ষার জন্য আমাদের রয়েছে স্পেশাল নিয়মিত বাস যাতায়াত এবং সম্পূর্ণ সেফ গাইড সার্ভিস।",
    hasImage: true,
    itemNounSingular: "বিশ্ববিদ্যালয়",
    accent: "lagoon",
    ctaLabel: "সিট বুক করুন",
    ctaIcon: "fa-solid fa-bus",
    searchPlaceholder: "বিশ্ববিদ্যালয়ের নাম বা লোকেশন লিখুন (যেমন: ঢাকা বিশ্ববিদ্যালয়, চুয়েট...)",
  },
  {
    slug: "group-tour",
    label: "দলগত ভ্রমণ",
    shortLabel: "দলগত ভ্রমণ",
    icon: "fa-solid fa-users",
    description:
      "বন্ধু-বান্ধব, ক্লাব কিংবা বড় গ্রুপের সাথে আনন্দময় ভ্রমণের জন্য আকর্ষণীয় ট্যুর গাইডেন্স ও মেগা ডিসকাউন্ট সুবিধা।",
    hasImage: true,
    itemNounSingular: "প্যাকেজ",
    accent: "marigold",
    ctaLabel: "বুক করুন",
    ctaIcon: "fa-solid fa-phone",
  },
  {
    slug: "study-tour",
    label: "স্কুল / কলেজ শিক্ষা সফর",
    shortLabel: "শিক্ষা সফর",
    icon: "fa-solid fa-book-open",
    description:
      "শিক্ষার্থীদের জন্য বিনোদনমূলক, শিক্ষণীয় এবং সর্বোচ্চ নিরাপদ পরিবেশে বিশেষ স্টাডি ট্যুর প্যাকেজ ইভেন্ট ম্যানেজমেন্ট।",
    hasImage: true,
    itemNounSingular: "প্যাকেজ",
    accent: "vermillion",
    ctaLabel: "বুক করুন",
    ctaIcon: "fa-solid fa-phone",
  },
  {
    slug: "family-tour",
    label: "পারিবারিক ভ্রমণ",
    shortLabel: "পারিবারিক ভ্রমণ",
    icon: "fa-solid fa-house-chimney-user",
    description:
      "পরিবারের সদস্যদের নিয়ে একান্ত কোয়ালিটি টাইম কাটানোর জন্য প্রিমিয়াম আরামদায়ক লাক্সারি হোটেল ও কার বুকিং সুবিধা।",
    hasImage: true,
    itemNounSingular: "প্যাকেজ",
    accent: "coral",
    ctaLabel: "বুক করুন",
    ctaIcon: "fa-solid fa-phone",
  },
  {
    slug: "corporate-tour",
    label: "কর্পোরেট প্যাকেজ",
    shortLabel: "কর্পোরেট প্যাকেজ",
    icon: "fa-solid fa-building",
    description:
      "বিভিন্ন স্বনামধন্য অফিস, কর্পোরেট হাউজ এবং বিজনেস টিমগুলোর বার্ষিক ট্যুর ও রিফ্রেশমেন্ট ইভেন্ট প্ল্যানার।",
    hasImage: true,
    itemNounSingular: "প্যাকেজ",
    accent: "iris",
    ctaLabel: "বুক করুন",
    ctaIcon: "fa-solid fa-phone",
  },
  {
    slug: "custom-tour",
    label: "কাস্টমাইজড ভ্রমণ প্যাকেজ",
    shortLabel: "কাস্টম ট্যুর",
    icon: "fa-solid fa-sliders",
    description:
      "আপনার ব্যক্তিগত বাজেট, সময় এবং পছন্দের যেকোনো আকর্ষণীয় লোকেশন অনুযায়ী নিজের মতো ট্যুর প্ল্যান সাজানোর স্বাধীনতা।",
    hasImage: true,
    itemNounSingular: "প্যাকেজ",
    accent: "meadow",
    ctaLabel: "বুক করুন",
    ctaIcon: "fa-solid fa-phone",
  },
];

export function getCategory(slug: string): CategoryConfig | undefined {
  return CATEGORIES.find((c) => c.slug === slug);
}

/**
 * Every literal Tailwind class name a category accent might need, written
 * out in full so Tailwind's build-time scanner can find them (dynamically
 * building strings like `bg-${accent}` would not be detected).
 */
export const ACCENT_CLASSES: Record<
  AccentKey,
  {
    text: string;
    chipBg: string;
    chipHoverBg: string;
    hoverBorder: string;
    solidBg: string;
    solidHoverBg: string;
    ring: string;
    gradient: string;
  }
> = {
  lagoon: {
    text: "text-lagoon",
    chipBg: "bg-lagoon/15",
    chipHoverBg: "group-hover:bg-lagoon",
    hoverBorder: "hover:border-lagoon",
    solidBg: "bg-lagoon",
    solidHoverBg: "hover:bg-lagoon",
    ring: "focus:border-lagoon",
    gradient: "from-lagoon to-lagoon/80",
  },
  marigold: {
    text: "text-marigold",
    chipBg: "bg-marigold/15",
    chipHoverBg: "group-hover:bg-marigold",
    hoverBorder: "hover:border-marigold",
    solidBg: "bg-marigold",
    solidHoverBg: "hover:bg-marigold",
    ring: "focus:border-marigold",
    gradient: "from-marigold to-marigold/80",
  },
  vermillion: {
    text: "text-vermillion",
    chipBg: "bg-vermillion/15",
    chipHoverBg: "group-hover:bg-vermillion",
    hoverBorder: "hover:border-vermillion",
    solidBg: "bg-vermillion",
    solidHoverBg: "hover:bg-vermillion",
    ring: "focus:border-vermillion",
    gradient: "from-vermillion to-vermillion/80",
  },
  coral: {
    text: "text-coral",
    chipBg: "bg-coral/15",
    chipHoverBg: "group-hover:bg-coral",
    hoverBorder: "hover:border-coral",
    solidBg: "bg-coral",
    solidHoverBg: "hover:bg-coral",
    ring: "focus:border-coral",
    gradient: "from-coral to-coral/80",
  },
  iris: {
    text: "text-iris",
    chipBg: "bg-iris/15",
    chipHoverBg: "group-hover:bg-iris",
    hoverBorder: "hover:border-iris",
    solidBg: "bg-iris",
    solidHoverBg: "hover:bg-iris",
    ring: "focus:border-iris",
    gradient: "from-iris to-iris/80",
  },
  meadow: {
    text: "text-meadow",
    chipBg: "bg-meadow/15",
    chipHoverBg: "group-hover:bg-meadow",
    hoverBorder: "hover:border-meadow",
    solidBg: "bg-meadow",
    solidHoverBg: "hover:bg-meadow",
    ring: "focus:border-meadow",
    gradient: "from-meadow to-meadow/80",
  },
};
