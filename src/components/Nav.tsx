import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clapperboard, Menu, X } from "lucide-react";

const LINKS = [
  { label: "ABOUT", href: "#about" },
  { label: "WORK", href: "#work" },
  { label: "SERVICES", href: "#services" },
  { label: "CONTACT", href: "#contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[70] mix-blend-difference">
        <nav className="flex items-center justify-between px-5 py-5 md:px-10">
          <a href="#top" className="flex items-center gap-2 text-bone" data-hover>
            <Clapperboard className="h-5 w-5 text-signal" strokeWidth={2.2} />
            <span className="font-display text-lg tracking-wide">
              EDITING<span className="text-signal">BOX</span>
              <sup className="ml-0.5 font-mono text-[9px]">®</sup>
            </span>
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="link-sweep font-mono text-[11px] tracking-[0.25em] text-bone/80 transition-colors hover:text-bone"
              >
                {l.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setOpen(true)}
            className="text-bone md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[80] flex flex-col justify-between bg-signal p-6 text-black"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg tracking-wide">EDITINGBOX®</span>
              <button onClick={() => setOpen(false)} aria-label="Close menu">
                <X className="h-7 w-7" />
              </button>
            </div>

            <div className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  initial={{ x: -40, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display text-6xl leading-[1.05] tracking-tight"
                >
                  {l.label}
                </motion.a>
              ))}
            </div>

            <div className="flex flex-col gap-1 font-mono text-xs tracking-[0.15em]">
              <a href="mailto:editorbox26@gmail.com">EDITORBOX26@GMAIL.COM</a>
              <div className="flex gap-4">
                <a href="tel:9175959250">9175959250</a>
                <span>/</span>
                <a href="tel:9284238935">9284238935</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
