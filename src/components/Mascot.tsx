import { motion } from "framer-motion";

type Mood = "happy" | "wow" | "thinking" | "celebrate" | "wave";

interface MascotProps {
  mood?: Mood;
  size?: number;
  className?: string;
}

export const Mascot = ({ mood = "happy", size = 96, className = "" }: MascotProps) => {
  const eyeShape = mood === "wow" ? "circle" : mood === "thinking" ? "line" : "dot";
  const mouth = {
    happy: "M 35 62 Q 50 74 65 62",
    wow: "M 50 64 m -7 0 a 7 7 0 1 0 14 0 a 7 7 0 1 0 -14 0",
    thinking: "M 38 66 L 58 64",
    celebrate: "M 32 58 Q 50 80 68 58 Q 50 70 32 58 Z",
    wave: "M 36 64 Q 50 72 64 64",
  }[mood];

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={
        mood === "celebrate"
          ? { y: [0, -16, 0], rotate: [-6, 6, -6] }
          : mood === "wave"
          ? { rotate: [-4, 8, -4] }
          : { y: [0, -6, 0] }
      }
      transition={{ duration: mood === "celebrate" ? 0.6 : 2.4, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg viewBox="0 0 100 100" width={size} height={size}>
        {/* shadow */}
        <ellipse cx="50" cy="92" rx="26" ry="3" fill="hsl(var(--ink) / 0.18)" />
        {/* body — blob */}
        <path
          d="M 50 8 C 78 8 90 30 88 54 C 86 76 70 88 50 88 C 30 88 14 76 12 54 C 10 30 22 8 50 8 Z"
          fill="hsl(var(--lime))"
          stroke="hsl(var(--ink))"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        {/* cheek */}
        <circle cx="28" cy="58" r="4" fill="hsl(var(--coral) / 0.7)" />
        <circle cx="72" cy="58" r="4" fill="hsl(var(--coral) / 0.7)" />
        {/* eyes */}
        {eyeShape === "circle" ? (
          <>
            <circle cx="38" cy="46" r="6" fill="hsl(var(--ink))" />
            <circle cx="62" cy="46" r="6" fill="hsl(var(--ink))" />
            <circle cx="40" cy="44" r="2" fill="hsl(var(--paper))" />
            <circle cx="64" cy="44" r="2" fill="hsl(var(--paper))" />
          </>
        ) : eyeShape === "line" ? (
          <>
            <path d="M 32 46 L 44 46" stroke="hsl(var(--ink))" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 56 46 L 68 46" stroke="hsl(var(--ink))" strokeWidth="3.5" strokeLinecap="round" />
          </>
        ) : (
          <>
            <circle cx="38" cy="46" r="4" fill="hsl(var(--ink))" />
            <circle cx="62" cy="46" r="4" fill="hsl(var(--ink))" />
          </>
        )}
        {/* mouth */}
        <path
          d={mouth}
          fill={mood === "celebrate" ? "hsl(var(--coral))" : "none"}
          stroke="hsl(var(--ink))"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </motion.div>
  );
};
