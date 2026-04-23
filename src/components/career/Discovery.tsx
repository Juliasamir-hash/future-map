import { useMemo, useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/button";
import { PROGRESS_LABELS, CareerType } from "@/lib/career-data";
import { Check, X } from "lucide-react";

interface Props {
  name: string;
  onDone: (scores: Record<CareerType, number>) => void;
}

type Step =
  | { kind: "swipe"; prompt: string; emoji: string; map: Partial<Record<CareerType, number>>; bg: "lime" | "coral" | "cobalt" }
  | { kind: "chat"; question: string; chips: { label: string; map: Partial<Record<CareerType, number>> }[] }
  | { kind: "scenario"; setup: string; choices: { label: string; emoji: string; map: Partial<Record<CareerType, number>> }[] };

const STEPS: Step[] = [
  { kind: "swipe", prompt: "spend a saturday building something from scratch", emoji: "🔧", bg: "lime",
    map: { Builder: 2, Explorer: 1 } },
  { kind: "chat", question: "what hits harder for you?",
    chips: [
      { label: "a great story 🎬", map: { Storyteller: 2 } },
      { label: "an elegant system ⚙️", map: { Builder: 2 } },
      { label: "the perfect group chat 💬", map: { Connector: 2 } },
      { label: "a wild new idea 🧪", map: { Explorer: 2 } },
    ] },
  { kind: "scenario", setup: "it's 10am on a friday. you'd rather…",
    choices: [
      { label: "deep work, headphones on", emoji: "🎧", map: { Builder: 2, Explorer: 1 } },
      { label: "brainstorm with the team", emoji: "🧠", map: { Connector: 2, Storyteller: 1 } },
      { label: "shoot a video / write a piece", emoji: "🎥", map: { Storyteller: 2 } },
    ] },
  { kind: "swipe", prompt: "give a 10-min talk to a room of strangers", emoji: "🎤", bg: "coral",
    map: { Storyteller: 2, Connector: 2 } },
  { kind: "chat", question: "honestly — what do friends ask you for?",
    chips: [
      { label: "advice / a pep talk", map: { Connector: 2 } },
      { label: "help fixing something", map: { Builder: 2 } },
      { label: "a hot take", map: { Storyteller: 2 } },
      { label: "a weird recommendation", map: { Explorer: 2 } },
    ] },
  { kind: "scenario", setup: "you have a free afternoon. you…",
    choices: [
      { label: "go down a research rabbit hole", emoji: "🐰", map: { Explorer: 2 } },
      { label: "make something with your hands", emoji: "🛠️", map: { Builder: 2 } },
      { label: "call someone you miss", emoji: "📞", map: { Connector: 2 } },
    ] },
  { kind: "swipe", prompt: "lead a project where the plan changes weekly", emoji: "🌊", bg: "cobalt",
    map: { Connector: 2, Explorer: 1 } },
];

export const Discovery = ({ name, onDone }: Props) => {
  const [i, setI] = useState(0);
  const [scores, setScores] = useState<Record<CareerType, number>>({
    Builder: 0, Storyteller: 0, Connector: 0, Explorer: 0,
  });
  const step = STEPS[i];
  const progress = (i / STEPS.length) * 100;
  const label = useMemo(() => {
    const idx = Math.min(Math.floor((i / STEPS.length) * PROGRESS_LABELS.length), PROGRESS_LABELS.length - 1);
    return PROGRESS_LABELS[idx];
  }, [i]);

  const apply = (map: Partial<Record<CareerType, number>>) => {
    const next = { ...scores };
    (Object.keys(map) as CareerType[]).forEach((k) => { next[k] = (next[k] || 0) + (map[k] || 0); });
    setScores(next);
    if (i + 1 >= STEPS.length) onDone(next);
    else setI(i + 1);
  };

  return (
    <div className="min-h-screen bg-paper px-5 py-6 flex flex-col">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-6">
        <Mascot mood="happy" size={44} />
        <div className="flex-1">
          <div className="flex justify-between text-xs font-semibold uppercase tracking-wider mb-1.5">
            <span>{label}</span>
            <span className="text-muted-foreground">{i + 1}/{STEPS.length}</span>
          </div>
          <div className="h-3 rounded-full border-2 border-ink bg-card overflow-hidden">
            <motion.div
              className="h-full bg-lime"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", damping: 18 }}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <AnimatePresence mode="wait">
          {step.kind === "swipe" && <SwipeCard key={i} step={step} onAnswer={(yes) => apply(yes ? step.map : {})} />}
          {step.kind === "chat" && <ChatStep key={i} name={name} step={step} onAnswer={apply} />}
          {step.kind === "scenario" && <ScenarioStep key={i} step={step} onAnswer={apply} />}
        </AnimatePresence>
      </div>
    </div>
  );
};

const SwipeCard = ({ step, onAnswer }: { step: Extract<Step, { kind: "swipe" }>; onAnswer: (yes: boolean) => void }) => {
  const [exitDir, setExitDir] = useState(0);
  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 100) { setExitDir(1); setTimeout(() => onAnswer(true), 150); }
    else if (info.offset.x < -100) { setExitDir(-1); setTimeout(() => onAnswer(false), 150); }
  };
  const bgClass = { lime: "bg-lime", coral: "bg-coral", cobalt: "bg-cobalt" }[step.bg];

  return (
    <motion.div
      className="w-full max-w-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ x: exitDir * 400, opacity: 0, rotate: exitDir * 20 }}
    >
      <p className="text-center text-sm font-semibold uppercase tracking-wider mb-3 text-muted-foreground">
        could you see yourself…
      </p>
      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={handleDragEnd}
        whileTap={{ scale: 0.98 }}
        className={`sticker-lg ${bgClass} aspect-[3/4] flex flex-col items-center justify-center p-8 cursor-grab active:cursor-grabbing select-none`}
      >
        <div className="text-7xl mb-4">{step.emoji}</div>
        <p className="font-display text-3xl text-center text-ink leading-tight">{step.prompt}</p>
      </motion.div>
      <div className="flex justify-center gap-6 mt-8">
        <button
          onClick={() => onAnswer(false)}
          className="sticker bg-card w-16 h-16 flex items-center justify-center hover:bg-secondary transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sticker-sm"
          aria-label="nope"
        >
          <X className="w-7 h-7" />
        </button>
        <button
          onClick={() => onAnswer(true)}
          className="sticker bg-lime w-16 h-16 flex items-center justify-center hover:bg-lime/90 transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sticker-sm"
          aria-label="yep"
        >
          <Check className="w-7 h-7" />
        </button>
      </div>
      <p className="text-center text-xs text-muted-foreground mt-4">swipe or tap</p>
    </motion.div>
  );
};

const ChatStep = ({ name, step, onAnswer }: {
  name: string;
  step: Extract<Step, { kind: "chat" }>;
  onAnswer: (m: Partial<Record<CareerType, number>>) => void;
}) => (
  <motion.div
    className="w-full max-w-md"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <div className="flex items-end gap-2 mb-3">
      <Mascot mood="happy" size={56} />
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: "spring" }}
        className="sticker bg-card px-5 py-4 max-w-[80%]"
      >
        <p className="text-lg leading-snug">{step.question}</p>
      </motion.div>
    </div>
    <div className="flex flex-wrap gap-2 justify-end mt-6">
      {step.chips.map((c, idx) => (
        <motion.button
          key={c.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + idx * 0.08 }}
          onClick={() => onAnswer(c.map)}
          className="chip text-base px-4 py-3 hover:bg-cobalt hover:text-cobalt-foreground transition-colors"
        >
          {c.label}
        </motion.button>
      ))}
    </div>
    <p className="text-xs text-muted-foreground text-right mt-3">{name.toLowerCase()}, pick one</p>
  </motion.div>
);

const ScenarioStep = ({ step, onAnswer }: {
  step: Extract<Step, { kind: "scenario" }>;
  onAnswer: (m: Partial<Record<CareerType, number>>) => void;
}) => (
  <motion.div
    className="w-full max-w-md"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
  >
    <p className="font-marker text-2xl text-coral mb-1">scenario.</p>
    <h2 className="font-display text-3xl mb-6 leading-tight">{step.setup}</h2>
    <div className="grid gap-3">
      {step.choices.map((c, idx) => (
        <motion.button
          key={c.label}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 + idx * 0.1 }}
          onClick={() => onAnswer(c.map)}
          className={`sticker p-5 flex items-center gap-4 text-left transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-sticker-sm ${
            idx === 0 ? "bg-lime" : idx === 1 ? "bg-coral text-coral-foreground" : "bg-cobalt text-cobalt-foreground"
          }`}
        >
          <span className="text-3xl">{c.emoji}</span>
          <span className="font-semibold text-lg">{c.label}</span>
        </motion.button>
      ))}
    </div>
  </motion.div>
);
