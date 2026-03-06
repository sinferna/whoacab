"use client";

import TopNavigation from "../components/TopNavigation";
import { gluten, instrumentSans } from "../lib/theme";
import { useLeaderboard } from "../lib/hooks/useLeaderboard";

export default function LeaderboardPage() {
  const { entries, loading } = useLeaderboard();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-24">
      <TopNavigation activePage="leaderboard" />
      <div className="w-full max-w-md pt-20 px-4 flex flex-col gap-4">
        <h1 className={`text-3xl text-black mt-6 text-center ${gluten.className}`}>Leaderboard</h1>

        {loading ? (
          <p className={`text-center text-[#AAAAAA] text-sm ${instrumentSans.className}`}>Loading...</p>
        ) : entries.length === 0 ? (
          <p className={`text-center text-[#AAAAAA] text-sm ${instrumentSans.className}`}>No rankings yet.</p>
        ) : (
          <div className="flex flex-col gap-2">
            {entries.map((entry, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-white border border-[#AAAAAA] border-b-2 rounded-xl px-4 py-3 shadow-sm"
              >
                <span className={`text-xl w-8 text-center ${gluten.className} ${index === 0 ? "text-[#FFD700]" : index === 1 ? "text-[#AAAAAA]" : index === 2 ? "text-[#CD7F32]" : "text-black"}`}>
                  {index + 1}
                </span>
                <div className="flex flex-col flex-1">
                  <span className={`text-base font-semibold text-black ${instrumentSans.className}`}>{entry.username}</span>
                  {entry.country && <span className={`text-xs text-[#AAAAAA] ${instrumentSans.className}`}>{entry.country}</span>}
                </div>
                <span className={`text-base font-bold text-[#9588FF] ${instrumentSans.className}`}>{entry.points.toLocaleString()} pts</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}