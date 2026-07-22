import type { CategorySlug } from "@/lib/categories";

export interface PackageItem {
  id: string;
  category: CategorySlug;
  title: string;
  location: string | null;
  description: string | null;
  cost: number | null;
  image_url: string | null;
  display_order: number;
  created_at: string;
}

export type PackageItemInput = Omit<PackageItem, "id" | "created_at">;
