"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { birthday } from "@/config";

function FlipCard({ front, back, i }: { front: string; back: string; i: number }) {
  const [flipped, setFlipped] = useState(false);
  const pink = i % 2 === 0;

  return (
    <motion.button
      onClick={() => setFlipped((f) => !f)}
      className="relative h-36 w-full cursor-pointer sm:h-44"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: i * 0.08 }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      aria-label={flipped ? back : "Tap to reveal"}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
      >
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl border-4 border-white shadow-lg ${pink ? "bg-rose" : "bg-baby"}`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <span className="text-4xl sm:text-5xl">{front}</span>
          <span className="text-xs font-bold tracking-wider text-white uppercase">tap me</span>
        </div>
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-2xl border-4 p-4 shadow-lg ${pink ? "border-rose bg-white text-hotpink" : "border-baby bg-white text-ocean"}`}
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-sm font-bold sm:text-base">{back}</span>
        </div>
      </motion.div>
    </motion.button>
  );
}

export default function Reasons() {
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-24">
      <motion.h2
        className="mb-3 text-center font-display text-4xl text-ocean sm:text-6xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Why You&apos;re the Best Sister
      </motion.h2>
      <p className="mb-10 text-center text-hotpink">tap each card to find out 💌</p>
      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3">
        {birthday.reasons.map((r, i) => (
          <FlipCard key={i} i={i} {...r} />
        ))}
      </div>
    </section>
  );
}
