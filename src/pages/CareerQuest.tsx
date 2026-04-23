import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { QuestMap } from "@/components/quest/QuestMap";
import { CharacterCard } from "@/components/quest/CharacterCard";
import { VibeCheck } from "@/components/quest/VibeCheck";
import { MilestonePanel } from "@/components/quest/MilestonePanel";
import { TimeMachine } from "@/components/quest/TimeMachine";
import { QUESTS } from "@/lib/quest-data";

const CareerQuest = () => {
  const [careerKey, setCareerKey] = useState<keyof typeof QUESTS>("Product Designer");
  const quest = QUESTS[careerKey];
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [year, setYear] = useState(3);

  const totalXp = useMemo(
    () => quest.nodes.filter((n) => completed.has(n.id)).reduce((s, n) => s + n.xp, 0),
    [completed, quest.nodes]
  );
  const level = Math.floor(totalXp / 300) + 1;
  const xpThis = totalXp % 300;
  const xpToNext = 300;

  const activeNode = activeId ? quest.nodes.find((n) => n.id === activeId) ?? null : null;

  const careerOptions = Object.keys(QUESTS) as (keyof typeof QUESTS)[];

  return (
    <main className="min-h-screen bg-quest-cream font-quest text-foreground">
      {/* Sticky header */}
      <header className="sticky top-0 z-30 border-b-[3px] border-ink bg-paper/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl border-2 border-ink bg-quest-purple text-quest-purple-foreground flex items-center justify-center font-black text-lg shrink-0"
              style={{ boxShadow: "3px 3px 0 0 hsl(var(--ink))" }}
            >
              ✦
            </div>
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Career Quest</p>
              <h1 className="font-black text-lg leading-tight truncate">{quest.hero}</h1>
            </div>
          </div>
          <select
            value={careerKey}
            onChange={(e) => { setCareerKey(e.target.value as keyof typeof QUESTS); setCompleted(new Set()); }}
            className="chip bg-quest-mint text-xs font-bold cursor-pointer"
          >
            {careerOptions.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-[340px_1fr] gap-5">
        {/* Left column */}
        <aside className="space-y-5 lg:sticky lg:top-[88px] lg:self-start">
          <CharacterCard
            name="You"
            level={level}
            xp={xpThis}
            xpToNext={xpToNext}
            skills={quest.skillTree}
          />
          <VibeCheck />
        </aside>

        {/* Right column: Map + Time Machine */}
        <section className="space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="quest-card-lg bg-paper p-4 sm:p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-muted-foreground">The Quest Map</p>
                <h2 className="font-black text-2xl leading-tight">{quest.career} Path</h2>
              </div>
              <div className="chip bg-quest-sun text-xs">
                {completed.size}/{quest.nodes.length} complete
              </div>
            </div>
            <QuestMap
              nodes={quest.nodes}
              completed={completed}
              activeId={activeId}
              yearScale={year}
              onSelect={setActiveId}
              startLabel={quest.startLabel}
              endLabel={quest.endLabel}
              endEmoji={quest.endEmoji}
            />
          </motion.div>

          <TimeMachine year={year} onChange={setYear} />
        </section>
      </div>

      <MilestonePanel
        node={activeNode}
        isDone={activeNode ? completed.has(activeNode.id) : false}
        onClose={() => setActiveId(null)}
        onComplete={(id) => setCompleted((s) => new Set([...s, id]))}
      />
    </main>
  );
};

export default CareerQuest;
