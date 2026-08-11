import type { CategorySlug } from "@/lib/categories";

export interface PackageItem {
  id: string;
  category: CategorySlug;
  title: string;
  location: string | null;
  description: string | null;
  cost: number | null;
  image_url: string | null;
  pickup_date: string | null; // "YYYY-MM-DD"
  pickup_time: string | null; // "HH:MM"
  display_order: number;
  created_at: string;
}

export type PackageItemInput = Omit<PackageItem, "id" | "created_at">;

export interface BannerItem {
  id: string;
  image_url: string;
  link_url: string | null;
  title: string | null;
  display_order: number;
  created_at: string;
}
