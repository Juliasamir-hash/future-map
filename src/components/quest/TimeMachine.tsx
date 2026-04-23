import { Slider } from "@/components/ui/slider";

interface Props {
  year: number;
  onChange: (y: number) => void;
}

export const TimeMachine = ({ year, onChange }: Props) => {
  return (
    <div className="quest-card bg-paper p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-quest text-[11px] uppercase tracking-widest text-muted-foreground">⏳ Time Machine</p>
          <p className="font-quest font-black text-base leading-tight">
            Showing through <span className="text-quest-purple">Year {year}</span>
          </p>
        </div>
        <div className="flex gap-1">
          {[1,2,3,4,5].map((y) => (
            <button
              key={y}
              onClick={() => onChange(y)}
              className={`w-8 h-8 rounded-full border-2 border-ink font-quest font-black text-xs quest-squish ${
                y === year ? "bg-quest-purple text-quest-purple-foreground" : "bg-paper"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>
      <Slider
        value={[year]}
        min={1}
        max={5}
        step={1}
        onValueChange={(v) => onChange(v[0])}
      />
      <div className="flex justify-between mt-1 font-quest text-[10px] uppercase tracking-wider text-muted-foreground">
        <span>now</span><span>+1y</span><span>+2y</span><span>+3y</span><span>+4y</span><span>+5y</span>
      </div>
    </div>
  );
};
