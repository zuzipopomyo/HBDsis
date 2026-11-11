"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const COLORS = ["#ff8fc1", "#8ec5ff", "#ffb3d6", "#a9d4ff", "#ff5ca8", "#4a90e2"];

type Balloon = { id: number; left: number; size: number; delay: number; duration: number; color: string; sway: number };

export default function FloatingBalloons({ count = 14 }: { count?: number }) {
  const [balloons, setBalloons] = useState<Balloon[]>([]);

  // generated on the client to avoid hydration mismatches
  useEffect(() => {
    setBalloons(
      Array.from({ length: window.innerWidth < 640 ? Math.ceil(count / 2) : count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: (window.innerWidth < 640 ? 30 : 40) + Math.random() * 40,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 10,
        color: COLORS[i % COLORS.length],
        sway: 20 + Math.random() * 40,
      })),
    );
  }, [count]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          className="absolute bottom-0"
          style={{ left: `${b.left}%` }}
          initial={{ y: "110vh", x: 0, opacity: 0 }}
          animate={{ y: "-130vh", x: [0, b.sway, -b.sway, 0], opacity: [0, 0.85, 0.85, 0] }}
          transition={{ duration: b.duration, delay: b.delay, repeat: Infinity, ease: "linear" }}
        >
          <svg width={b.size} height={b.size * 1.6} viewBox="0 0 50 80">
            <ellipse cx="25" cy="25" rx="20" ry="24" fill={b.color} />
            <ellipse cx="18" cy="16" rx="5" ry="8" fill="white" opacity="0.45" />
            <polygon points="22,48 28,48 25,53" fill={b.color} />
            <path d="M25 53 Q 20 63 25 70 T 25 80" stroke="#c9a7c7" strokeWidth="1" fill="none" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
