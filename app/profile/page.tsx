"use client";

import TopNavigation from "../components/TopNavigation";
import { gluten, instrumentSans } from "../lib/theme";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-24">
      <TopNavigation activePage="profile" />
      <div className="w-full max-w-md pt-20 px-4 flex flex-col items-center gap-6">
        <h1 className={`text-3xl text-black mt-6 ${gluten.className}`}>Profile</h1>
        <p className={`text-[#AAAAAA] text-sm ${instrumentSans.className}`}>
          Sign in to view your profile.
        </p>
      </div>
    </div>
  );
}