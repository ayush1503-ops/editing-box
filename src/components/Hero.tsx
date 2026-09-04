import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Scissors } from "lucide-react";

const pad = (n: number) => String(n).padStart(2, "0");

function useTimecode() {
  const [tc, setTc] = useState("00:00:00:00");
  useEffect(() => {
    let f = 0;
    const id = setInterval(() => {
      f += 1;
      const ff = f % 24;
      const s = Math.floor(f / 24) % 60;
      const m = Math.floor(f / 1440) % 60;
      const h = Math.floor(f / 86400) % 24;
      setTc(`${pad(h)}:${pad(m)}:${pad(s)}:${pad(ff)}`);
    }, 1000 / 24);
    return () => clearInterval(id);
  }, []);
  return tc;
}

const EASE = [0.16, 1, 0.3, 1] as const;

export default function Hero({ started }: { started: boolean }) {
  const tc = useTimecode();

  const reveal = (delay: number) => ({
    initial: { y: "112%" },
    animate: started ? { y: "0%" } : { y: "112%" },
    transition: { duration: 1.1, delay, ease: EASE },
  });

  return (
    <section id="top" className="relative flex min-h-svh flex-col justify-between overflow-hidden">
      {/* ambient glow + frame lines */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 45% at 72% 18%, rgba(255,59,48,0.13), transparent 60%), radial-gradient(ellipse 50% 40% at 15% 85%, rgba(255,59,48,0.07), transparent 60%)",
          }}
        />
        <div className="absolute inset-y-0 left-1/4 hidden w-px bg-bone/[0.05] md:block" />
        <div className="absolute inset-y-0 left-2/4 hidden w-px bg-bone/[0.05] md:block" />
        <div className="absolute inset-y-0 left-3/4 hidden w-px bg-bone/[0.05] md:block" />
      </div>

      {/* meta bar */}
      <div className="relative z-10 flex items-start justify-between px-5 pt-24 font-mono text-[10px] tracking-[0.25em] text-smoke md:px-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
          className="flex flex-col gap-1"
        >
          <span className="text-bone">VIDEO EDITING STUDIO</span>
          <span>EST. 2023 — WORKING WORLDWIDE</span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={started ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.05, duration: 0.8, ease: EASE }}
          className="flex items-center gap-2 text-bone"
        >
          <span className="h-2 w-2 animate-blink rounded-full bg-signal" />
          REC <span className="text-smoke">{tc}</span>
        </motion.div>
      </div>

      {/* headline */}
      <div className="relative z-10 px-5 md:px-10">
        <div className="overflow-hidden">
          <motion.p
            {...reveal(0.55)}
            className="mb-2 flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-signal"
          >
            <Scissors className="h-4 w-4" strokeWidth={1.8} />
            RAW FOOTAGE IN — STORIES OUT
          </motion.p>
        </div>

        <h1 className="font-display uppercase leading-[0.84] tracking-tight">
          <span className="block overflow-hidden">
            <motion.span {...reveal(0.35)} className="block text-[19.5vw] text-bone md:text-[17vw]">
              EDITING
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span {...reveal(0.48)} className="text-outline block text-[19.5vw] md:text-[17vw]">
              BOX
              <span className="text-signal" style={{ WebkitTextStroke: "0px" }}>
                .
              </span>
            </motion.span>
          </span>
        </h1>
      </div>

      {/* bottom bar */}
      <div className="relative z-10 border-t border-bone/10 px-5 py-5 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={started ? { opacity: 1 } : {}}
          transition={{ delay: 1.2, duration: 0.9 }}
          className="flex items-end justify-between"
        >
          <div className="grid max-w-md grid-cols-1 gap-1 font-mono text-[10px] leading-relaxed tracking-[0.2em] text-smoke">
            <span>SHARP CUTS / MOTION / SOUND</span>
            <span className="text-bone">MONTAGES BUILT FRAME BY FRAME</span>
          </div>
          <a href="#about" className="group flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-bone">
            SCROLL
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-bone/30 transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-black">
              <ArrowDown className="h-4 w-4 animate-bounce" />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
