import { createClient } from "@/lib/supabase/server";
import { getCategory } from "@/lib/categories";

function timeAgo(dateStr: string): string {
  const diffMs = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 1) return "এইমাত্র";
  if (mins < 60) return `${mins} মিনিট আগে`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours} ঘণ্টা আগে`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days} দিন আগে`;
  const months = Math.floor(days / 30);
  return `${months} মাস আগে`;
}

/**
 * A live-feeling ticker showing the most recently added packages, pulled
 * directly from Supabase — genuine activity, not decorative fake numbers.
 * Renders nothing if the database is empty, rather than showing an odd
 * empty scrolling strip.
 */
export default async function LiveUpdatesTicker() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("packages")
    .select("id, title, category, created_at")
    .order("created_at", { ascending: false })
    .limit(12);

  const items = data ?? [];
  if (items.length === 0) return null;

  // Duplicated so the CSS animation (0% -> -50%) loops seamlessly.
  const loopItems = [...items, ...items];

  return (
    <div className="relative overflow-hidden border-y border-white/10 bg-dark/70 py-3 backdrop-blur-sm">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-dark to-transparent sm:w-28" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-dark to-transparent sm:w-28" />

      <div className="group flex w-max">
        <div className="flex animate-marquee items-center gap-10 group-hover:[animation-play-state:paused]">
          {loopItems.map((item, i) => {
            const cat = getCategory(item.category);
            return (
              <div key={`${item.id}-${i}`} className="flex shrink-0 items-center gap-3 whitespace-nowrap">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-meadow opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-meadow" />
                </span>
                {cat && <i className={`${cat.icon} text-primary`} />}
                <span className="text-sm font-semibold text-white">{item.title}</span>
                {cat && <span className="text-xs text-white/40">· {cat.shortLabel}</span>}
                <span className="text-xs text-white/30">· {timeAgo(item.created_at)}</span>
                <span className="text-white/15">|</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
