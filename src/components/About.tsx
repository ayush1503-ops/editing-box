import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { Film } from "lucide-react";
import { FadeUp, MaskText } from "./MaskText";

function CountUp({ to, decimals = 0 }: { to: number; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setVal(v),
    });
    return () => controls.stop();
  }, [inView, to]);

  return <span ref={ref}>{val.toFixed(decimals)}</span>;
}

function Stat({ value, decimals, label, delay }: { value: number; decimals?: number; label: string; delay: number }) {
  return (
    <FadeUp delay={delay} className="group border-t border-bone/15 pt-6 transition-colors duration-500 hover:border-signal">
      <p className="font-display text-7xl leading-none text-bone transition-colors duration-500 group-hover:text-signal md:text-8xl">
        <CountUp to={value} decimals={decimals} />
        <span className="text-signal">+</span>
      </p>
      <p className="mt-3 font-mono text-[11px] tracking-[0.3em] text-smoke">{label}</p>
    </FadeUp>
  );
}

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden px-5 py-28 md:px-10 md:py-40">
      <div className="mb-12 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-smoke">
        <span className="text-signal">( 01 )</span>
        <span>WHO WE ARE</span>
      </div>

      <div className="grid gap-14 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7">
          <h2 className="font-display uppercase leading-[0.9] tracking-tight">
            <MaskText>
              <span className="text-outline block text-[13vw] md:text-[7.5vw]">MEET</span>
            </MaskText>
            <MaskText delay={0.12}>
              <span className="block text-[13vw] text-bone md:text-[7.5vw]">
                EDITING<span className="text-signal">BOX</span>
              </span>
            </MaskText>
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-2">
            <Stat value={2.5} decimals={1} label="YEARS OF EXPERIENCE" delay={0} />
            <Stat value={50} label="CLIENT PROJECTS" delay={0.15} />
          </div>
        </div>

        <div className="flex flex-col justify-between gap-16 md:col-span-5">
          <div className="space-y-8 md:pl-8">
            <FadeUp delay={0.2}>
              <p className="max-w-md text-lg leading-relaxed text-bone/90 md:text-xl">
                <span className="text-signal">We're EditingBox</span> — a video editing studio
                turning raw footage into stories that move people. We blend sharp cuts, motion
                and sound into work that stands out.
              </p>
            </FadeUp>
            <FadeUp delay={0.3}>
              <p className="max-w-md leading-relaxed text-smoke">
                Every video on this page is a piece of that craft: montages and edits built with
                the same obsession for detail — from the first frame to the last export.
              </p>
            </FadeUp>
            <FadeUp delay={0.4}>
              <div className="flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-signal">
                <Film className="h-4 w-4" strokeWidth={1.6} />
                FIRST FRAME — LAST EXPORT
              </div>
            </FadeUp>
          </div>
        </div>
      </div>

      {/* studio frame */}
      <FadeUp delay={0.1} className="mt-20 md:mt-28">
        <div className="group relative aspect-[16/9] overflow-hidden border border-bone/10 bg-black md:aspect-[21/9]" data-cursor="VIEW">
          {/* our logo, front and center in the suite */}
          <img
            src="logo.png"
            alt="EditingBox — video editing agency logo"
            className="absolute inset-0 z-10 h-full w-full object-contain transition-[transform,filter] duration-700 group-hover:scale-[1.04] group-hover:brightness-110"
          />
          {/* frame corners */}
          <span className="absolute left-4 top-4 h-5 w-5 border-l-2 border-t-2 border-bone/70" />
          <span className="absolute right-4 top-4 h-5 w-5 border-r-2 border-t-2 border-bone/70" />
          <span className="absolute bottom-4 left-4 h-5 w-5 border-b-2 border-l-2 border-bone/70" />
          <span className="absolute bottom-4 right-4 h-5 w-5 border-b-2 border-r-2 border-bone/70" />
          <div className="absolute left-1/2 top-4 -translate-x-1/2 font-mono text-[10px] tracking-[0.35em] text-bone/80">
            <span className="mr-2 inline-block h-2 w-2 animate-blink rounded-full bg-signal align-middle" />
            THE SUITE
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.35em] text-bone/80">
            WHERE THE CUTS HAPPEN
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
