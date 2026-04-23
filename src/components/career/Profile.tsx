import { motion } from "framer-motion";
import { Mascot } from "@/components/Mascot";
import { Button } from "@/components/ui/button";
import { ROADMAP, CareerType, CAREERS } from "@/lib/career-data";

interface Props {
  name: string;
  career: CareerType;
  completed: Set<string>;
  streak: number;
  onClose: () => void;
}

const BADGES = [
  { id: "first", label: "First Step", emoji: "👟", req: 1, color: "bg-lime" },
  { id: "trio", label: "Triple Threat", emoji: "⚡", req: 3, color: "bg-coral text-coral-foreground" },
  { id: "half", label: "Halfway There", emoji: "🌗", req: 4, color: "bg-cobalt text-cobalt-foreground" },
  { id: "boss", label: "Path Crusher", emoji: "🏆", req: 8, color: "bg-ink text-paper" },
];

export const Profile = ({ name, career, completed, streak, onClose }: Props) => {
  const done = completed.size;
  const total = ROADMAP.length;
  const pct = Math.round((done / total) * 100);

  return (
    <div className="min-h-screen bg-paper px-5 py-6 max-w-md mx-auto">
      <div className="flex justify-between items-center mb-6">
        <button onClick={onClose} className="chip">← back</button>
        <p className="text-xs uppercase tracking-wider font-bold text-muted-foreground">profile</p>
      </div>

      <div className="text-center">
        <Mascot mood="happy" size={100} />
        <h1 className="font-display text-4xl mt-3">{name.toLowerCase()}.</h1>
        <p className="font-marker text-2xl text-coral">{CAREERS[career].title} in training</p>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-8">
        <div className="sticker bg-lime p-4 text-center">
          <p className="font-display text-4xl text-ink">{streak}</p>
          <p className="text-xs uppercase font-bold tracking-wider mt-1">day streak 🔥</p>
        </div>
        <div className="sticker bg-cobalt text-cobalt-foreground p-4 text-center">
          <p className="font-display text-4xl">{done}/{total}</p>
          <p className="text-xs uppercase font-bold tracking-wider mt-1">milestones</p>
        </div>
      </div>

      <div className="sticker bg-card p-5 mt-4">
        <div className="flex justify-between items-baseline mb-2">
          <p className="font-display text-lg">overall progress</p>
          <p className="font-display text-2xl text-coral">{pct}%</p>
        </div>
        <div className="h-4 rounded-full border-2 border-ink bg-paper overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "spring", damping: 18 }}
            className="h-full bg-lime"
          />
        </div>
      </div>

      <div className="mt-8">
        <p className="font-marker text-2xl text-cobalt mb-3">your stickers</p>
        <div className="grid grid-cols-2 gap-3">
          {BADGES.map((b, i) => {
            const earned = done >= b.req;
            return (
              <motion.div
                key={b.id}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: i * 0.08 }}
                className={`sticker p-4 text-center ${earned ? b.color : "bg-muted/40 grayscale opacity-50"} ${i % 2 === 0 ? "tilt-l" : "tilt-r"}`}
              >
                <div className="text-4xl">{b.emoji}</div>
                <p className="text-sm font-bold mt-2">{b.label}</p>
                {!earned && <p className="text-[10px] mt-1 opacity-70">{b.req - done} to go</p>}
              </motion.div>
            );
          })}
        </div>
      </div>

      <Button onClick={onClose} className="mt-10 w-full h-14 sticker bg-ink text-paper hover:bg-ink/90">
        back to roadmap
      </Button>
    </div>
  );
};
