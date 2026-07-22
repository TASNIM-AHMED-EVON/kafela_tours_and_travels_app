"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Fades and slides content up into place the first time it scrolls into
 * view. Wrap any section/card in this instead of hand-rolling
 * IntersectionObservers everywhere.
 */
export default function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
