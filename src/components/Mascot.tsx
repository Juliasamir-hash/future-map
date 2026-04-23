import { motion } from "framer-motion";
import fiaHappy from "@/assets/fia-happy.png";
import fiaCelebrate from "@/assets/fia-celebrate.png";
import fiaThinking from "@/assets/fia-thinking.png";
import fiaWow from "@/assets/fia-wow.png";
import fiaWave from "@/assets/fia-wave.png";

type Mood = "happy" | "wow" | "thinking" | "celebrate" | "wave";

interface MascotProps {
  mood?: Mood;
  size?: number;
  className?: string;
}

const MOOD_IMAGES: Record<Mood, string> = {
  happy: fiaHappy,
  celebrate: fiaCelebrate,
  thinking: fiaThinking,
  wow: fiaWow,
  wave: fiaWave,
};

export const Mascot = ({ mood = "happy", size = 96, className = "" }: MascotProps) => {
  const src = MOOD_IMAGES[mood];

  const animate =
    mood === "celebrate"
      ? { y: [0, -16, 0], rotate: [-6, 6, -6] }
      : mood === "wave"
      ? { rotate: [-4, 8, -4] }
      : mood === "wow"
      ? { scale: [1, 1.06, 1] }
      : { y: [0, -6, 0] };

  const duration = mood === "celebrate" ? 0.6 : mood === "wow" ? 1.6 : 2.4;

  return (
    <motion.div
      className={`inline-block ${className}`}
      style={{ width: size, height: size }}
      animate={animate}
      transition={{ duration, repeat: Infinity, ease: "easeInOut" }}
    >
      <img
        src={src}
        alt={`Fia the fox — ${mood}`}
        width={size}
        height={size}
        className="w-full h-full object-contain select-none pointer-events-none"
        draggable={false}
      />
    </motion.div>
  );
};
