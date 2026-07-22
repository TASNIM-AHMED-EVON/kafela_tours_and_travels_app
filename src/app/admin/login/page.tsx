"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError("ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।");
      return;
    }

    const next = searchParams.get("next") || "/admin/dashboard";
    router.push(next);
    router.refresh();
  }

  return (
    <div className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-5 py-12">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="animate-blob-drift absolute -left-24 top-10 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="animate-blob-drift-slow absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-iris/10 blur-3xl" />
      </div>
      <div className="glass-panel relative w-full max-w-sm rounded-2xl p-9 shadow-premium">
        <div className="mb-5 flex justify-center">
          <span className="rounded-md bg-gold-gradient px-5 py-2 font-display text-2xl font-bold text-dark shadow-gold-glow">
            কাফেলা
          </span>
        </div>
        <h2 className="mb-1 text-center font-display text-xl font-bold text-white">অ্যাডমিন লগইন</h2>
        <p className="mb-7 text-center text-sm text-white/55">
          প্যাকেজ ও তথ্য পরিচালনা করতে লগইন করুন
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-semibold text-white/85">
              ইমেইল
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full rounded-md border-2 border-white/15 bg-navy/50 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-primary"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-semibold text-white/85">
              পাসওয়ার্ড
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-md border-2 border-white/15 bg-navy/50 px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition focus:border-primary"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-gold-gradient py-3 font-bold text-dark shadow-gold-glow transition hover:brightness-110 disabled:opacity-60"
          >
            {loading ? "লগইন হচ্ছে..." : "লগইন করুন"}
          </button>

          {error && (
            <p className="rounded-md bg-vermillion/15 p-3 text-center text-sm text-vermillion">
              {error}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
