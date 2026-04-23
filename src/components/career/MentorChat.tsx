import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mascot } from "@/components/Mascot";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CAREERS, CareerType } from "@/lib/career-data";
import { Send } from "lucide-react";

interface Props {
  name: string;
  career: CareerType;
  onClose: () => void;
}

interface Msg { from: "you" | "mentor"; text: string; }

const STARTERS = [
  "what should i do this week?",
  "i'm feeling stuck.",
  "is this path even right for me?",
  "how do i tell my parents?",
];

export const MentorChat = ({ name, career, onClose }: Props) => {
  const [messages, setMessages] = useState<Msg[]>([
    { from: "mentor", text: `hey ${name.toLowerCase()}. i'm here whenever. what's on your mind?` },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const newMsgs: Msg[] = [...messages, { from: "you", text }];
    setMessages(newMsgs);
    setInput("");
    setTimeout(() => {
      setMessages([...newMsgs, { from: "mentor", text: reply(text, career) }]);
    }, 700);
  };

  return (
    <div className="min-h-screen bg-paper flex flex-col max-w-md mx-auto">
      <div className="sticky top-0 z-10 bg-paper/95 backdrop-blur border-b-2 border-ink px-5 py-3 flex items-center justify-between">
        <button onClick={onClose} className="chip">← back</button>
        <div className="flex items-center gap-2">
          <Mascot mood="happy" size={36} />
          <div>
            <p className="font-display text-base leading-none">mentor</p>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">always here</p>
          </div>
        </div>
        <div className="w-12" />
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
        <AnimatePresence initial={false}>
          {messages.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${m.from === "you" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[78%] px-4 py-3 border-2 border-ink rounded-2xl ${
                  m.from === "you"
                    ? "bg-lime rounded-br-sm"
                    : "bg-card rounded-bl-sm"
                }`}
              >
                <p className="text-[15px] leading-snug">{m.text}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {messages.length <= 1 && (
        <div className="px-5 pb-3 flex flex-wrap gap-2">
          {STARTERS.map((s) => (
            <button key={s} onClick={() => send(s)} className="chip text-sm hover:bg-cobalt hover:text-cobalt-foreground">
              {s}
            </button>
          ))}
        </div>
      )}

      <form
        onSubmit={(e) => { e.preventDefault(); send(input); }}
        className="border-t-2 border-ink p-3 flex gap-2 bg-paper"
      >
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="type something…"
          className="h-12 border-2 border-ink rounded-2xl bg-card"
        />
        <Button type="submit" size="icon" className="h-12 w-12 sticker-sm bg-ink text-paper hover:bg-ink/90 rounded-2xl">
          <Send className="w-5 h-5" />
        </Button>
      </form>
    </div>
  );
};

function reply(text: string, career: CareerType): string {
  const t = text.toLowerCase();
  const c = CAREERS[career];
  if (t.includes("stuck")) return `stuck is normal. pick the smallest possible next step — like, embarrassingly small. as a ${c.title}, motion beats motivation. what's the 10-minute version?`;
  if (t.includes("week")) return `this week: knock out one milestone task. just one. don't try to be impressive — try to be consistent. which stop are you on?`;
  if (t.includes("right") || t.includes("path")) return `real talk: no path is "right" forever. the ${c.title} energy fits what you told me. but if it stops feeling true, we re-route. that's literally what i'm for.`;
  if (t.includes("parents") || t.includes("family")) return `lead with what you're building, not the title. show one project. people argue with labels but they don't argue with proof.`;
  return `noted. honest answer: ${c.title}s win by shipping. what's the next thing you can ship — even if it's tiny?`;
}
