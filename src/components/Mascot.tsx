import { motion } from "framer-motion";
import fiaSrc from "@/assets/mascot-fia.png";

type Mood = "happy" | "wow" | "thinking" | "celebrate" | "wave";

interface MascotProps {
  mood?: Mood;
  size?: number;
  className?: string;
}

export const Mascot = ({ mood = "happy", size = 96, className = "" }: MascotProps) => {
  const animate =
    mood === "celebrate"
      ? { y: [0, -16, 0], rotate: [-6, 6, -6] }
      : mood === "wave"
      ? { rotate: [-4, 8, -4] }
      : mood === "wow"
      ? { scale: [1, 1.08, 1] }
      : mood === "thinking"
      ? { rotate: [-2, 2, -2] }
      : { y: [0, -6, 0] };

  const duration = mood === "celebrate" ? 0.6 : mood === "wave" ? 1.2 : 2.4;

  return (
    <motion.div
      className={`inline-block select-none ${className}`}
      style={{ width: size, height: size }}
      animate={animate}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src={fiaSrc}
        alt="Fia the fox mascot"
        width={size}
        height={size}
        draggable={false}
        className="w-full h-full object-contain"
        style={{
          filter:
            "drop-shadow(0 10px 12px hsl(var(--forest) / 0.32)) drop-shadow(0 3px 0 hsl(var(--forest) / 0.18))",
        }}
      />
    </motion.div>
  );
};
