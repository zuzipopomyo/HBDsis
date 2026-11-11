"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { birthday } from "@/config";


export default function Gallery() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="memories" className="relative px-4 py-20 sm:px-6 sm:py-24">
      <motion.h2
        className="mb-3 text-center font-display text-4xl text-hotpink sm:text-6xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Sweet Memories
      </motion.h2>
      <p className="mb-10 text-center text-ocean sm:mb-14">tap a photo to see it bigger 📸</p>

      <div className="mx-auto grid max-w-xs grid-cols-1 gap-10 sm:max-w-5xl sm:grid-cols-3">
        {birthday.photos.map((p, i) => (
          <motion.button
            key={p.src}
            onClick={() => setOpen(i)}
            className="cursor-pointer rounded-md bg-white p-3 pb-10 text-left sm:pb-12 shadow-xl shadow-rose/30"
            initial={{ opacity: 0, y: 80, scale: 0.8 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.15, type: "spring", stiffness: 120 }}
            whileHover={{ y: -8, scale: 1.04, zIndex: 10 }}
          >
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm bg-blush">
              <Image src={p.src} alt={p.caption} fill sizes="(max-width: 640px) 90vw, 33vw" className="object-cover" />
            </div>
            <p className="mt-3 text-center font-display text-xl text-ocean">{p.caption}</p>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-ink/60 p-4 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
          >
            <motion.div
              className="relative h-[75svh] w-full max-w-xl overflow-hidden rounded-2xl border-8 border-white bg-white shadow-2xl"
              initial={{ scale: 0.6 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <Image src={birthday.photos[open].src} alt={birthday.photos[open].caption} fill className="object-contain" sizes="90vw" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
