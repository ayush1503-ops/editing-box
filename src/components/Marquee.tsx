import { Asterisk } from "lucide-react";
import { Fragment } from "react";

const ITEMS = ["MONTAGE", "MOTION GRAPHICS", "COLOR GRADING", "SOUND DESIGN", "VFX", "SHORT-FORM"];

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => (
        <Fragment key={item}>
          <span className="mx-5 font-display text-3xl uppercase tracking-tight text-black md:mx-8 md:text-5xl">
            {item}
          </span>
          <Asterisk className="h-7 w-7 shrink-0 text-black md:h-9 md:w-9" strokeWidth={2.4} />
        </Fragment>
      ))}
    </div>
  );
}

export default function Marquee() {
  return (
    <div className="relative z-10 -mx-2 -rotate-1 overflow-hidden border-y-2 border-black bg-signal py-3 md:py-4">
      <div className="flex w-max animate-marquee">
        <Row />
        <Row />
      </div>
    </div>
  );
}
