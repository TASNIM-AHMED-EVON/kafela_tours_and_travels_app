/**
 * Ambient blurred gradient shapes that slowly drift and breathe — the
 * "liquid" background layer used behind hero/section content. Pure CSS
 * animation (see tailwind.config.ts: blob-drift), so it costs nothing on
 * the server and never blocks interactivity.
 */
export default function LiquidBlobs({
  variant = "gold",
}: {
  variant?: "gold" | "jewel";
}) {
  if (variant === "jewel") {
    return (
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="animate-blob-drift absolute -left-24 top-0 h-80 w-80 rounded-full bg-iris/25 blur-3xl" />
        <div className="animate-blob-drift-slow absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-lagoon/20 blur-3xl" />
        <div className="animate-blob-drift absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
      </div>
    );
  }

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="animate-blob-drift absolute -left-20 top-0 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="animate-blob-drift-slow absolute -right-24 top-10 h-[28rem] w-[28rem] rounded-full bg-iris/15 blur-3xl" />
      <div className="animate-blob-drift absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-lagoon/10 blur-3xl" />
    </div>
  );
}
