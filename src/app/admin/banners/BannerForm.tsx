"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import type { BannerItem } from "@/types/database";

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB

const EMPTY_FORM = {
  id: "" as string | null,
  title: "",
  link_url: "",
  image_url: "",
  display_order: "0",
};

export default function BannerForm() {
  const supabase = createClient();

  const [banners, setBanners] = useState<BannerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);

  const imagePreviewUrl = useMemo(
    () => (imageFile ? URL.createObjectURL(imageFile) : null),
    [imageFile]
  );
  useEffect(() => {
    return () => {
      if (imagePreviewUrl) URL.revokeObjectURL(imagePreviewUrl);
    };
  }, [imagePreviewUrl]);

  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const loadBanners = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("banners")
      .select("*")
      .order("display_order", { ascending: true });

    if (error) {
      setMessage({ type: "error", text: `তথ্য লোড করতে সমস্যা হয়েছে: ${error.message}` });
    } else {
      setBanners((data ?? []) as BannerItem[]);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    loadBanners();
  }, [loadBanners]);

  function resetForm() {
    setForm(EMPTY_FORM);
    setImageFile(null);
    setImageError(null);
  }

  function editBanner(banner: BannerItem) {
    setForm({
      id: banner.id,
      title: banner.title ?? "",
      link_url: banner.link_url ?? "",
      image_url: banner.image_url,
      display_order: String(banner.display_order ?? 0),
    });
    setImageFile(null);
    setImageError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(banner: BannerItem) {
    if (!confirm("এই ব্যানারটি ডিলিট করতে চান? এই কাজটি ফিরিয়ে নেওয়া যাবে না।")) return;

    const { error } = await supabase.from("banners").delete().eq("id", banner.id);
    if (error) {
      setMessage({ type: "error", text: `ডিলিট করতে সমস্যা হয়েছে: ${error.message}` });
      return;
    }
    setMessage({ type: "success", text: "সফলভাবে ডিলিট করা হয়েছে।" });
    loadBanners();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.id && !imageFile) {
      setMessage({ type: "error", text: "নতুন ব্যানারের জন্য একটি ছবি বাছাই করা আবশ্যক।" });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      let imageUrl = form.image_url || null;

      if (imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("banner-images")
          .upload(path, imageFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("banner-images")
          .getPublicUrl(path);
        imageUrl = publicUrlData.publicUrl;
      }

      const payload = {
        image_url: imageUrl as string,
        title: form.title.trim() || null,
        link_url: form.link_url.trim() || null,
        display_order: Number(form.display_order) || 0,
      };

      if (form.id) {
        const { error } = await supabase.from("banners").update(payload).eq("id", form.id);
        if (error) throw error;
        setMessage({ type: "success", text: "সফলভাবে আপডেট করা হয়েছে।" });
      } else {
        const { error } = await supabase.from("banners").insert(payload);
        if (error) throw error;
        setMessage({ type: "success", text: "সফলভাবে যোগ করা হয়েছে।" });
      }

      resetForm();
      loadBanners();
    } catch (err) {
      const text = err instanceof Error ? err.message : "একটি অপ্রত্যাশিত সমস্যা হয়েছে।";
      setMessage({ type: "error", text: `সংরক্ষণ করতে সমস্যা হয়েছে: ${text}` });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Link
        href="/admin/dashboard"
        className="mb-4 inline-flex items-center gap-2 text-sm text-white/50 hover:text-primary"
      >
        <i className="fa-solid fa-arrow-left" /> ড্যাশবোর্ডে ফিরে যান
      </Link>
      <h1 className="mb-1 font-display text-2xl font-bold text-white">হোম পেজ ব্যানার</h1>
      <p className="mb-8 text-sm text-white/55">
        এখানে যেসব ছবি যোগ করবেন, সেগুলো হোম পেজে হেডারের ঠিক নিচে স্লাইডশো আকারে ঘুরতে থাকবে। কোনো
        ব্যানার না থাকলে এই অংশটি ওয়েবসাইটে দেখানো হবে না।
      </p>

      {message && (
        <div
          className={`mb-6 rounded-md p-4 text-sm ${
            message.type === "error" ? "bg-vermillion/15 text-vermillion" : "bg-meadow/15 text-meadow"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Add / Edit form */}
      <div className="mb-10 rounded-2xl border border-white/10 bg-surface p-6 shadow-premium sm:p-8">
        <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-white">
          <i className="fa-solid fa-circle-plus text-primary" />
          {form.id ? "ব্যানার এডিট করুন" : "নতুন ব্যানার যোগ করুন"}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-white/85">ছবি *</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0] ?? null;
                if (file && file.size > MAX_IMAGE_BYTES) {
                  setImageError("ছবির সাইজ ৫ MB-এর বেশি হতে পারবে না। অনুগ্রহ করে ছোট সাইজের ছবি বেছে নিন।");
                  setImageFile(null);
                  e.target.value = "";
                  return;
                }
                setImageError(null);
                setImageFile(file);
              }}
              className="block w-full text-sm text-white/60 file:mr-4 file:rounded-md file:border-0 file:bg-primary/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/30"
            />
            <p className="mt-1 text-xs text-white/40">
              চওড়া ছবি ভালো দেখাবে (যেমন: ১৬০০x৭০০ পিক্সেল আকৃতির কাছাকাছি)।
            </p>
            {imageError && <p className="mt-2 text-xs text-vermillion">{imageError}</p>}
            {(imageFile || form.image_url) && (
              <div className="relative mt-3 aspect-[16/7] w-full max-w-md overflow-hidden rounded-md border border-white/15">
                <Image
                  src={imagePreviewUrl ?? form.image_url}
                  alt="preview"
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
            )}
          </div>

          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-white/85">লিংক (ঐচ্ছিক)</label>
            <input
              value={form.link_url}
              onChange={(e) => setForm({ ...form, link_url: e.target.value })}
              placeholder="যেমন: /packages/admission-search"
              className="w-full rounded-md border-2 border-white/15 bg-navy/50 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-primary"
            />
            <p className="mt-1 text-xs text-white/40">
              ব্যানারে ক্লিক করলে মানুষ কোথায় যাবে (খালি রাখলে ক্লিক করা যাবে না)।
            </p>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-white/85">টাইটেল (ঐচ্ছিক)</label>
            <input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="শুধু নিজের রেফারেন্সের জন্য"
              className="w-full rounded-md border-2 border-white/15 bg-navy/50 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-white/85">ক্রম নম্বর</label>
            <input
              type="number"
              value={form.display_order}
              onChange={(e) => setForm({ ...form, display_order: e.target.value })}
              className="w-full rounded-md border-2 border-white/15 bg-navy/50 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-primary"
            />
            <p className="mt-1 text-xs text-white/40">ছোট সংখ্যা আগে দেখাবে (ঐচ্ছিক)</p>
          </div>

          <div className="flex items-end gap-3 sm:col-span-2">
            <button
              type="submit"
              disabled={saving}
              className="rounded-md bg-gold-gradient px-6 py-2.5 text-sm font-bold text-dark shadow-gold-glow transition hover:brightness-110 disabled:opacity-60"
            >
              {saving ? "সংরক্ষণ হচ্ছে..." : form.id ? "আপডেট করুন" : "যোগ করুন"}
            </button>
            {form.id && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-md border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-semibold text-white"
              >
                বাতিল করুন
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List */}
      <div className="rounded-2xl border border-white/10 bg-surface p-6 shadow-premium sm:p-8">
        <h2 className="mb-5 font-display text-lg font-bold text-white">তালিকা ({banners.length})</h2>

        {loading && <p className="py-8 text-center text-white/40">লোড হচ্ছে...</p>}

        {!loading && banners.length === 0 && (
          <p className="py-8 text-center text-white/40">এখনো কোনো ব্যানার যোগ করা হয়নি।</p>
        )}

        {!loading && banners.length > 0 && (
          <div className="divide-y divide-white/10">
            {banners.map((banner) => (
              <div key={banner.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-24 shrink-0 overflow-hidden rounded-md bg-navy/60">
                    <Image src={banner.image_url} alt={banner.title ?? "ব্যানার"} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{banner.title || "(কোনো টাইটেল নেই)"}</p>
                    <p className="text-xs text-white/55">
                      {banner.link_url ? banner.link_url : "কোনো লিংক নেই"} · ক্রম: {banner.display_order}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editBanner(banner)}
                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-primary/20 hover:text-primary"
                  >
                    <i className="fa-solid fa-pen" /> এডিট
                  </button>
                  <button
                    onClick={() => handleDelete(banner)}
                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-vermillion/20 hover:text-vermillion"
                  >
                    <i className="fa-solid fa-trash" /> ডিলিট
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
