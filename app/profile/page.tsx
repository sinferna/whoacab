"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import TopNavigation from "../components/TopNavigation";
import ProfileCard from "../components/ProfileCard";
import { gluten, instrumentSans } from "../lib/theme";
import { useAuth } from "../lib/hooks/useAuth";
import { useProfile } from "../lib/hooks/useProfile";

export default function ProfilePage() {
  const { user } = useAuth();
  const { profile, loading } = useProfile();
  const [updatedUsername, setUpdatedUsername] = useState<string | null>(null);
  const router = useRouter();

  const displayProfile = updatedUsername && profile
    ? { ...profile, username: updatedUsername }
    : profile;

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-24">
      <TopNavigation activePage="profile" />
      <div className="w-full max-w-md pt-20 px-4 flex flex-col items-center gap-6">
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
              Login
            </button>
          </div>
        ) : loading ? (
          <p className={`text-[#AAAAAA] text-sm ${instrumentSans.className}`}>Loading...</p>
        ) : !displayProfile ? (
          <p className={`text-[#AAAAAA] text-sm ${instrumentSans.className}`}>Something went wrong.</p>
        ) : (
          <ProfileCard
            profile={displayProfile}
            userId={user.id}
            onUpdate={setUpdatedUsername}
          />
        )}
      </div>
    </div>
  );
}