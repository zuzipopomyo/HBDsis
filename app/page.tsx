"use client";

import { AnimatePresence, motion } from "motion/react";
import { useCallback, useState } from "react";
import Cake from "@/components/Cake";
import Confetti, { Burst, makeBurst } from "@/components/Confetti";
import FloatingBalloons from "@/components/FloatingBalloons";
import Gallery from "@/components/Gallery";
import GiftIntro from "@/components/GiftIntro";
import Hero from "@/components/Hero";
import Reasons from "@/components/Reasons";
import Wish from "@/components/Wish";
import BalloonGame from "@/components/BalloonGame";
import { birthday } from "@/config";

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [bursts, setBursts] = useState<Burst[]>([]);

  const celebrate = useCallback((x: number, y: number, amount = 90) => {
    const small = typeof window !== "undefined" && window.innerWidth < 640;
    const burst = makeBurst(x, y, small ? Math.round(amount * 0.6) : amount);
    setBursts((b) => [...b, burst]);
    setTimeout(() => setBursts((b) => b.filter((item) => item.id !== burst.id)), 2600);
  }, []);

  const bigCelebration = useCallback(
    (x: number, y: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      celebrate(x, y, 120);
      setTimeout(() => celebrate(w * 0.15, h * 0.35), 250);
      setTimeout(() => celebrate(w * 0.85, h * 0.35), 450);
      setTimeout(() => celebrate(w * 0.5, h * 0.2), 750);
    },
    [celebrate],
  );

  return (
    <main className="relative overflow-x-hidden">
      <FloatingBalloons />
      <Confetti bursts={bursts} />

      <AnimatePresence>
        {!opened && (
          <GiftIntro
            key="gift"
            onOpen={(x, y) => {
              setOpened(true);
              bigCelebration(x, y);
            }}
          />
        )}
      </AnimatePresence>

      {opened && (
        <motion.div className="relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <Hero />
          <Gallery />
          <Reasons />
          <BalloonGame onCelebrate={celebrate} />
          <Wish onCelebrate={celebrate} />
          <Cake onBlow={bigCelebration} />

          <footer className="flex flex-col items-center gap-3 px-4 pt-6 pb-16 text-center">
            <motion.span
              className="text-6xl"
              animate={{ scale: [1, 1.25, 1, 1.25, 1] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 0.6 }}
            >
              💗
            </motion.span>
            <p className="font-display text-3xl text-hotpink sm:text-4xl">Love you forever, {birthday.name}!</p>
            <p className="text-ocean">— your little sis, always cheering for you 🥂</p>
          </footer>
        </motion.div>
      )}
    </main>
  );
}
