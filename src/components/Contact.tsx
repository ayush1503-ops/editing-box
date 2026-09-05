import { useState } from "react";
import type { ReactNode } from "react";
import { ArrowUpRight, Check, Copy, Mail, MessageCircle, Phone } from "lucide-react";
import { FadeUp, MaskText } from "./MaskText";

const EMAIL = "editorbox26@gmail.com";
const PHONES = [
  { display: "9175959250", tel: "9175959250" },
  { display: "9284238935", tel: "9284238935" },
];
const WHATSAPP = "https://wa.me/919175959250";

/** One channel card: mono label, display value(s), arrow affordance — same grid system for every channel */
function ChannelCard({
  icon,
  label,
  href,
  external,
  delay,
  children,
  action,
}: {
  icon: ReactNode;
  label: string;
  href?: string;
  external?: boolean;
  delay: number;
  children: ReactNode;
  action?: ReactNode;
}) {
  const inner = (
    <>
      <div className="flex items-start justify-between gap-4">
        <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.3em] text-signal">
          {icon}
          {label}
        </p>
        <ArrowUpRight
          className="h-5 w-5 shrink-0 text-smoke transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal md:h-6 md:w-6"
          strokeWidth={1.6}
        />
      </div>
      <div className="mt-5">{children}</div>
      {action && <div className="mt-5">{action}</div>}
    </>
  );

  const cls =
    "group block h-full border border-bone/10 bg-ink/60 p-6 transition-colors duration-500 hover:border-signal/60 hover:bg-ink md:p-8";

  return (
    <FadeUp delay={delay} className="h-full">
      {href ? (
        <a
          href={href}
          {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}
          className={cls}
        >
          {inner}
        </a>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </FadeUp>
  );
}

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
    <section id="contact" className="relative overflow-hidden border-t border-bone/10 px-5 py-14 md:px-10 md:py-20">
      {/* glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 40% at 50% 100%, rgba(255,59,48,0.14), transparent 65%)",
        }}
      />

      <div className="relative z-10">
        <div className="mb-8 flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-smoke">
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

        <FadeUp delay={0.2} className="mt-6 text-center">
          <p className="mx-auto max-w-md text-smoke">
            Got footage waiting for a story? Pick a channel — we answer fast and cut faster.
          </p>
        </FadeUp>

        {/* channel cards — one system: label / value / arrow */}
        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-5">
          <ChannelCard
            icon={<Phone className="h-3.5 w-3.5" />}
            label="CALL THE STUDIO"
            href={`tel:${PHONES[0].tel}`}
            delay={0}
          >
            <div className="flex flex-col gap-1">
              {PHONES.map((p) => (
                <span
                  key={p.tel}
                  className="link-sweep w-fit font-display text-2xl tracking-wide text-bone transition-colors duration-500 group-hover:text-signal md:text-3xl"
                >
                  {p.display}
                </span>
              ))}
            </div>
          </ChannelCard>

          <ChannelCard
            icon={<MessageCircle className="h-3.5 w-3.5" />}
            label="WHATSAPP"
            href={WHATSAPP}
            external
            delay={0.1}
          >
            <p className="font-display text-2xl tracking-wide text-bone transition-colors duration-500 group-hover:text-signal md:text-3xl">
              {PHONES[0].display}
            </p>
            <p className="mt-2 font-mono text-[10px] tracking-[0.25em] text-smoke">
              SEND FOOTAGE LINKS DIRECTLY
            </p>
          </ChannelCard>

          <ChannelCard
            icon={<Mail className="h-3.5 w-3.5" />}
            label="WRITE TO US"
            href={`mailto:${EMAIL}`}
            delay={0.2}
            action={
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  copyEmail();
                }}
                data-hover
                className="flex items-center gap-2 border border-bone/20 px-4 py-2 font-mono text-[10px] tracking-[0.25em] text-smoke transition-colors duration-300 hover:border-bone hover:text-bone"
                aria-label="Copy email address"
              >
                {copied ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-signal" /> COPIED
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" /> COPY ADDRESS
                  </>
                )}
              </button>
            }
          >
            <p className="break-all font-display text-2xl tracking-wide text-bone transition-colors duration-500 group-hover:text-signal md:text-3xl">
              {EMAIL}
            </p>
          </ChannelCard>
        </div>

        <FadeUp delay={0.3} className="mt-8 text-center">
          <p className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] text-smoke">
            <span className="h-1.5 w-1.5 animate-blink rounded-full bg-signal" />
            BASED IN INDIA — WORKING WORLDWIDE
          </p>
        </FadeUp>
      </div>
    </section>
  );
}
