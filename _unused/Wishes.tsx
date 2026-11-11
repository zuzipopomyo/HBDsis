"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { birthday } from "@/config";

export default function Wishes({ onCelebrate }: { onCelebrate: (x: number, y: number) => void }) {
  const [picked, setPicked] = useState<number | null>(null);

  const pickWish = (e: React.MouseEvent) => {
    let next = Math.floor(Math.random() * birthday.wishes.length);
    if (next === picked) next = (next + 1) % birthday.wishes.length;
    setPicked(next);
    onCelebrate(e.clientX, e.clientY);
  };

  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-24">
      <motion.h2
        className="mb-3 text-center font-display text-4xl text-hotpink sm:text-6xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        My Wishes for You
      </motion.h2>
      <p className="mx-auto mb-10 max-w-md text-center text-ocean">
        {birthday.wishes.length} little wishes from my heart to yours 🌠
      </p>

      {/* lucky wish jar */}
      <div className="mx-auto mb-14 flex max-w-xl flex-col items-center text-center">
        <motion.button
          onClick={pickWish}
          className="cursor-pointer rounded-full bg-gradient-to-r from-hotpink to-ocean px-7 py-3 text-base font-bold text-white shadow-lg shadow-rose/40 sm:text-lg"
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.92 }}
          animate={{ boxShadow: ["0 0 0 0 rgba(255,92,168,0.5)", "0 0 0 16px rgba(255,92,168,0)"] }}
          transition={{ boxShadow: { duration: 1.6, repeat: Infinity } }}
        >
          ✨ Pick a lucky wish ✨
        </motion.button>
        <div className="mt-6 min-h-28 w-full">
          <AnimatePresence mode="wait">
            {picked !== null && (
              <motion.div
                key={picked}
                className="rounded-3xl border-4 border-white bg-white/80 px-6 py-5 shadow-xl backdrop-blur"
                initial={{ opacity: 0, scale: 0.6, rotate: -6 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.6, rotate: 6 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <p className="text-4xl">{birthday.wishes[picked].emoji}</p>
                <p className="mt-1 font-display text-2xl text-hotpink">{birthday.wishes[picked].title}</p>
                <p className="mt-1 text-ink/80">{birthday.wishes[picked].text}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {birthday.wishes.map((w, i) => (
          <motion.div
            key={w.title}
            className={`rounded-2xl border-2 bg-white/75 p-5 shadow-md backdrop-blur ${i % 2 ? "border-baby" : "border-rose"}`}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: (i % 3) * 0.1, type: "spring", stiffness: 140 }}
            whileHover={{ y: -6, rotate: i % 2 ? 1.5 : -1.5 }}
          >
            <div className="flex items-center gap-3">
              <motion.span
                className="text-3xl"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.2 }}
              >
                {w.emoji}
              </motion.span>
              <h3 className={`text-lg font-bold ${i % 2 ? "text-ocean" : "text-hotpink"}`}>{w.title}</h3>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-ink/80 sm:text-base">{w.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
