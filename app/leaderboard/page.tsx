"use client";

import TopNavigation from "../components/TopNavigation";
import Leaderboard from "../components/Leaderboard";
import { gluten, instrumentSans } from "../lib/theme";
import { useLeaderboard } from "../lib/hooks/useLeaderboard";

export default function LeaderboardPage() {
  const { entries, loading } = useLeaderboard();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-24">
      <TopNavigation activePage="leaderboard" />
      <div className="w-full max-w-md pt-12 px-4 flex flex-col gap-4">
        <h1 className={`text-3xl text-black mt-6 text-center ${gluten.className}`}>Leaderboard</h1>

        {loading ? (
          <p className={`text-center text-[#AAAAAA] text-sm ${instrumentSans.className}`}>Loading...</p>
        ) : (
          <Leaderboard entries={entries} />
        )}
      </div>
    </div>
  );
}