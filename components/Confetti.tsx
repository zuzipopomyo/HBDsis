"use client";

import { AnimatePresence, motion } from "motion/react";

const COLORS = ["#ff5ca8", "#ff8fc1", "#ffd6e8", "#4a90e2", "#8ec5ff", "#cfe8ff", "#ffffff"];

export type Burst = { id: number; x: number; y: number; pieces: Piece[] };
type Piece = { dx: number; dy: number; rot: number; color: string; w: number; h: number; round: boolean };

export function makeBurst(x: number, y: number, amount = 80): Burst {
  return {
    id: Date.now() + Math.random(),
    x,
    y,
    pieces: Array.from({ length: amount }, () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = 120 + Math.random() * 320;
      return {
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed - 150,
        rot: Math.random() * 720 - 360,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        w: 6 + Math.random() * 6,
        h: 8 + Math.random() * 10,
        round: Math.random() > 0.6,
      };
    }),
  };
}

export default function Confetti({ bursts }: { bursts: Burst[] }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {bursts.map((b) => (
          <div key={b.id} className="absolute" style={{ left: b.x, top: b.y }}>
            {b.pieces.map((p, i) => (
              <motion.span
                key={i}
                className="absolute block"
                style={{
                  width: p.w,
                  height: p.round ? p.w : p.h,
                  background: p.color,
                  borderRadius: p.round ? "9999px" : "2px",
                  boxShadow: "0 0 2px rgba(0,0,0,0.08)",
                }}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{ x: p.dx, y: [0, p.dy, p.dy + 500], rotate: p.rot, opacity: [1, 1, 0] }}
                transition={{ duration: 2.4, ease: "easeOut", times: [0, 0.35, 1] }}
              />
            ))}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
