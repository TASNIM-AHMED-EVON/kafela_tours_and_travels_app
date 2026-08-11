import { createClient } from "@/lib/supabase/server";
import type { BannerItem } from "@/types/database";
import BannerSlider from "./BannerSlider";

/**
 * Fetches the admin-managed promo banners and renders the slider. Returns
 * nothing if no banners exist yet, rather than showing an empty carousel —
 * the homepage looks exactly as it did before until an admin adds one.
 */
export default async function HeroBannerCarousel() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("banners")
    .select("*")
    .order("display_order", { ascending: true });

  const banners = (data ?? []) as BannerItem[];
  if (banners.length === 0) return null;

  return <BannerSlider banners={banners} />;
}
