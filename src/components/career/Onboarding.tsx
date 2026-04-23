import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onDone: (data: { name: string; grade: string; vibe: string }) => void;
}

const grades = ["middle school", "high school", "college", "post-grad"];
const vibes = ["chaos goblin", "quiet genius", "social butterfly", "deep thinker", "make-it-happen"];

export const Onboarding = ({ onDone }: Props) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [vibe, setVibe] = useState("");

  const next = () => setStep((s) => s + 1);
  const finish = () => onDone({ name: name || "you", grade, vibe });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-paper">
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center max-w-md w-full"
          >
            <Mascot mood="wave" size={140} />
            <h1 className="font-display text-5xl md:text-6xl mt-6 leading-[0.95]">
              hey. let's find <br /> <span className="bg-lime px-2 -mx-1 inline-block tilt-l">your thing.</span>
            </h1>
            <p className="text-lg mt-6 text-muted-foreground">
              not a test. a vibe check. takes ~3 minutes.
            </p>
            <Button
              onClick={next}
              className="mt-10 h-14 px-10 text-lg sticker bg-ink text-paper hover:bg-ink/90 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sticker-sm transition-all"
            >
              i'm in →
            </Button>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="name"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="max-w-md w-full"
          >
            <Mascot mood="happy" size={88} />
            <h2 className="font-display text-4xl mt-4">what should i call you?</h2>
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="your name"
              className="mt-6 h-16 text-2xl border-2 border-ink rounded-2xl bg-card placeholder:text-muted-foreground/60"
            />
            <Button
              onClick={next}
              disabled={!name.trim()}
              className="mt-8 h-14 w-full text-lg sticker bg-lime text-ink hover:bg-lime/90 disabled:opacity-50"
            >
              continue →
            </Button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="grade"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="max-w-md w-full"
          >
            <Mascot mood="thinking" size={88} />
            <h2 className="font-display text-4xl mt-4">where you at, {name.toLowerCase()}?</h2>
            <div className="grid gap-3 mt-6">
              {grades.map((g) => (
                <button
                  key={g}
                  onClick={() => { setGrade(g); setTimeout(next, 200); }}
                  className={`sticker p-5 text-left text-lg font-semibold transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sticker-sm ${
                    grade === g ? "bg-lime" : "bg-card"
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="vibe"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            className="max-w-md w-full"
          >
            <Mascot mood="wow" size={88} />
            <h2 className="font-display text-4xl mt-4">pick your vibe.</h2>
            <p className="text-muted-foreground mt-2">there's no wrong answer. (we'll know if you lie tho)</p>
            <div className="flex flex-wrap gap-2 mt-6">
              {vibes.map((v) => (
                <button
                  key={v}
                  onClick={() => setVibe(v)}
                  className={`chip text-base px-4 py-2 transition-all ${
                    vibe === v ? "bg-coral text-coral-foreground" : "hover:bg-secondary"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
            <Button
              onClick={finish}
              disabled={!vibe}
              className="mt-10 h-14 w-full text-lg sticker bg-ink text-paper hover:bg-ink/90 disabled:opacity-50"
            >
              let's go →
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
