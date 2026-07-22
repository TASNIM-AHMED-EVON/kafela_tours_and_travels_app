"use client";

import { useEffect, useState, useCallback } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { getCategory } from "@/lib/categories";
import type { PackageItem } from "@/types/database";

const EMPTY_FORM = {
  id: "" as string | null,
  title: "",
  location: "",
  description: "",
  cost: "",
  image_url: "",
  display_order: "0",
};

export default function AdminCategoryPage() {
  const params = useParams<{ slug: string }>();
  const category = getCategory(params.slug);
  const supabase = createClient();

  const [items, setItems] = useState<PackageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY_FORM);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "error" | "success"; text: string } | null>(null);

  const loadItems = useCallback(async () => {
    if (!category) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("packages")
      .select("*")
      .eq("category", category.slug)
      .order("display_order", { ascending: true });

    if (error) {
      setMessage({ type: "error", text: `তথ্য লোড করতে সমস্যা হয়েছে: ${error.message}` });
    } else {
      setItems((data ?? []) as PackageItem[]);
    }
    setLoading(false);
  }, [category, supabase]);

  useEffect(() => {
    loadItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.slug]);

  if (!category) {
    return (
      <div className="mx-auto max-w-3xl px-5 py-16 text-center">
        <p className="text-white/60">এই প্যাকেজটি খুঁজে পাওয়া যায়নি।</p>
        <Link href="/admin/dashboard" className="mt-4 inline-block text-primary underline">
          ড্যাশবোর্ডে ফিরে যান
        </Link>
      </div>
    );
  }

  function resetForm() {
    setForm(EMPTY_FORM);
    setImageFile(null);
  }

  function editItem(item: PackageItem) {
    setForm({
      id: item.id,
      title: item.title,
      location: item.location ?? "",
      description: item.description ?? "",
      cost: item.cost !== null ? String(item.cost) : "",
      image_url: item.image_url ?? "",
      display_order: String(item.display_order ?? 0),
    });
    setImageFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleDelete(item: PackageItem) {
    if (!confirm(`"${item.title}" ডিলিট করতে চান? এই কাজটি ফিরিয়ে নেওয়া যাবে না।`)) return;

    const { error } = await supabase.from("packages").delete().eq("id", item.id);
    if (error) {
      setMessage({ type: "error", text: `ডিলিট করতে সমস্যা হয়েছে: ${error.message}` });
      return;
    }
    setMessage({ type: "success", text: "সফলভাবে ডিলিট করা হয়েছে।" });
    loadItems();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!category) return;
    setSaving(true);
    setMessage(null);

    try {
      let imageUrl = form.image_url || null;

      if (category.hasImage && imageFile) {
        const ext = imageFile.name.split(".").pop();
        const path = `${category.slug}/${crypto.randomUUID()}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("package-images")
          .upload(path, imageFile, { upsert: true });

        if (uploadError) throw uploadError;

        const { data: publicUrlData } = supabase.storage
          .from("package-images")
          .getPublicUrl(path);
        imageUrl = publicUrlData.publicUrl;
      }

      const payload = {
        category: category.slug,
        title: form.title.trim(),
        location: form.location.trim() || null,
        description: form.description.trim() || null,
        cost: form.cost.trim() === "" ? null : Number(form.cost),
        image_url: imageUrl,
        display_order: Number(form.display_order) || 0,
      };

      if (form.id) {
        const { error } = await supabase.from("packages").update(payload).eq("id", form.id);
        if (error) throw error;
        setMessage({ type: "success", text: "সফলভাবে আপডেট করা হয়েছে।" });
      } else {
        const { error } = await supabase.from("packages").insert(payload);
        if (error) throw error;
        setMessage({ type: "success", text: "সফলভাবে যোগ করা হয়েছে।" });
      }

      resetForm();
      loadItems();
    } catch (err) {
      const text = err instanceof Error ? err.message : "একটি অপ্রত্যাশিত সমস্যা হয়েছে।";
      setMessage({ type: "error", text: `সংরক্ষণ করতে সমস্যা হয়েছে: ${text}` });
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Link href="/admin/dashboard" className="mb-4 inline-flex items-center gap-2 text-sm text-white/50 hover:text-primary">
        <i className="fa-solid fa-arrow-left" /> ড্যাশবোর্ডে ফিরে যান
      </Link>
      <h1 className="mb-1 font-display text-2xl font-bold text-white">{category.label}</h1>
      <p className="mb-8 text-sm text-white/55">{category.description}</p>

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
      <div className="mb-10 rounded-2xl border border-white/10 bg-surface p-6 shadow-lg shadow-black/20 sm:p-8">
        <h2 className="mb-5 flex items-center gap-2 font-display text-lg font-bold text-white">
          <i className="fa-solid fa-circle-plus text-primary" />
          {form.id ? `${category.itemNounSingular} এডিট করুন` : `নতুন ${category.itemNounSingular} যোগ করুন`}
        </h2>

        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="mb-1.5 block text-sm font-semibold text-white/85">
              {category.hasImage ? "প্যাকেজের নাম" : "বিশ্ববিদ্যালয়ের নাম"} *
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="যেমন: ঢাকা বিশ্ববিদ্যালয় (DU)"
              className="w-full rounded-md border-2 border-white/15 bg-navy/50 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-white/85">লোকেশন</label>
            <input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="যেমন: ঢাকা"
              className="w-full rounded-md border-2 border-white/15 bg-navy/50 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-white/85">খরচ (টাকা)</label>
            <input
              type="number"
              min="0"
              value={form.cost}
              onChange={(e) => setForm({ ...form, cost: e.target.value })}
              placeholder="যেমন: 750 (খালি রাখলে 'যোগাযোগ করুন' দেখাবে)"
              className="w-full rounded-md border-2 border-white/15 bg-navy/50 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-primary"
            />
          </div>

          {category.hasImage && (
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-white/85">বিবরণ</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={3}
                placeholder="এই প্যাকেজ সম্পর্কে সংক্ষিপ্ত বিবরণ লিখুন"
                className="w-full rounded-md border-2 border-white/15 bg-navy/50 px-4 py-2.5 text-sm text-white placeholder:text-white/35 outline-none focus:border-primary"
              />
            </div>
          )}

          {category.hasImage && (
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-white/85">ছবি</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-white/60 file:mr-4 file:rounded-md file:border-0 file:bg-primary/20 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary hover:file:bg-primary/30"
              />
              {(imageFile || form.image_url) && (
                <div className="relative mt-3 h-32 w-48 overflow-hidden rounded-md border border-white/15">
                  <Image
                    src={imageFile ? URL.createObjectURL(imageFile) : form.image_url}
                    alt="preview"
                    fill
                    unoptimized
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          )}

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
              className="rounded-md bg-primary px-6 py-2.5 text-sm font-bold text-white transition hover:bg-primary-hover disabled:opacity-60"
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
      <div className="rounded-2xl border border-white/10 bg-surface p-6 shadow-lg shadow-black/20 sm:p-8">
        <h2 className="mb-5 font-display text-lg font-bold text-white">তালিকা ({items.length})</h2>

        {loading && <p className="py-8 text-center text-white/40">লোড হচ্ছে...</p>}

        {!loading && items.length === 0 && (
          <p className="py-8 text-center text-white/40">এখনো কিছু যোগ করা হয়নি।</p>
        )}

        {!loading && items.length > 0 && (
          <div className="divide-y divide-white/10">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  {category.hasImage && (
                    <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-md bg-navy/60">
                      {item.image_url ? (
                        <Image src={item.image_url} alt={item.title} fill className="object-cover" />
                      ) : (
                        <div className="flex h-full items-center justify-center text-white/25">
                          <i className={category.icon} />
                        </div>
                      )}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-white/55">
                      {item.location && <span>{item.location} · </span>}
                      {item.cost ? `${item.cost} টাকা` : "যোগাযোগ করুন"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => editItem(item)}
                    className="rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-white hover:bg-primary/20 hover:text-primary"
                  >
                    <i className="fa-solid fa-pen" /> এডিট
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
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
