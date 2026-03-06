"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { gluten, instrumentSans } from "../lib/theme";
import { Profile } from "../lib/hooks/useProfile";
import { DEFAULT_AVATAR } from "../lib/avatars";
import AvatarPicker from "./AvatarPicker";
import { COUNTRIES } from "../lib/countries";
import DifficultySelector from "./DifficultySelector";

interface Props {
  profile: Profile;
  userId: string;
  onUpdate: (updates: Partial<Profile>) => void;
}

function EditInput({ value, onChange, placeholder, autoFocus = false }: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoFocus?: boolean;
}) {
  return (
    <input
      className={`border border-[#AAAAAA] border-b-2 rounded-lg px-3 py-1 text-black outline-none focus:border-[#9588FF] transition-colors text-sm w-full ${instrumentSans.className}`}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
    />
  );
}

export default function ProfileCard({ profile, userId, onUpdate }: Props) {
  const [editing, setEditing]         = useState(false);
  const [username, setUsername]       = useState(profile.username);
  const [country, setCountry]         = useState(profile.country ?? "");
  const [countryCode, setCountryCode] = useState(profile.country_code ?? "");
  const [difficulty, setDifficulty]   = useState(profile.preferred_difficulty ?? "MEDIUM");
  const [avatarUrl, setAvatarUrl]     = useState(profile.avatar_url ?? DEFAULT_AVATAR);
  const [saving, setSaving]           = useState(false);
  const [error, setError]             = useState("");

  const handleSave = async () => {
    if (!username.trim())                   { setError("Username cannot be empty."); return; }
    if (username.length > 12)               { setError("Username must be 12 characters or less."); return; }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) { setError("Username can only contain letters, numbers, and underscores."); return; }

    setSaving(true);
    const { error } = await supabase
      .from("users")
      .update({ username, country, country_code: countryCode, preferred_difficulty: difficulty, avatar_url: avatarUrl })
      .eq("id", userId)
      .select();

    if (error) {
      setError(error.code === "23505" ? "Username already taken." : "Failed to update profile.");
    } else {
      onUpdate({ username, country, country_code: countryCode, preferred_difficulty: difficulty, avatar_url: avatarUrl });
      setEditing(false);
      setError("");
    }
    setSaving(false);
  };

  return (
    <div className="w-full bg-[#F5F3FF] rounded-2xl p-5 border border-[#D4CFFF] border-b-4 shadow-sm flex flex-col gap-5">

      {/* avatar + info + edit button */}
      <div className="flex gap-4 items-center">
        <div className="flex-shrink-0">
          <img
            src={avatarUrl ?? DEFAULT_AVATAR}
            alt="avatar"
            className="rounded-full border-2 border-[#9588FF] shadow-md bg-white"
            style={{ width: 72, height: 72 }}
          />
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          {editing
            ? <EditInput value={username} onChange={setUsername} placeholder="Username" autoFocus />
            : <p className={`text-2xl font-bold text-black leading-tight truncate ${gluten.className}`}>{profile.username || "No username"}</p>
          }
          <p className={`text-[#AAAAAA] text-sm ${instrumentSans.className}`}>
            Joined {new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
          </p>
          {editing ? (
            <select
              className={`border border-[#AAAAAA] border-b-2 rounded-lg px-2 py-1 text-black outline-none focus:border-[#9588FF] transition-colors text-sm bg-white ${instrumentSans.className}`}
              value={country}
              onChange={e => {
                const selected = COUNTRIES.find(c => c.name === e.target.value);
                setCountry(selected?.name ?? "");
                setCountryCode(selected?.code ?? "");
              }}
            >
              <option value="">Select country</option>
              {COUNTRIES.map(c => (
                <option key={c.code} value={c.name}>{c.flag} {c.name}</option>
              ))}
            </select>
          ) : profile.country && (
            <p className={`text-[#AAAAAA] text-sm flex items-center gap-1 ${instrumentSans.className}`}>
              <span className={`fi fi-${profile.country_code?.toLowerCase()}`} style={{ width: 16, height: 12, display: "inline-block" }} />
              {profile.country}
            </p>
          )}
        </div>

        <button
          className={`flex-shrink-0 self-start text-sm text-[#9588FF] cursor-pointer border border-[#9588FF] rounded-full px-4 py-1 hover:bg-[#9588FF] hover:text-white transition-all ${instrumentSans.className}`}
          onClick={() => editing ? handleSave() : setEditing(true)}
        >
          {editing ? (saving ? "Saving..." : "Save") : "Edit"}
        </button>
      </div>

      {/* avatar picker */}
      {editing && (
        <div className="flex flex-col gap-2">
          <p className={`text-[#AAAAAA] text-xs uppercase tracking-wide ${instrumentSans.className}`}>Choose Avatar</p>
          <AvatarPicker selected={avatarUrl} onSelect={setAvatarUrl} />
        </div>
      )}

      {error && <p className={`text-red-500 text-xs ${instrumentSans.className}`}>{error}</p>}

      <div className="border-t border-[#E0DEFF]" />

      <DifficultySelector
        selected={editing ? difficulty : (profile.preferred_difficulty ?? "MEDIUM")}
        onChange={setDifficulty}
        disabled={!editing}
      />
    </div>
  );
}