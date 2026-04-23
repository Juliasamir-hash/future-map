import { motion } from "framer-motion";
import { QuestSkill } from "@/lib/quest-data";
import fiaSrc from "@/assets/mascot-fia.png";

interface Props {
  name: string;
  level: number;
  xp: number;
  xpToNext: number;
  skills: QuestSkill[];
}

export const CharacterCard = ({ name, level, xp, xpToNext, skills }: Props) => {
  const pct = Math.min(100, Math.round((xp / xpToNext) * 100));

  return (
    <div className="quest-card-lg bg-quest-cream p-5 space-y-5">
      {/* Avatar + level */}
      <div className="flex items-center gap-4">
        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-20 h-20 rounded-full border-[3px] border-ink bg-quest-pink flex items-center justify-center overflow-hidden shrink-0"
          style={{ boxShadow: "4px 4px 0 0 hsl(var(--ink))" }}
        >
          <img src={fiaSrc} alt="Fia mascot" className="w-[115%] h-[115%] object-cover object-top" draggable={false} />
          <span className="absolute -bottom-2 -right-2 w-9 h-9 rounded-full border-2 border-ink bg-quest-sun flex items-center justify-center font-quest font-black text-sm z-10">
            {level}
          </span>
        </motion.div>
        <div className="min-w-0">
          <p className="font-quest text-xs uppercase tracking-widest text-muted-foreground">player</p>
          <h3 className="font-quest font-black text-2xl leading-tight truncate">{name}</h3>
          <p className="font-quest text-sm text-muted-foreground">Level {level} Explorer</p>
        </div>
      </div>

      {/* XP bar */}
      <div>
        <div className="flex items-baseline justify-between mb-2">
          <span className="font-quest font-bold text-sm">XP</span>
          <span className="font-quest text-xs text-muted-foreground">{xp} / {xpToNext}</span>
        </div>
        <div className="h-5 rounded-full border-2 border-ink bg-paper overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full bg-quest-purple relative"
            style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent 0 8px, hsl(0 0% 100% / 0.18) 8px 16px)" }}
          />
        </div>
        <p className="font-quest text-[11px] text-muted-foreground mt-1">{xpToNext - xp} XP to Level {level + 1}</p>
      </div>

      {/* Skill tree */}
      <div>
        <p className="font-quest font-black text-sm uppercase tracking-wider mb-3">Skill Tree</p>
        <div className="grid grid-cols-4 gap-2">
          {skills.map((s) => (
            <motion.div
              key={s.name}
              whileHover={{ scale: 1.12, rotate: -4 }}
              whileTap={{ scale: 0.92 }}
              className={`relative aspect-square rounded-2xl border-2 border-ink flex flex-col items-center justify-center cursor-pointer ${
                s.unlocked ? "bg-quest-mint" : "bg-muted opacity-60"
              } ${s.unlocked ? "quest-glow-mint" : ""}`}
              style={{ boxShadow: "3px 3px 0 0 hsl(var(--ink))" }}
              title={s.name}
            >
              <span className="text-xl">{s.emoji}</span>
              <span className="font-quest font-bold text-[9px] uppercase mt-0.5 text-center leading-tight px-1">
                {s.name}
              </span>
              {!s.unlocked && (
                <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-ink text-paper border-2 border-paper flex items-center justify-center text-[9px]">
                  🔒
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
