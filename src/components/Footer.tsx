import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">
      {/* ghost marquee */}
      <div className="pointer-events-none flex w-max animate-marquee-slow py-4 opacity-100">
        {[0, 1].map((n) => (
          <div key={n} className="flex shrink-0 items-center">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={i} className="flex items-center">
                <span className="text-outline-faint mx-6 font-display text-[14vw] uppercase leading-none tracking-tight md:text-[8vw]">
                  EDITINGBOX®
                </span>
                <span className="h-3 w-3 rotate-45 bg-signal md:h-4 md:w-4" />
              </span>
            ))}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center justify-between gap-4 border-t border-bone/10 px-5 py-6 font-mono text-[10px] tracking-[0.25em] text-smoke md:flex-row md:px-10">
        <span>© 2026 EDITINGBOX® — ALL FRAMES RESERVED</span>
        <span className="text-bone">RAW IN. STORY OUT.</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="group flex items-center gap-2 text-bone"
          aria-label="Back to top"
        >
          BACK TO TOP
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-bone/30 transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-black">
            <ArrowUp className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </span>
        </button>
      </div>
    </footer>
  );
}
