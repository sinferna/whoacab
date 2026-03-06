"use client";

import { gluten, instrumentSans } from "../lib/theme";
import { LeaderboardEntry } from "../lib/hooks/useLeaderboard";

interface Props {
  entries: LeaderboardEntry[];
}

const rankColor = (i: number) =>
  i === 0 ? "text-[#FFD700]" : i === 1 ? "text-[#AAAAAA]" : i === 2 ? "text-[#CD7F32]" : "text-black";

export default function Leaderboard({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <p className={`text-center text-[#AAAAAA] text-sm ${instrumentSans.className}`}>
        No rankings yet.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {entries.map((entry, index) => (
        <div
          key={index}
          className="flex items-center gap-4 bg-white border border-[#AAAAAA] border-b-2 rounded-xl px-4 py-3 shadow-sm"
        >
          <span className={`text-xl w-8 text-center ${gluten.className} ${rankColor(index)}`}>
            {index + 1}
          </span>

          <div className="flex flex-col flex-1">
            <div className="flex items-center gap-2">
              <span className={`text-base font-semibold text-black ${instrumentSans.className}`}>
                {entry.username}
              </span>
              {entry.country_code && (
                <span
                  className={`fi fi-${entry.country_code.toLowerCase()}`}
                  style={{ width: 16, height: 12, display: "inline-block" }}
                />
              )}
            </div>
          </div>

          <span className={`text-base font-bold text-[#9588FF] ${instrumentSans.className}`}>
            {entry.points.toLocaleString()} pts
          </span>
        </div>
      ))}
    </div>
  );
}