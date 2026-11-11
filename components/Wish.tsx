"use client";

import { motion } from "motion/react";
import { birthday } from "@/config";

export default function Wish({ onCelebrate }: { onCelebrate: (x: number, y: number) => void }) {
  return (
    <section className="relative flex justify-center px-4 py-20 sm:px-6 sm:py-24">
      <motion.div
        className="relative w-full max-w-2xl rounded-3xl border-4 border-white bg-gradient-to-br from-blush/90 to-sky/90 px-6 pt-12 pb-10 text-center shadow-2xl shadow-baby/40 backdrop-blur sm:p-14"
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, type: "spring" }}
      >
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 text-5xl"
          animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          💌
        </motion.div>

        <h2 className="mb-6 font-display text-4xl text-hotpink sm:text-5xl">Dear {birthday.name},</h2>

        <div className="space-y-3 text-center text-base leading-relaxed sm:text-lg">
          {birthday.letter.map((para, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className={i === 0 ? "text-center text-lg font-bold text-ocean sm:text-xl" : ""}
            >
              {para}
            </motion.p>
          ))}
        </div>

        <p className="mt-8 font-display text-xl text-ocean sm:text-2xl">— {birthday.from}</p>

        <motion.button
          onClick={(e) => onCelebrate(e.clientX, e.clientY)}
          className="mt-8 cursor-pointer rounded-full bg-white px-6 py-3 font-bold text-hotpink shadow-md"
          whileHover={{ scale: 1.1, rotate: -3 }}
          whileTap={{ scale: 0.9 }}
        >
          Send a hug 🤗
        </motion.button>
      </motion.div>
    </section>
  );
}
