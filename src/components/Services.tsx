import { ArrowUpRight } from "lucide-react";
import { FadeUp, MaskText } from "./MaskText";

const SERVICES = [
  { n: "01", title: "VIDEO MONTAGE", desc: "Fast-cut edits built on rhythm and story" },
  { n: "02", title: "MOTION GRAPHICS", desc: "Kinetic type and graphics that move with intent" },
  { n: "03", title: "COLOR GRADING", desc: "Cinematic looks, from clean to gritty" },
  { n: "04", title: "SOUND DESIGN", desc: "Hits, risers and mixes that land the cut" },
  { n: "05", title: "VFX & TRANSITIONS", desc: "Seamless tricks you feel, not see" },
  { n: "06", title: "SHORT-FORM CONTENT", desc: "Reels and verticals engineered to hold attention" },
];

export default function Services() {
  return (
    <section id="services" className="relative border-t border-bone/10 px-5 py-14 md:px-10 md:py-20">
      <div className="mb-8 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-smoke">
        <span className="text-signal">( 03 )</span>
        <span>WHAT WE DO</span>
      </div>

      <h2 className="mb-10 font-display uppercase leading-[0.9] tracking-tight md:mb-12">
        <MaskText>
          <span className="text-outline block text-[13vw] md:text-[8vw]">CAPA—</span>
        </MaskText>
        <MaskText delay={0.12}>
          <span className="block text-[13vw] text-bone md:text-[8vw]">
            BILITIES<span className="text-signal">.</span>
          </span>
        </MaskText>
      </h2>

      <div className="border-b border-bone/10">
        {SERVICES.map((s, i) => (
          <FadeUp key={s.n} delay={i * 0.05}>
            <div
              data-hover
              className="group relative flex items-center justify-between gap-4 overflow-hidden border-t border-bone/10 py-6 transition-colors duration-500 md:py-8"
            >
              {/* red sweep */}
              <div className="absolute inset-0 origin-bottom scale-y-0 bg-signal transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-y-100" />
              <div className="relative z-10 flex items-baseline gap-5 md:gap-10">
                <span className="font-mono text-xs tracking-[0.2em] text-signal transition-colors duration-500 group-hover:text-black">
                  ({s.n})
                </span>
                <div>
                  <h3 className="font-display text-3xl uppercase leading-none tracking-tight text-bone transition-colors duration-500 group-hover:text-black md:text-6xl">
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm text-smoke transition-colors duration-500 group-hover:text-black/70">
                    {s.desc}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                className="relative z-10 h-7 w-7 shrink-0 text-smoke transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-black md:h-10 md:w-10"
                strokeWidth={1.5}
              />
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
