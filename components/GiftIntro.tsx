"use client";

import { motion } from "motion/react";
import { birthday } from "@/config";

export default function GiftIntro({ onOpen }: { onOpen: (x: number, y: number) => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-6 px-6 text-center bg-gradient-to-br from-blush via-white to-sky"
      exit={{ opacity: 0, scale: 1.2, filter: "blur(8px)" }}
      transition={{ duration: 0.7 }}
    >
      <motion.p
        className="font-display text-2xl leading-snug text-hotpink sm:text-4xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Psst… {birthday.name}! 🤫<br />
        Your little sis made you a surprise…
      </motion.p>

      <motion.button
        aria-label="Open your gift"
        onClick={(e) => onOpen(e.clientX, e.clientY)}
        className="relative cursor-pointer"
        initial={{ scale: 0 }}
        animate={{ scale: 1, rotate: [0, -6, 6, -6, 6, 0] }}
        transition={{
          scale: { type: "spring", stiffness: 200, damping: 12, delay: 0.4 },
          rotate: { duration: 0.8, repeat: Infinity, repeatDelay: 1.6, delay: 1.2 },
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.9 }}
      >
        <svg className="h-40 w-40 sm:h-48 sm:w-48" viewBox="0 0 120 120">
          <rect x="15" y="50" width="90" height="62" rx="6" fill="#8ec5ff" />
          <rect x="10" y="36" width="100" height="20" rx="5" fill="#4a90e2" />
          <rect x="52" y="36" width="16" height="76" fill="#ff5ca8" />
          <path d="M60 36 C 40 10, 20 25, 60 36 Z" fill="#ff8fc1" />
          <path d="M60 36 C 80 10, 100 25, 60 36 Z" fill="#ff8fc1" />
          <circle cx="60" cy="36" r="6" fill="#ff5ca8" />
        </svg>
      </motion.button>

      <motion.p
        className="text-lg font-semibold text-ocean"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        tap the gift to open 🎁
      </motion.p>
    </motion.div>
  );
}
