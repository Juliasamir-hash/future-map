import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { QuestNode } from "@/lib/quest-data";
import { X, Sparkles, Clock } from "lucide-react";

interface Props {
  node: QuestNode | null;
  isDone: boolean;
  onClose: () => void;
  onComplete: (id: string) => void;
}

export const MilestonePanel = ({ node, isDone, onClose, onComplete }: Props) => {
  const fire = () => {
    confetti({
      particleCount: 140,
      spread: 90,
      origin: { y: 0.6 },
      colors: ["#a855f7", "#6ee7b7", "#fde047", "#f9a8d4", "#7dd3fc"],
    });
  };

  return (
    <AnimatePresence>
      {node && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/40 z-40"
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 280, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-paper border-l-[3px] border-ink z-50 overflow-y-auto"
          >
            <div className={`bg-${node.color} border-b-[3px] border-ink p-6 relative`}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-10 h-10 rounded-full border-2 border-ink bg-paper flex items-center justify-center quest-squish"
                style={{ boxShadow: "3px 3px 0 0 hsl(var(--ink))" }}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-20 rounded-2xl border-[3px] border-ink bg-paper flex items-center justify-center text-5xl"
                  style={{ boxShadow: "4px 4px 0 0 hsl(var(--ink))" }}
                >
                  {node.emoji}
                </div>
                <div>
                  <p className="font-quest text-xs uppercase tracking-widest opacity-80">
                    Year {node.year} · +{node.xp} XP
                  </p>
                  <h2 className="font-quest font-black text-3xl leading-tight">{node.title}</h2>
                  <p className="font-quest text-sm">{node.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <p className="font-quest font-black text-sm uppercase tracking-wider mb-3">
                  ⚡ Tasks
                </p>
                <ul className="space-y-2">
                  {node.tasks.map((t, i) => (
                    <li
                      key={i}
                      className="quest-card bg-quest-cream p-3 flex items-center gap-3"
                    >
                      <span className="w-8 h-8 rounded-full border-2 border-ink bg-quest-mint flex items-center justify-center font-quest font-black text-sm shrink-0">
                        {i + 1}
                      </span>
                      <span className="font-quest text-sm flex-1">{t.label}</span>
                      <span className="chip text-xs bg-paper shrink-0">
                        <Clock className="w-3 h-3" /> {t.estMinutes}m
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {node.skills.length > 0 && (
                <div>
                  <p className="font-quest font-black text-sm uppercase tracking-wider mb-2">
                    🧩 Unlocks
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {node.skills.map((s) => (
                      <span key={s} className="chip bg-quest-sun font-quest">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {!isDone ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { fire(); onComplete(node.id); setTimeout(onClose, 600); }}
                  className="w-full h-14 rounded-2xl border-[3px] border-ink bg-quest-purple text-quest-purple-foreground font-quest font-black text-lg flex items-center justify-center gap-2 quest-squish"
                  style={{ boxShadow: "5px 5px 0 0 hsl(var(--ink))" }}
                >
                  <Sparkles className="w-5 h-5" /> Level Up
                </motion.button>
              ) : (
                <div className="quest-card bg-quest-mint p-4 text-center font-quest font-black">
                  ✓ Quest complete. +{node.xp} XP banked.
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
