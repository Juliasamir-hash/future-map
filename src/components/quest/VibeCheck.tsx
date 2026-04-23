import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { VIBE_CARDS } from "@/lib/quest-data";

export const VibeCheck = () => {
  const [idx, setIdx] = useState(0);
  const [yes, setYes] = useState(0);
  const [no, setNo] = useState(0);

  const card = VIBE_CARDS[idx];
  const done = idx >= VIBE_CARDS.length;

  const swipe = (dir: "yes" | "no") => {
    if (dir === "yes") setYes((v) => v + 1);
    else setNo((v) => v + 1);
    setIdx((i) => i + 1);
  };

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 80) swipe("yes");
    else if (info.offset.x < -80) swipe("no");
  };

  return (
    <div className="quest-card-lg bg-quest-sky p-5">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-quest text-xs uppercase tracking-widest opacity-80">mini quest</p>
          <h3 className="font-quest font-black text-xl leading-tight">Vibe Check</h3>
        </div>
        <div className="flex gap-2">
          <span className="chip bg-quest-mint text-xs">✓ {yes}</span>
          <span className="chip bg-quest-pink text-xs">✕ {no}</span>
        </div>
      </div>

      <div className="relative h-[260px]">
        <AnimatePresence>
          {!done && card && (
            <motion.div
              key={card.id}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={onDragEnd}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ x: 400, opacity: 0, rotate: 20 }}
              whileTap={{ cursor: "grabbing" }}
              whileDrag={{ rotate: 6 }}
              className="absolute inset-0 quest-card bg-paper p-6 flex flex-col items-center justify-center text-center cursor-grab"
            >
              <span className="text-7xl mb-3">{card.emoji}</span>
              <p className="font-quest font-black text-2xl">{card.title}</p>
              <p className="font-quest text-sm text-muted-foreground mt-2 px-4">{card.desc}</p>
              <p className="font-marker text-base text-quest-purple mt-4">swipe or tap →</p>
            </motion.div>
          )}
        </AnimatePresence>

        {done && (
          <div className="absolute inset-0 quest-card bg-quest-sun p-6 flex flex-col items-center justify-center text-center">
            <span className="text-6xl">🎉</span>
            <p className="font-quest font-black text-2xl mt-2">Vibe locked in.</p>
            <p className="font-quest text-sm mt-1">{yes} yes · {no} pass</p>
            <button
              onClick={() => { setIdx(0); setYes(0); setNo(0); }}
              className="mt-4 chip bg-paper quest-squish font-quest"
            >
              ↻ run it back
            </button>
          </div>
        )}
      </div>

      {!done && (
        <div className="grid grid-cols-2 gap-3 mt-4">
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => swipe("no")}
            className="h-12 rounded-2xl border-[3px] border-ink bg-quest-pink font-quest font-black quest-squish"
            style={{ boxShadow: "4px 4px 0 0 hsl(var(--ink))" }}
          >
            ✕ Not for me
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => swipe("yes")}
            className="h-12 rounded-2xl border-[3px] border-ink bg-quest-mint font-quest font-black quest-squish"
            style={{ boxShadow: "4px 4px 0 0 hsl(var(--ink))" }}
          >
            ✓ Interested
          </motion.button>
        </div>
      )}
    </div>
  );
};
