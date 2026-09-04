import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const WORD = "EDITINGBOX".split("");

export default function Preloader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let v = 0;
    const id = setInterval(() => {
      v += Math.floor(Math.random() * 9) + 3;
      if (v >= 100) {
        v = 100;
        clearInterval(id);
        setTimeout(onDone, 450);
      }
      setCount(v);
    }, 65);
    return () => clearInterval(id);
  }, [onDone]);

  return (
    <motion.div
      exit={{ y: "-100%" }}
      transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[110] flex flex-col justify-between bg-void p-6 md:p-10"
    >
      <div className="flex items-center justify-between font-mono text-[10px] tracking-[0.3em] text-smoke">
        <span>EDITINGBOX®</span>
        <span className="text-signal">LOADING FOOTAGE</span>
      </div>

      <div className="flex items-center justify-center">
        <h1 className="flex overflow-hidden font-display text-[11vw] leading-none tracking-tight md:text-[7vw]">
          {WORD.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.7, delay: 0.08 + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
              className={letter === "B" || letter === "O" || letter === "X" ? "text-signal" : "text-bone"}
            >
              {letter}
            </motion.span>
          ))}
        </h1>
      </div>

      <div className="flex items-end justify-between">
        <div className="font-mono text-[10px] tracking-[0.3em] text-smoke">
          <span className="mr-2 inline-block h-2 w-2 animate-blink rounded-full bg-signal align-middle" />
          REC — ASSEMBLING TIMELINE
        </div>
        <div className="font-display text-6xl text-bone md:text-8xl">
          {count}
          <span className="text-signal">%</span>
        </div>
      </div>
    </motion.div>
  );
}
