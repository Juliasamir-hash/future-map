import { useState } from "react";
import { motion } from "framer-motion";
import { Mascot } from "@/components/Mascot";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ROADMAP, Milestone, CAREERS, CareerType } from "@/lib/career-data";
import { Lock, Check, Sparkles } from "lucide-react";

interface Props {
  career: CareerType;
  current: number;
  completed: Set<string>;
  onComplete: (id: string) => void;
  onOpenProfile: () => void;
  onOpenChat: () => void;
}

const ICONS: Record<Milestone["type"], string> = {
  skill: "⚡", project: "🚀", course: "📚", internship: "💼", cert: "🏅",
};

export const Roadmap = ({ career, current, completed, onComplete, onOpenProfile, onOpenChat }: Props) => {
  const [openId, setOpenId] = useState<string | null>(null);
  const careerInfo = CAREERS[career];
  const phases = ["Launch", "Exploration", "Foundations"] as const;

  return (
    <div className="min-h-screen bg-paper">
      {/* Top bar */}
      <div className="sticky top-0 z-30 bg-paper/95 backdrop-blur border-b-2 border-ink px-5 py-3 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">your path</p>
          <h2 className="font-display text-xl leading-tight">{careerInfo.title}</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={onOpenChat} className="sticker-sm bg-cobalt text-cobalt-foreground px-3 py-2 text-sm font-semibold">mentor</button>
          <button onClick={onOpenProfile} className="sticker-sm bg-card px-3 py-2 text-sm font-semibold">you</button>
        </div>
      </div>

      <div className="relative max-w-md mx-auto pt-10 pb-32 px-6">
        {/* Dream job at top */}
        <div className="text-center mb-10">
          <p className="font-marker text-2xl text-coral">dream job</p>
          <div className="sticker-lg bg-ink text-paper p-5 mt-2 inline-block">
            <p className="font-display text-2xl">{careerInfo.title}</p>
            <p className="text-xs opacity-80 mt-1">{careerInfo.example.split(" · ")[0]}</p>
          </div>
        </div>

        {/* Path with stops (rendered top→bottom = phase Launch first) */}
        <div className="relative">
          {phases.map((phase) => {
            const stops = ROADMAP.filter((m) => m.phase === phase).reverse();
            return (
              <div key={phase} className="mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-[2px] flex-1 bg-ink" />
                  <span className="chip bg-paper text-xs uppercase tracking-wider">{phase}</span>
                  <div className="h-[2px] flex-1 bg-ink" />
                </div>

                <div className="space-y-8">
                  {stops.map((m) => {
                    const idx = ROADMAP.findIndex((x) => x.id === m.id);
                    const isDone = completed.has(m.id);
                    const isCurrent = idx === current && !isDone;
                    const isLocked = idx > current && !isDone;
                    // alternate left/right zigzag
                    const side = idx % 2 === 0 ? "ml-0 mr-auto" : "ml-auto mr-0";

                    return (
                      <div key={m.id} className={`flex ${idx % 2 === 0 ? "justify-start" : "justify-end"} relative`}>
                        <motion.button
                          onClick={() => !isLocked && setOpenId(m.id)}
                          whileTap={{ scale: 0.95 }}
                          className={`relative w-28 h-28 rounded-full border-[3px] border-ink flex flex-col items-center justify-center transition-all ${
                            isDone ? "bg-lime" : isCurrent ? "bg-coral animate-pulse-glow" : isLocked ? "bg-muted" : "bg-card"
                          } ${!isLocked ? "hover:scale-105 cursor-pointer" : "cursor-not-allowed opacity-70"} shadow-sticker-sm ${side}`}
                        >
                          <span className="text-3xl">{ICONS[m.type]}</span>
                          <span className="text-[10px] font-bold uppercase mt-1 px-2 text-center leading-tight">
                            {m.title}
                          </span>
                          {isDone && (
                            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-ink text-paper border-2 border-paper flex items-center justify-center">
                              <Check className="w-4 h-4" />
                            </span>
                          )}
                          {isLocked && (
                            <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-ink text-paper border-2 border-paper flex items-center justify-center">
                              <Lock className="w-3.5 h-3.5" />
                            </span>
                          )}
                          {isCurrent && (
                            <motion.div
                              animate={{ y: [0, -4, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                              className="absolute -top-12"
                            >
                              <Mascot mood="wow" size={48} />
                            </motion.div>
                          )}
                        </motion.button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* You are here */}
        <div className="text-center mt-6">
          <p className="font-marker text-2xl text-cobalt">you are here</p>
          <div className="sticker bg-lime p-4 mt-2 inline-block">
            <p className="font-display text-xl text-ink">today.</p>
          </div>
        </div>
      </div>

      <Sheet open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent side="bottom" className="border-t-2 border-ink rounded-t-3xl bg-paper max-h-[85vh] overflow-y-auto">
          {openId && (() => {
            const m = ROADMAP.find((x) => x.id === openId)!;
            const isDone = completed.has(m.id);
            return (
              <>
                <SheetHeader className="text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full border-2 border-ink bg-lime flex items-center justify-center text-2xl">
                      {ICONS[m.type]}
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">{m.phase} · {m.weeks} weeks</p>
                      <SheetTitle className="font-display text-2xl leading-tight">{m.title}</SheetTitle>
                    </div>
                  </div>
                </SheetHeader>

                <div className="mt-6">
                  <p className="font-marker text-xl text-coral mb-1">why this matters</p>
                  <p className="text-base">{m.why}</p>
                </div>

                <div className="mt-6">
                  <p className="font-marker text-xl text-cobalt mb-2">what to do</p>
                  <ul className="space-y-2">
                    {m.what.map((w, i) => (
                      <li key={i} className="flex items-start gap-3 sticker-sm bg-card p-3">
                        <span className="w-6 h-6 rounded-full border-2 border-ink bg-lime flex items-center justify-center text-xs font-bold shrink-0">
                          {i + 1}
                        </span>
                        <span className="text-sm">{w}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {!isDone && (
                  <Button
                    onClick={() => { onComplete(m.id); setOpenId(null); }}
                    className="mt-8 w-full h-14 text-lg sticker bg-ink text-paper hover:bg-ink/90"
                  >
                    <Sparkles className="w-5 h-5 mr-2" /> mark done
                  </Button>
                )}
                {isDone && (
                  <div className="mt-8 sticker bg-lime p-4 text-center font-semibold">
                    ✓ done. proud of you.
                  </div>
                )}
              </>
            );
          })()}
        </SheetContent>
      </Sheet>
    </div>
  );
};
