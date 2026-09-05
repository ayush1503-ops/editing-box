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
          className="flex items-end gap-3 md:gap-4"
        >
          <span className="font-display text-5xl leading-none text-bone md:text-6xl">06</span>
          <span className="flex flex-col gap-1 pb-0.5">
            <span className="text-bone">CREATIVE EDITOR</span>
            <span>EST. 2023 — WORKING WORLDWIDE</span>
          </span>
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

      {/* headline left + mark right — one filled frame, no empty black columns */}
      <div className="relative z-10 px-5 md:px-10">
        <div className="grid items-center gap-10 md:grid-cols-12 md:gap-8">
          {/* left — the name */}
          <div className="md:col-span-7">
            <div className="overflow-hidden">
              <motion.p
                {...reveal(0.55)}
                className="mb-3 flex items-center gap-3 font-mono text-[11px] tracking-[0.35em] text-signal"
              >
                <Scissors className="h-4 w-4" strokeWidth={1.8} />
                RAW FOOTAGE IN — STORIES OUT
              </motion.p>
            </div>

            <h1 className="font-display uppercase leading-[0.84] tracking-tight">
              <span className="block overflow-hidden">
                <motion.span
                  {...reveal(0.3)}
                  className="hover-signal block text-[16.5vw] text-bone md:text-[11.5vw]"
                >
                  EDITING
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  {...reveal(0.42)}
                  className="text-outline hover-outline-signal block text-[16.5vw] md:text-[11.5vw]"
                >
                  BOX
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  {...reveal(0.54)}
                  className="block text-[16.5vw] text-bone md:text-[11.5vw]"
                >
                  EDITS
                  <span className="text-signal" style={{ WebkitTextStroke: "0px" }}>
                    .
                  </span>
                </motion.span>
              </span>
            </h1>

            {/* one-line intro */}
            <div className="mt-5 overflow-hidden md:mt-7">
              <motion.p
                initial={{ y: "112%" }}
                animate={started ? { y: "0%" } : { y: "112%" }}
                transition={{ duration: 0.9, delay: 0.78, ease: EASE }}
                className="max-w-xl text-base leading-relaxed text-smoke md:text-lg"
              >
                Video editor &amp; visual storyteller crafting bold, high-impact content —
                sharpening the craft <span className="text-bone">one frame at a time</span>.
              </motion.p>
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={started ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1.02, duration: 0.9, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-4 md:mt-10 md:gap-6"
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

          {/* right — the mark floating in the scene's red light */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={started ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.92, duration: 0.9, ease: EASE }}
            className="md:col-span-5"
          >
            <div className="relative mx-auto max-w-[15rem] md:max-w-full">
              {/* scene light behind the mark — matches the hero's ambient glow */}
              <div
                className="absolute -inset-8 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 50% 55%, rgba(255,59,48,0.38), rgba(255,59,48,0.12) 45%, transparent 72%)",
                }}
              />
              <motion.img
                src="logo-mark.png"
                alt="EditingBox — logo"
                className="relative w-full select-none drop-shadow-[0_28px_50px_rgba(0,0,0,0.6)]"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap bg-signal px-4 py-2 font-mono text-[11px] font-bold tracking-[0.2em] text-black">
                EST. 2023
              </span>
            </div>
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
