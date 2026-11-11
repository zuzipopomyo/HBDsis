"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const candles = [70, 100, 130, 160, 190];

export default function Cake({ onBlow }: { onBlow: (x: number, y: number) => void }) {
  const [blown, setBlown] = useState(false);

  return (
    <section className="relative flex flex-col items-center px-4 py-20 text-center sm:px-6 sm:py-24">
      <motion.h2
        className="mb-2 font-display text-4xl text-ocean sm:text-6xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Make a Wish
      </motion.h2>
      <p className="mb-8 max-w-sm text-hotpink sm:mb-10 sm:max-w-none">close your eyes, make a wish, then blow out the candles 🕯️</p>

      <motion.svg
        className="h-[220px] w-[220px] sm:h-[280px] sm:w-[280px]"
        viewBox="0 0 260 260"
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        {/* plate */}
        <ellipse cx="130" cy="235" rx="120" ry="16" fill="#cfe8ff" />
        {/* bottom tier */}
        <rect x="30" y="160" width="200" height="70" rx="12" fill="#8ec5ff" />
        <path d="M30 172 q 20 18 40 0 t 40 0 t 40 0 t 40 0 t 40 0" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        {/* top tier */}
        <rect x="55" y="105" width="150" height="60" rx="12" fill="#ff8fc1" />
        <path d="M55 117 q 15 14 30 0 t 30 0 t 30 0 t 30 0 t 30 0" fill="none" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        {[60, 100, 140, 180, 210].map((x, i) => (
          <circle key={i} cx={x - 10} cy={200} r="5" fill={i % 2 ? "#ff5ca8" : "#fff"} />
        ))}
        {/* candles */}
        {candles.map((x, i) => (
          <g key={x}>
            <rect x={x - 5} y="70" width="10" height="38" rx="3" fill={i % 2 ? "#4a90e2" : "#ff5ca8"} />
            <line x1={x} y1="70" x2={x} y2="62" stroke="#3b2a4a" strokeWidth="2" />
            <AnimatePresence>
              {!blown && (
                <motion.ellipse
                  cx={x}
                  cy="52"
                  rx="6"
                  ry="11"
                  fill="#ffb347"
                  style={{ transformOrigin: `${x}px 62px` }}
                  animate={{ scaleY: [1, 1.2, 0.9, 1.1, 1], scaleX: [1, 0.9, 1.1, 1] }}
                  exit={{ scale: 0, opacity: 0, transition: { duration: 0.3, delay: i * 0.05 } }}
                  transition={{ duration: 0.6 + i * 0.07, repeat: Infinity }}
                />
              )}
            </AnimatePresence>
            {blown && (
              <motion.circle
                cx={x}
                cy="55"
                r="4"
                fill="#c8c8d0"
                initial={{ opacity: 0.8, y: 0 }}
                animate={{ opacity: 0, y: -40, scale: 3 }}
                transition={{ duration: 1.6, delay: i * 0.05 }}
              />
            )}
          </g>
        ))}
      </motion.svg>

      <AnimatePresence mode="wait">
        {!blown ? (
          <motion.button
            key="blow"
            onClick={(e) => {
              setBlown(true);
              onBlow(e.clientX, e.clientY);
            }}
            className="mt-10 cursor-pointer rounded-full bg-gradient-to-r from-hotpink to-ocean px-8 py-4 text-lg font-bold text-white shadow-lg shadow-rose/40"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            exit={{ opacity: 0, scale: 0.5 }}
          >
            Blow the candles 🌬️
          </motion.button>
        ) : (
          <motion.div key="done" className="mt-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="font-display text-2xl text-hotpink sm:text-3xl">Yay! Your wish is on its way ✨<br />May every bit of it come true 💫</p>
            <button
              onClick={() => setBlown(false)}
              className="mt-4 cursor-pointer text-sm font-semibold text-ocean underline underline-offset-4"
            >
              light them again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
