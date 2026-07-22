import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import LogoutButton from "@/components/LogoutButton";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-navy">
      <div className="flex items-center justify-between bg-dark px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="rounded-md bg-gradient-to-br from-primary to-primary-hover px-4 py-1.5 text-lg font-bold text-white">
            কাফেলা
          </span>
          <span className="text-xs font-bold uppercase tracking-wide text-gray-300">
            Admin Panel
          </span>
        </Link>
        {user && (
          <div className="flex items-center gap-4 text-sm text-gray-300">
            <span className="hidden sm:inline">{user.email}</span>
            <LogoutButton />
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
