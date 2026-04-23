import { useMemo, useState } from "react";
import { Onboarding } from "@/components/career/Onboarding";
import { Discovery } from "@/components/career/Discovery";
import { Reveal } from "@/components/career/Reveal";
import { Roadmap } from "@/components/career/Roadmap";
import { Profile } from "@/components/career/Profile";
import { MentorChat } from "@/components/career/MentorChat";
import { CareerType, ROADMAP } from "@/lib/career-data";

type Stage = "onboarding" | "discovery" | "reveal" | "roadmap" | "profile" | "chat";

const Index = () => {
  const [stage, setStage] = useState<Stage>("onboarding");
  const [profile, setProfile] = useState({ name: "", grade: "", vibe: "" });
  const [scores, setScores] = useState<Record<CareerType, number>>({
    Builder: 0, Storyteller: 0, Connector: 0, Explorer: 0,
  });
  const [completed, setCompleted] = useState<Set<string>>(new Set());

  const career = useMemo<CareerType>(() => {
    const order = (Object.keys(scores) as CareerType[]).sort((a, b) => scores[b] - scores[a]);
    return order[0] || "Builder";
  }, [scores]);

  const current = useMemo(() => {
    const idx = ROADMAP.findIndex((m) => !completed.has(m.id));
    return idx === -1 ? ROADMAP.length - 1 : idx;
  }, [completed]);

  return (
    <main className="min-h-screen bg-paper text-foreground">
      {stage === "onboarding" && (
        <Onboarding onDone={(d) => { setProfile(d); setStage("discovery"); }} />
      )}
      {stage === "discovery" && (
        <Discovery name={profile.name} onDone={(s) => { setScores(s); setStage("reveal"); }} />
      )}
      {stage === "reveal" && (
        <Reveal scores={scores} onContinue={() => setStage("roadmap")} />
      )}
      {stage === "roadmap" && (
        <Roadmap
          career={career}
          current={current}
          completed={completed}
          onComplete={(id) => setCompleted(new Set([...completed, id]))}
          onOpenProfile={() => setStage("profile")}
          onOpenChat={() => setStage("chat")}
        />
      )}
      {stage === "profile" && (
        <Profile
          name={profile.name}
          career={career}
          completed={completed}
          streak={Math.max(1, completed.size)}
          onClose={() => setStage("roadmap")}
        />
      )}
      {stage === "chat" && (
        <MentorChat name={profile.name} career={career} onClose={() => setStage("roadmap")} />
      )}
    </main>
  );
};

export default Index;
