import { useState } from "react";
import { ArrowUpRight, Check, Copy, Mail, Phone } from "lucide-react";
import { FadeUp, MaskText } from "./MaskText";

const EMAIL = "editorbox26@gmail.com";
const PHONES = [
  { display: "9175959250", tel: "9175959250" },
  { display: "9284238935", tel: "9284238935" },
];

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="contact" className="relative overflow-hidden px-5 pb-28 pt-28 md:px-10 md:pt-40">
      {/* glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 100%, rgba(255,59,48,0.14), transparent 65%)",
        }}
      />

      <div className="relative z-10">
        <div className="mb-12 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-smoke">
          <span className="text-signal">( 04 )</span>
          <span>GET IN TOUCH</span>
        </div>

        <h2 className="text-center font-display uppercase leading-[0.85] tracking-tight">
          <MaskText>
            <span className="text-outline block text-[16vw] md:text-[11vw]">LET'S MAKE</span>
          </MaskText>
          <MaskText delay={0.12}>
            <span className="block text-[16vw] text-bone md:text-[11vw]">
              THE CUT<span className="text-signal">.</span>
            </span>
          </MaskText>
        </h2>

        <FadeUp delay={0.2} className="mt-8 text-center">
          <p className="mx-auto max-w-md text-smoke">
            Got footage waiting for a story? Send it over — we'll cut it into something that
            moves people.
          </p>
        </FadeUp>

        {/* email CTA */}
        <FadeUp delay={0.25} className="mt-14">
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <a
              href={`mailto:${EMAIL}`}
              className="group flex items-center gap-3 border border-bone/20 px-6 py-4 font-display text-xl uppercase tracking-tight text-bone transition-all duration-500 hover:border-signal hover:bg-signal hover:text-black md:px-10 md:py-6 md:text-3xl"
            >
              <Mail className="h-6 w-6 shrink-0 md:h-8 md:w-8" strokeWidth={1.6} />
              {EMAIL}
              <ArrowUpRight
                className="h-5 w-5 shrink-0 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 md:h-7 md:w-7"
                strokeWidth={1.6}
              />
            </a>
            <button
              onClick={copyEmail}
              data-hover
              className="flex items-center gap-2 border border-bone/20 px-5 py-4 font-mono text-[11px] tracking-[0.25em] text-smoke transition-colors duration-300 hover:border-bone hover:text-bone md:py-6"
              aria-label="Copy email address"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-signal" /> COPIED
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" /> COPY
                </>
              )}
            </button>
          </div>
        </FadeUp>

        {/* details grid */}
        <div className="mt-20 grid gap-px overflow-hidden border border-bone/10 bg-bone/10 md:grid-cols-3">
          <FadeUp delay={0} className="bg-void p-8">
            <p className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-signal">
              <Phone className="h-3.5 w-3.5" /> CALL THE STUDIO
            </p>
            <div className="flex flex-col gap-2">
              {PHONES.map((p) => (
                <a
                  key={p.tel}
                  href={`tel:${p.tel}`}
                  className="link-sweep w-fit font-display text-2xl tracking-wide text-bone md:text-3xl"
                >
                  {p.display}
                </a>
              ))}
            </div>
          </FadeUp>

          <FadeUp delay={0.1} className="bg-void p-8">
            <p className="mb-4 flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-signal">
              <Mail className="h-3.5 w-3.5" /> WRITE TO US
            </p>
            <a
              href={`mailto:${EMAIL}`}
              className="link-sweep w-fit break-all font-display text-2xl tracking-wide text-bone md:text-3xl"
            >
              {EMAIL}
            </a>
          </FadeUp>

          <FadeUp delay={0.2} className="bg-void p-8">
            <p className="mb-4 font-mono text-[10px] tracking-[0.3em] text-signal">STUDIO</p>
            <p className="font-display text-2xl uppercase leading-snug tracking-wide text-bone md:text-3xl">
              INDIA —
              <br />
              <span className="text-smoke">WORKING WORLDWIDE</span>
            </p>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
