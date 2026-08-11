import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import BannerForm from "./BannerForm";

// Same defense-in-depth pattern as the other admin pages: middleware.ts
// protects this route too, but this checks again directly in the page's
// own server render in case that edge layer doesn't run as expected.
export default async function AdminBannersPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  return <BannerForm />;
}
