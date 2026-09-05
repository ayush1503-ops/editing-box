import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { ReactNode } from "react";

/** Reveal margin: content starts animating 200px BEFORE it enters the screen,
 *  so visible space is never an empty black hole */
const TRIGGER = "200px";

export function MaskText({
  children,
  delay = 0,
  className = "",
  as: Tag = "span",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "span" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: TRIGGER });

  return (
    <Tag className={`block overflow-hidden ${className}`}>
      <motion.span
        ref={ref}
        className="block will-change-transform"
        initial={{ y: "112%" }}
        animate={inView ? { y: "0%" } : { y: "112%" }}
        transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}

export function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: TRIGGER });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 32, opacity: 0 }}
      animate={inView ? { y: 0, opacity: 1 } : { y: 32, opacity: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
