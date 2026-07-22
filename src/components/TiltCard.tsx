"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Wraps a card so it tilts in 3D toward the cursor and catches a soft light
 * sheen — the "premium product card" effect used on high-end marketing sites.
 * Pure CSS hover states can't do the perspective math, so this is a small
 * client component; everything else in the card can stay a server component.
 */
export default function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), {
    stiffness: 220,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 220,
    damping: 20,
  });
  const glowX = useTransform(rawX, [-0.5, 0.5], ["10%", "90%"]);
  const glowY = useTransform(rawY, [-0.5, 0.5], ["10%", "90%"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className={`group relative ${className}`}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(280px circle at ${glowX} ${glowY}, rgba(232,205,122,0.16), transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
