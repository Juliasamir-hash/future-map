import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/button";
import { CAREERS, CareerType } from "@/lib/career-data";

interface Props {
  scores: Record<CareerType, number>;
  onContinue: () => void;
}

export const Reveal = ({ scores, onContinue }: Props) => {
  const ranked = useMemo(
    () => (Object.keys(scores) as CareerType[]).sort((a, b) => scores[b] - scores[a]),
    [scores],
  );
  const top = ranked[0];
  const career = CAREERS[top];

  useEffect(() => {
    const end = Date.now() + 1200;
    const colors = ["#cdf551", "#ff5a4a", "#3b5cf0", "#1a1a1a"];
    (function frame() {
      confetti({ particleCount: 4, angle: 60, spread: 70, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 70, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }, []);

  const bgClass = { lime: "bg-lime", coral: "bg-coral", cobalt: "bg-cobalt" }[career.color];

  return (
    <div className={`min-h-screen ${bgClass} flex flex-col items-center justify-center px-6 py-10`}>
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12, delay: 0.2 }}
      >
        <Mascot mood="celebrate" size={140} />
      </motion.div>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="font-marker text-3xl text-ink mt-2"
      >
        ok we got it.
      </motion.p>

      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, type: "spring" }}
        className="text-center mt-2"
      >
        <h1 className="font-display text-6xl md:text-8xl text-ink leading-[0.9]">
          you're a
        </h1>
        <h1 className="font-display text-6xl md:text-8xl text-ink leading-[0.9] mt-2">
          <span className="bg-ink text-paper px-3 inline-block tilt-l">{career.title}.</span>
        </h1>
        <p className="font-marker text-3xl text-ink mt-6">{career.tag}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
        className="sticker bg-paper p-6 mt-10 max-w-sm w-full"
      >
        <p className="text-base">{career.description}</p>
        <p className="text-sm text-muted-foreground mt-3">e.g. {career.example}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
        className="mt-8 w-full max-w-sm"
      >
        <p className="text-xs uppercase tracking-wider text-ink/70 font-bold mb-2">also in your top 3</p>
        <div className="flex gap-2">
          {ranked.slice(1, 3).map((r) => (
            <div key={r} className="chip flex-1 justify-center bg-paper">
              {CAREERS[r].title}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <Button
          onClick={onContinue}
          className="mt-10 h-14 px-10 text-lg sticker bg-ink text-paper hover:bg-ink/90 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sticker-sm"
        >
          show me the path →
        </Button>
      </motion.div>
    </div>
  );
};
