// Mock career roadmap data — swap `activeCareer` to see the map update.
export type QuestColor = "quest-purple" | "quest-mint" | "quest-sun" | "quest-pink" | "quest-sky";

export interface QuestSkill {
  name: string;
  emoji: string;
  unlocked: boolean;
}

export interface QuestTask {
  label: string;
  estMinutes: number;
}

export interface QuestNode {
  id: string;
  title: string;
  subtitle: string;
  emoji: string;
  year: 1 | 2 | 3 | 4 | 5;
  xp: number;
  color: QuestColor;
  tasks: QuestTask[];
  skills: string[];
}

export interface CareerQuest {
  career: string;
  startLabel: string;
  endLabel: string;
  endEmoji: string;
  hero: string;
  nodes: QuestNode[];
  skillTree: QuestSkill[];
}

export const QUESTS: Record<string, CareerQuest> = {
  "Product Designer": {
    career: "Product Designer",
    startLabel: "Student",
    endLabel: "Product Designer",
    endEmoji: "🎨",
    hero: "Your Future Self is Calling",
    nodes: [
      { id: "n1", title: "Design Basics", subtitle: "Color, type, grids", emoji: "🎨", year: 1, xp: 120, color: "quest-mint",
        tasks: [{ label: "Finish Figma 101", estMinutes: 90 }, { label: "Recreate 3 app screens", estMinutes: 120 }, { label: "Post a study on socials", estMinutes: 30 }],
        skills: ["Figma", "Type"] },
      { id: "n2", title: "First Case Study", subtitle: "Ship something real", emoji: "📐", year: 1, xp: 180, color: "quest-sun",
        tasks: [{ label: "Pick a tiny problem you have", estMinutes: 30 }, { label: "Design + prototype it", estMinutes: 240 }, { label: "Write the story", estMinutes: 60 }],
        skills: ["Wireframes"] },
      { id: "n3", title: "Find Your Crew", subtitle: "Community + reps", emoji: "💬", year: 2, xp: 90, color: "quest-pink",
        tasks: [{ label: "Join 2 design communities", estMinutes: 20 }, { label: "DM 3 designers you admire", estMinutes: 25 }],
        skills: ["Critique"] },
      { id: "n4", title: "UX Research Course", subtitle: "Talk to humans", emoji: "🔍", year: 2, xp: 220, color: "quest-sky",
        tasks: [{ label: "Run 5 user interviews", estMinutes: 300 }, { label: "Synthesize insights", estMinutes: 90 }],
        skills: ["Research"] },
      { id: "n5", title: "Internship", subtitle: "Get paid to learn", emoji: "💼", year: 3, xp: 350, color: "quest-purple",
        tasks: [{ label: "Polish portfolio site", estMinutes: 240 }, { label: "Apply to 20 places", estMinutes: 180 }, { label: "Mock interviews x3", estMinutes: 120 }],
        skills: ["Portfolio"] },
      { id: "n6", title: "Design System", subtitle: "Think in components", emoji: "🧩", year: 4, xp: 280, color: "quest-mint",
        tasks: [{ label: "Build a token library", estMinutes: 240 }, { label: "Document one pattern", estMinutes: 60 }],
        skills: ["Systems"] },
      { id: "n7", title: "Flagship Project", subtitle: "Your portfolio star", emoji: "🚀", year: 4, xp: 400, color: "quest-sun",
        tasks: [{ label: "Pick something ambitious", estMinutes: 60 }, { label: "Document publicly", estMinutes: 120 }],
        skills: ["Storytelling"] },
      { id: "n8", title: "Land the Role", subtitle: "Go ask for it", emoji: "🏆", year: 5, xp: 500, color: "quest-purple",
        tasks: [{ label: "Tailor your story", estMinutes: 90 }, { label: "Negotiate the offer", estMinutes: 60 }],
        skills: ["Interview"] },
    ],
    skillTree: [
      { name: "Figma", emoji: "🎨", unlocked: true },
      { name: "Type", emoji: "🔤", unlocked: true },
      { name: "Wireframes", emoji: "📐", unlocked: true },
      { name: "Research", emoji: "🔍", unlocked: false },
      { name: "Systems", emoji: "🧩", unlocked: false },
      { name: "Portfolio", emoji: "💼", unlocked: false },
      { name: "Critique", emoji: "💬", unlocked: false },
      { name: "Storytelling", emoji: "📖", unlocked: false },
    ],
  },
};

export const VIBE_CARDS = [
  { id: "v1", emoji: "🏢", title: "Big tech HQ", desc: "Open floors, free snacks, 5,000 coworkers." },
  { id: "v2", emoji: "🛋️", title: "Cozy startup", desc: "8 people, dogs allowed, ship every week." },
  { id: "v3", emoji: "🌍", title: "Fully remote", desc: "Your kitchen, your rules, async everything." },
  { id: "v4", emoji: "🎬", title: "Creative studio", desc: "Mood boards, late nights, ideas on the wall." },
  { id: "v5", emoji: "🔬", title: "Research lab", desc: "Long timelines, deep questions, slow burn." },
  { id: "v6", emoji: "🛠️", title: "Solo founder", desc: "Build it yourself. Wear every hat." },
];

export const PROGRESS_LABELS = {
  level: "Level",
  xpTo: "to next level",
};
