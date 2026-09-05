import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Play, Scissors } from "lucide-react";

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
            <motion.span
              {...reveal(0.35)}
              className="hover-signal block text-[19.5vw] text-bone md:text-[17vw]"
            >
              EDITING
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span
              {...reveal(0.48)}
              className="text-outline hover-outline-signal block text-[19.5vw] md:text-[17vw]"
            >
              BOX
              <span className="text-signal" style={{ WebkitTextStroke: "0px" }}>
                .
              </span>
            </motion.span>
          </span>
        </h1>

        {/* profile card + CTAs — two columns on desktop so the right half stays filled */}
        <div className="mt-8 grid items-center gap-8 md:mt-10 md:grid-cols-12 md:gap-10">
          {/* profile picture — the brand mark, big, in front */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.9, ease: EASE }}
            className="w-full md:col-span-5"
          >
            <div className="relative aspect-square overflow-hidden rounded-md border border-bone/15 bg-ink">
              <img
                src="logo-mark.png"
                alt="EditingBox — profile"
                className="absolute inset-0 h-full w-full object-contain p-3 md:p-4"
              />
              <span className="absolute bottom-4 left-4 bg-signal px-4 py-2 font-mono text-[11px] font-bold tracking-[0.2em] text-black">
                EST. 2023
              </span>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
            className="flex flex-wrap items-center gap-4 md:col-span-7 md:gap-6"
          >
            <a
              href="#work"
              data-hover
              className="group flex items-center gap-3 bg-signal px-8 py-4 font-display text-xl uppercase tracking-tight text-black transition-colors duration-500 hover:bg-bone md:px-10 md:py-5 md:text-2xl"
            >
              <Play className="h-5 w-5 fill-black transition-transform duration-500 group-hover:scale-125 md:h-6 md:w-6" />
              WATCH VIDEOS
            </a>
            <a
              href="#contact"
              data-hover
              className="group flex items-center gap-3 border border-bone/30 px-8 py-4 font-display text-xl uppercase tracking-tight text-bone transition-colors duration-500 hover:border-signal hover:text-signal md:px-10 md:py-5 md:text-2xl"
            >
              GET IN TOUCH
              <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 md:h-6 md:w-6" />
            </a>
          </motion.div>
        </div>
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
