"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { birthday } from "@/config";

const words = ["Happy", "Birthday"];

export default function Hero() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setW((n) => (n + 1) % birthday.heroWishes.length), 3000);
    return () => clearInterval(id);
  }, []);
  let index = 0;
  return (
    <section className="relative flex min-h-[100svh] flex-col items-center justify-center px-4 text-center sm:px-6">
      <motion.span
        className="mb-4 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold tracking-widest text-ocean uppercase shadow-sm backdrop-blur sm:px-5 sm:text-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        🎈 today is all about you 🎈
      </motion.span>

      <h1 className="font-display text-[3.4rem] leading-[1.15] sm:text-8xl md:text-9xl">
        {words.map((word, w) => (
          <span key={word} className="inline-block whitespace-nowrap px-2">
            {word.split("").map((ch) => {
              const i = index++;
              return (
                <motion.span
                  key={i}
                  className="inline-block bg-gradient-to-b from-hotpink to-ocean bg-clip-text pb-2 text-transparent"
                  initial={{ opacity: 0, y: 60, rotate: -20 }}
                  animate={{ opacity: 1, y: 0, rotate: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 + w * 0.1, type: "spring", stiffness: 260, damping: 14 }}
                  whileHover={{ y: -12, scale: 1.2, transition: { duration: 0.2 } }}
                  whileTap={{ y: -12, scale: 1.2 }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
        ))}
      </h1>

      <motion.h2
        className="mt-2 font-display text-4xl text-ocean sm:mt-4 sm:text-6xl"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: [0.5, 1.15, 1] }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        {birthday.name} 💖
      </motion.h2>

      <div className="mt-5 flex min-h-14 max-w-sm items-center justify-center sm:min-h-8 sm:max-w-none">
        <AnimatePresence mode="wait">
          <motion.p
            key={w}
            className="font-bold text-hotpink sm:text-lg"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4 }}
          >
            {birthday.heroWishes[w]}
          </motion.p>
        </AnimatePresence>
      </div>

      <motion.p
        className="mt-3 max-w-md text-base font-medium text-ink/80 sm:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        To my big sister and best friend in the whole universe — this one&apos;s
        made with all my love. Keep scrolling, there&apos;s more! 🎁
      </motion.p>

      <motion.a
        href="#memories"
        className="absolute bottom-8 flex flex-col items-center gap-1 text-sm font-semibold text-hotpink"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ opacity: { delay: 2.4 }, y: { duration: 1.6, repeat: Infinity } }}
      >
        scroll down
        <span className="text-2xl">↓</span>
      </motion.a>
    </section>
  );
}
