export type CareerType = "Builder" | "Storyteller" | "Connector" | "Explorer";

export const CAREERS: Record<CareerType, {
  title: string;
  tag: string;
  color: "lime" | "coral" | "cobalt";
  description: string;
  example: string;
}> = {
  Builder: {
    title: "Systems Builder",
    tag: "you make things work.",
    color: "lime",
    description: "You see how pieces fit. You'd rather ship than talk about it.",
    example: "Software engineer · Product designer · Architect",
  },
  Storyteller: {
    title: "Storyteller",
    tag: "you make people feel things.",
    color: "coral",
    description: "Words, visuals, video — you turn ideas into something people actually care about.",
    example: "Director · Marketer · Journalist",
  },
  Connector: {
    title: "Connector",
    tag: "you make people move.",
    color: "cobalt",
    description: "You read the room. You bring people together and get things across the line.",
    example: "Founder · PM · Therapist · Teacher",
  },
  Explorer: {
    title: "Explorer",
    tag: "you chase the unknown.",
    color: "lime",
    description: "Curiosity is your engine. You'd rather ask the weird question than fake the answer.",
    example: "Scientist · Researcher · Investigative reporter",
  },
};

export interface Milestone {
  id: string;
  title: string;
  phase: "Foundations" | "Exploration" | "Launch";
  type: "skill" | "project" | "course" | "internship" | "cert";
  why: string;
  what: string[];
  weeks: number;
}

export const ROADMAP: Milestone[] = [
  { id: "m1", title: "Pick your stack", phase: "Foundations", type: "skill",
    why: "Pick one thing and get good. Beats sampling 12 tutorials.", weeks: 4,
    what: ["Choose 1 language or tool", "Build 3 tiny things in it", "Post one online"] },
  { id: "m2", title: "First real project", phase: "Foundations", type: "project",
    why: "Projects > certificates. Always.", weeks: 6,
    what: ["Solve a problem you actually have", "Ship it (even if ugly)", "Write a 1-paragraph case study"] },
  { id: "m3", title: "Find your people", phase: "Exploration", type: "skill",
    why: "Career growth = community + reps.", weeks: 3,
    what: ["Join 2 online communities", "DM 3 people doing the work", "Go to 1 IRL meetup"] },
  { id: "m4", title: "Take a hard course", phase: "Exploration", type: "course",
    why: "One course that stretches you beats five easy ones.", weeks: 8,
    what: ["Pick a course with a final project", "Block 4 hrs/week", "Share what you learned"] },
  { id: "m5", title: "Land an internship", phase: "Exploration", type: "internship",
    why: "The fastest way to learn is to be paid (a little) to learn.", weeks: 12,
    what: ["Build a 1-page portfolio", "Apply to 20 places", "Ask for feedback on rejections"] },
  { id: "m6", title: "Cert that opens doors", phase: "Launch", type: "cert",
    why: "Some doors are still locked by paper. Get the paper.", weeks: 6,
    what: ["Pick the cert recruiters search for", "Study with a friend", "Pass it"] },
  { id: "m7", title: "Ship a flagship project", phase: "Launch", type: "project",
    why: "One impressive thing > a long resume.", weeks: 10,
    what: ["Pick something ambitious", "Document the process publicly", "Make it your portfolio centerpiece"] },
  { id: "m8", title: "Land the role", phase: "Launch", type: "internship",
    why: "You've earned this. Go ask for it.", weeks: 8,
    what: ["Tailor your story", "Run mock interviews", "Negotiate the offer"] },
];

export const PROGRESS_LABELS = ["warming up", "getting spicy", "almost there", "boom."];
