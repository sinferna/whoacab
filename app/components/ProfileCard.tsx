"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { gluten, instrumentSans } from "../lib/theme";
import { Profile } from "../lib/hooks/useProfile";

interface Props {
  profile: Profile;
  userId: string;
  onUpdate: (newUsername: string) => void;
}

export default function ProfileCard({ profile, userId, onUpdate }: Props) {
  const [editing, setEditing] = useState(false);
  const [username, setUsername] = useState(profile.username);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

const handleSave = async () => {
  if (!username.trim()) { setError("Username cannot be empty."); return; }
  if (username.length > 12) { setError("Username must be 12 characters or less."); return; }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) { setError("Username can only contain letters, numbers, and underscores."); return; }
  setSaving(true);

  const { error, data } = await supabase
    .from("users")
    .update({ username })
    .eq("id", userId)
    .select();

  console.log("update result", { error, data });

  if (error) {
    if (error.code === "23505") {
      setError("Username already taken.");
    } else {
      setError("Failed to update username.");
    }
  } else {
    onUpdate(username);
    setEditing(false);
    setError("");
  }
  setSaving(false);
};

  return (
    <div className="w-full bg-[#F5F3FF] rounded-2xl p-6 border border-[#9588FF] border-b-2 flex flex-col gap-4">
      <div className="flex justify-between items-center">
        {editing ? (
          <input
            className={`border border-[#AAAAAA] border-b-2 rounded-lg px-3 py-1 text-black outline-none focus:border-[#9588FF] transition-colors ${instrumentSans.className}`}
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username"
            autoFocus
          />
        ) : (
          <p className={`text-2xl font-bold text-black ${gluten.className}`}>
            {profile.username || "No username set"}
          </p>
        )}
        <button
          className={`text-sm text-[#9588FF] cursor-pointer ${instrumentSans.className}`}
          onClick={() => editing ? handleSave() : setEditing(true)}
        >
          {editing ? (saving ? "Saving..." : "Save") : "Edit"}
        </button>
      </div>

      {error && <p className={`text-red-500 text-xs ${instrumentSans.className}`}>{error}</p>}

      {profile.country && (
        <p className={`text-[#AAAAAA] text-sm ${instrumentSans.className}`}>{profile.country}</p>
      )}
      <p className={`text-[#AAAAAA] text-xs ${instrumentSans.className}`}>
        Member since {new Date(profile.created_at).toLocaleDateString()}
      </p>
      <p className={`text-[#9588FF] text-lg font-bold ${instrumentSans.className}`}>
        {profile.points.toLocaleString()} pts
      </p>
    </div>
  );
}