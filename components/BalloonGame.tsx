"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { birthday } from "@/config";

const GOAL = 10;
const COLORS = ["#ff8fc1", "#8ec5ff", "#ff5ca8", "#4a90e2", "#ffb3d6", "#a9d4ff"];

type Balloon = { id: number; left: number; color: string; duration: number; size: number };
type Pop = { id: number; x: number; y: number; text: string; color: string };

export default function BalloonGame({ onCelebrate }: { onCelebrate: (x: number, y: number) => void }) {
  const [state, setState] = useState<"idle" | "playing" | "won">("idle");
  const [score, setScore] = useState(0);
  const [balloons, setBalloons] = useState<Balloon[]>([]);
  const [pops, setPops] = useState<Pop[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  const nextId = useRef(0);

  // spawn balloons while playing
  useEffect(() => {
    if (state !== "playing") return;
    const spawn = () =>
      setBalloons((b) => [
        ...b,
        {
          id: nextId.current++,
          left: 5 + Math.random() * 80,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          duration: 4.5 + Math.random() * 2.5,
          size: 56 + Math.random() * 22,
        },
      ]);
    spawn();
    const id = setInterval(spawn, 750);
    return () => clearInterval(id);
  }, [state]);

  const start = () => {
    setScore(0);
    setBalloons([]);
    setPops([]);
    setState("playing");
  };

  const pop = useCallback(
    (b: Balloon, e: React.PointerEvent) => {
      const rect = boxRef.current!.getBoundingClientRect();
      const wish = birthday.wishes[score % birthday.wishes.length];
      const p: Pop = {
        id: b.id,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        text: `${wish.emoji} ${wish.title}`,
        color: b.color,
      };
      setBalloons((list) => list.filter((x) => x.id !== b.id));
      setPops((list) => [...list, p]);
      setTimeout(() => setPops((list) => list.filter((x) => x.id !== p.id)), 1400);

      const next = score + 1;
      setScore(next);
      if (next >= GOAL) {
        setState("won");
        setBalloons([]);
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        onCelebrate(cx, cy);
        setTimeout(() => onCelebrate(rect.left + rect.width * 0.2, cy), 250);
        setTimeout(() => onCelebrate(rect.left + rect.width * 0.8, cy), 500);
      }
    },
    [score, onCelebrate],
  );

  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-24">
      <motion.h2
        className="mb-3 text-center font-display text-4xl text-hotpink sm:text-6xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        Pop the Balloons!
      </motion.h2>
      <p className="mx-auto mb-8 max-w-md text-center text-ocean">
        Pop {GOAL} balloons to unlock your birthday surprise 🎈 every balloon hides a wish!
      </p>

      {/* progress hearts */}
      <div className="mb-4 flex flex-wrap justify-center gap-1 text-xl sm:text-2xl">
        {Array.from({ length: GOAL }, (_, i) => (
          <motion.span
            key={i}
            animate={i < score ? { scale: [1, 1.5, 1] } : {}}
            className={i < score ? "" : "opacity-25 grayscale"}
          >
            {i % 2 ? "💙" : "💗"}
          </motion.span>
        ))}
      </div>

      <div
        ref={boxRef}
        className="relative mx-auto h-[440px] max-w-2xl touch-manipulation overflow-hidden rounded-3xl border-4 border-white bg-gradient-to-b from-sky/80 via-white/70 to-blush/80 shadow-2xl shadow-baby/40 select-none sm:h-[480px]"
      >
        {/* clouds */}
        <motion.div className="absolute top-8 left-6 text-5xl opacity-70" animate={{ x: [0, 20, 0] }} transition={{ duration: 6, repeat: Infinity }}>☁️</motion.div>
        <motion.div className="absolute top-24 right-8 text-4xl opacity-60" animate={{ x: [0, -20, 0] }} transition={{ duration: 7, repeat: Infinity }}>☁️</motion.div>

        {/* balloons */}
        {balloons.map((b) => (
          <motion.button
            key={b.id}
            aria-label="Pop balloon"
            className="absolute cursor-pointer"
            style={{ left: `${b.left}%`, bottom: -110 }}
            initial={{ y: 0 }}
            animate={{ y: -620, x: [0, 14, -14, 0] }}
            transition={{ duration: b.duration, ease: "linear", x: { duration: 2, repeat: Infinity } }}
            onAnimationComplete={() => setBalloons((list) => list.filter((x) => x.id !== b.id))}
            onPointerDown={(e) => pop(b, e)}
            whileHover={{ scale: 1.08 }}
          >
            <svg width={b.size} height={b.size * 1.5} viewBox="0 0 50 75">
              <ellipse cx="25" cy="25" rx="21" ry="24" fill={b.color} />
              <ellipse cx="17" cy="15" rx="5" ry="8" fill="white" opacity="0.5" />
              <polygon points="22,48 28,48 25,53" fill={b.color} />
              <path d="M25 53 Q 20 62 25 68 T 25 75" stroke="#b9a3c4" strokeWidth="1.2" fill="none" />
            </svg>
          </motion.button>
        ))}

        {/* pop effects */}
        <AnimatePresence>
          {pops.map((p) => (
            <motion.div key={p.id} className="pointer-events-none absolute" style={{ left: p.x, top: p.y }}>
              {Array.from({ length: 8 }, (_, i) => {
                const a = (i / 8) * Math.PI * 2;
                return (
                  <motion.span
                    key={i}
                    className="absolute block h-2 w-2 rounded-full"
                    style={{ background: p.color }}
                    initial={{ x: 0, y: 0, opacity: 1 }}
                    animate={{ x: Math.cos(a) * 40, y: Math.sin(a) * 40, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                  />
                );
              })}
              <motion.span
                className="absolute -translate-x-1/2 rounded-full bg-white/90 px-3 py-1 text-sm font-bold whitespace-nowrap text-hotpink shadow-md sm:text-base"
                initial={{ y: 0, opacity: 0, scale: 0.5 }}
                animate={{ y: -60, opacity: [0, 1, 1, 0], scale: 1 }}
                transition={{ duration: 1.3 }}
              >
                {p.text}
              </motion.span>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* overlays */}
        <AnimatePresence>
          {state !== "playing" && (
            <motion.div
              className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-white/40 p-6 text-center backdrop-blur-[2px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {state === "idle" ? (
                <>
                  <motion.span className="text-7xl" animate={{ y: [0, -12, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
                    🎈
                  </motion.span>
                  <p className="font-display text-2xl text-ocean sm:text-3xl">Ready, birthday girl?</p>
                </>
              ) : (
                <>
                  <motion.span
                    className="text-7xl"
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                  >
                    🏆
                  </motion.span>
                  <p className="font-display text-3xl text-hotpink sm:text-4xl">You did it, {birthday.name}!</p>
                  <p className="max-w-sm font-semibold text-ink/80">
                    Prize unlocked: one giant hug from your little sis + all {GOAL} wishes coming true this year 💖
                  </p>
                </>
              )}
              <motion.button
                onClick={start}
                className="mt-2 cursor-pointer rounded-full bg-gradient-to-r from-hotpink to-ocean px-7 py-3 font-bold text-white shadow-lg"
                whileHover={{ scale: 1.07 }}
                whileTap={{ scale: 0.92 }}
              >
                {state === "idle" ? "Start game 🎮" : "Play again 🔁"}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {state === "playing" && (
          <div className="absolute top-3 right-3 rounded-full bg-white/80 px-3 py-1 text-sm font-bold text-ocean shadow">
            {score} / {GOAL}
          </div>
        )}
      </div>
    </section>
  );
}
