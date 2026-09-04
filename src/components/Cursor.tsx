import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 350, damping: 32, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 350, damping: 32, mass: 0.6 });

  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement | null;
      const tagged = target?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(tagged?.dataset.cursor ?? null);
      setHovering(!!target?.closest?.("a, button, [data-hover], [data-cursor]"));
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[120] hidden [@media(pointer:fine)]:block">
      {/* trailing ring / label bubble */}
      <motion.div
        style={{ x: rx, y: ry }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: label ? 84 : hovering ? 52 : 34,
            height: label ? 84 : hovering ? 52 : 34,
            backgroundColor: label ? "rgba(255,59,48,1)" : "rgba(255,59,48,0)",
            borderColor: label ? "rgba(255,59,48,0)" : "rgba(236,232,223,0.55)",
          }}
          transition={{ type: "spring", stiffness: 320, damping: 26 }}
          className="flex -translate-x-0 items-center justify-center rounded-full border"
        >
          {label && (
            <span className="font-mono text-[10px] font-bold tracking-[0.2em] text-black">
              {label}
            </span>
          )}
        </motion.div>
      </motion.div>
      {/* core dot */}
      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <div className="h-1.5 w-1.5 rounded-full bg-signal" />
      </motion.div>
    </div>
  );
}
