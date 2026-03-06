"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopNavigation from "../components/TopNavigation";
import ProfileCard from "../components/ProfileCard";
import { gluten, instrumentSans } from "../lib/theme";
import { useAuth } from "../lib/hooks/useAuth";
import { useProfile, Profile } from "../lib/hooks/useProfile";
import { supabase } from "../lib/supabase";
import TrophyCase from "../components/TrophyCase";

export default function ProfilePage() {
  const { user } = useAuth();
  const { profile, loading } = useProfile();
  const [updatedProfile, setUpdatedProfile] = useState<Profile | null>(null);
  const [rank, setRank] = useState<number | null>(null);
  const router = useRouter();

  const displayProfile = updatedProfile ?? profile;

  useEffect(() => {
    if (!user || !profile) return;
    supabase
      .rpc("get_user_rank", { user_id: user.id })
      .then(({ data }) => setRank(data));
  }, [user, profile]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-24">
      <TopNavigation activePage="profile" />
      <div className="w-full max-w-md pt-12 px-4 flex flex-col items-center gap-6">
        <h1 className={`text-3xl text-black mt-6 ${gluten.className}`}>Profile</h1>

        {!user ? (
          <div className="flex flex-col items-center gap-4">
            <p className={`text-[#AAAAAA] text-sm ${instrumentSans.className}`}>
              Sign in to view your profile.
            </p>
            <button
              className={`text-[#9588FF] text-sm cursor-pointer ${instrumentSans.className}`}
              onClick={() => router.push("/login")}
            >
              Log in
            </button>
          </div>
        ) : loading ? (
          <p className={`text-[#AAAAAA] text-sm ${instrumentSans.className}`}>Loading...</p>
        ) : !displayProfile ? (
          <p className={`text-[#AAAAAA] text-sm ${instrumentSans.className}`}>Something went wrong.</p>
        ) : (
          <>
            <ProfileCard
              profile={displayProfile}
              userId={user.id}
              onUpdate={(updates) => setUpdatedProfile({ ...displayProfile, ...updates })}
            />
            <TrophyCase
              points={displayProfile.points}
              rank={rank}
            />
          </>
        )}
      </div>
    </div>
  );
}