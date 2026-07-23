import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import CategoryForm from "./CategoryForm";

// This route is protected by middleware.ts, but middleware runs in a
// separate edge layer that can behave unreliably on some hosts. Checking
// again here, directly in the page's own server render, means this page
// stays protected even if that edge layer doesn't run as expected.
export default async function AdminCategoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return <CategoryForm />;
}
