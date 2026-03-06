"use client";

import { gluten, instrumentSans } from "../lib/theme";

interface Props {
  points: number;
  rank: number | null;
}

const TROPHIES = [
  { name: "Rune",     threshold: 200,   emoji: "⚡" },
  { name: "Scroll",   threshold: 2000,  emoji: "📜" },
  { name: "Codex",    threshold: 5000,  emoji: "📖" },
  { name: "Grimoire", threshold: 10000, emoji: "🔮" },
  { name: "Lexicon",  threshold: 20000, emoji: "👑" },
];

export default function TrophyCase({ points, rank }: Props) {
  const earned = TROPHIES.filter(t => points >= t.threshold);
  const next = TROPHIES.find(t => points < t.threshold);
  const progress = next
    ? Math.round((points / next.threshold) * 100)
    : 100;

  return (
    <div className="w-full bg-[#F5F3FF] rounded-2xl p-5 border border-[#D4CFFF] border-b-4 shadow-sm flex flex-col gap-4">

      {/* points + rank */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col">
          <p className={`text-[#AAAAAA] text-xs uppercase tracking-wide ${instrumentSans.className}`}>Points</p>
          <p className={`text-[#9588FF] text-2xl font-bold ${gluten.className}`}>
            {points.toLocaleString()}
          </p>
        </div>
        {rank !== null && (
          <div className="flex flex-col items-end">
            <p className={`text-[#AAAAAA] text-xs uppercase tracking-wide ${instrumentSans.className}`}>Rank</p>
            <p className={`text-2xl font-bold text-black ${gluten.className}`}>#{rank}</p>
          </div>
        )}
      </div>

      <div className="border-t border-[#E0DEFF]" />

      {/* trophy grid */}
      <div className="flex flex-col gap-2">
        <p className={`text-[#AAAAAA] text-xs uppercase tracking-wide ${instrumentSans.className}`}>Trophies</p>
        <div className="flex gap-3">
          {TROPHIES.map(t => {
            const unlocked = points >= t.threshold;
            return (
              <div key={t.name} className="flex flex-col items-center gap-1">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl border-2 transition-all
                  ${unlocked
                    ? "bg-white border-[#9588FF] shadow-sm"
                    : "bg-[#E0DEFF] border-[#D4CFFF] opacity-40 grayscale"
                  }`}
                >
                  {t.emoji}
                </div>
                <p className={`text-[10px] text-center ${unlocked ? "text-black font-bold" : "text-[#AAAAAA]"} ${instrumentSans.className}`}>
                  {t.name}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* progress to next trophy */}
      {next && (
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center">
            <p className={`text-[#AAAAAA] text-xs ${instrumentSans.className}`}>
              Next: <span className="text-black font-bold">{next.emoji} {next.name}</span>
            </p>
            <p className={`text-[#AAAAAA] text-xs ${instrumentSans.className}`}>
              {points.toLocaleString()} / {next.threshold.toLocaleString()}
            </p>
          </div>
          <div className="w-full bg-[#E0DEFF] rounded-full h-2">
            <div
              className="bg-[#FFCC00] h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

    </div>
  );
}