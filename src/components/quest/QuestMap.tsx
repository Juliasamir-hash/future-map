import { motion } from "framer-motion";
import { QuestNode } from "@/lib/quest-data";

interface Props {
  nodes: QuestNode[];
  completed: Set<string>;
  activeId: string | null;
  yearScale: number; // 1..5
  onSelect: (id: string) => void;
  startLabel: string;
  endLabel: string;
  endEmoji: string;
}

// Compute a winding zig-zag path through node coordinates.
const nodePos = (i: number, total: number, width: number, height: number) => {
  const padY = 80;
  const usableH = height - padY * 2;
  const y = padY + (usableH * i) / Math.max(total - 1, 1);
  // sinusoidal x
  const amp = width * 0.32;
  const cx = width / 2;
  const x = cx + Math.sin((i / Math.max(total - 1, 1)) * Math.PI * 2.2) * amp;
  return { x, y };
};

export const QuestMap = ({ nodes, completed, activeId, yearScale, onSelect, startLabel, endLabel, endEmoji }: Props) => {
  const visible = nodes.filter((n) => n.year <= yearScale);
  const W = 380;
  const baseH = 140;
  const H = baseH * Math.max(visible.length, 2);

  const points = visible.map((_, i) => nodePos(i, visible.length, W, H));

  // Smooth path through points using quadratic curves
  const pathD = points.length
    ? points.reduce((acc, p, i) => {
        if (i === 0) return `M ${p.x} ${p.y}`;
        const prev = points[i - 1];
        const mx = (prev.x + p.x) / 2;
        const my = (prev.y + p.y) / 2;
        return `${acc} Q ${prev.x} ${prev.y}, ${mx} ${my} T ${p.x} ${p.y}`;
      }, "")
    : "";

  return (
    <div className="relative w-full" style={{ minHeight: H + 160 }}>
      {/* Dream job destination */}
      <div className="flex justify-center mb-4">
        <div className="quest-card bg-quest-purple text-quest-purple-foreground px-5 py-3 -rotate-2">
          <p className="font-quest text-xs uppercase tracking-widest opacity-80">destination</p>
          <p className="font-quest font-black text-xl flex items-center gap-2">
            <span className="text-2xl">{endEmoji}</span> {endLabel}
          </p>
        </div>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} className="block">
        {/* Dashed path shadow */}
        <path
          d={pathD}
          stroke="hsl(var(--ink))"
          strokeWidth={10}
          fill="none"
          strokeLinecap="round"
          opacity={0.1}
          transform="translate(4, 4)"
        />
        {/* Main path */}
        <motion.path
          d={pathD}
          stroke="hsl(var(--ink))"
          strokeWidth={6}
          fill="none"
          strokeLinecap="round"
          strokeDasharray="2 14"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </svg>

      {/* Nodes positioned absolutely over the SVG */}
      <div className="absolute inset-x-0 top-[88px]" style={{ height: H }}>
        {visible.map((n, i) => {
          const p = points[i];
          const isDone = completed.has(n.id);
          const isActive = activeId === n.id;
          const xPct = (p.x / W) * 100;
          const yPx = p.y;
          return (
            <motion.button
              key={n.id}
              onClick={() => onSelect(n.id)}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 + i * 0.06, type: "spring", stiffness: 260, damping: 18 }}
              whileHover={{ scale: 1.08, rotate: -3 }}
              whileTap={{ scale: 0.92 }}
              className={`absolute -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-3xl border-[3px] border-ink flex flex-col items-center justify-center bg-${n.color} ${isDone ? "opacity-90" : ""} ${isActive ? "quest-glow-purple z-10" : ""}`}
              style={{ left: `${xPct}%`, top: yPx, boxShadow: "5px 5px 0 0 hsl(var(--ink))" }}
            >
              <span className="text-3xl">{n.emoji}</span>
              <span className="font-quest font-bold text-[10px] uppercase mt-1 leading-tight text-center px-1 text-ink">
                {n.title}
              </span>
              {isDone && (
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-quest-mint border-2 border-ink flex items-center justify-center text-sm">
                  ✓
                </span>
              )}
              <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 chip text-[10px] py-0.5 px-2 bg-paper">
                Y{n.year}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Start label */}
      <div className="flex justify-center mt-6">
        <div className="quest-card bg-quest-mint text-quest-mint-foreground px-5 py-3 rotate-2">
          <p className="font-quest text-xs uppercase tracking-widest opacity-80">you start here</p>
          <p className="font-quest font-black text-xl flex items-center gap-2">
            <span className="text-2xl">🎒</span> {startLabel}
          </p>
        </div>
      </div>
    </div>
  );
};
