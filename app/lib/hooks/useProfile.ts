import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { useAuth } from "./useAuth";

export interface Profile {
  username: string;
  country: string | null;
  country_code: string | null;
  points: number;
  created_at: string;
  avatar_url: string | null;
  preferred_difficulty: string | null;
}

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) { setLoading(false); return; }

    supabase
      .from("users")
      .select("username, country, country_code, points, created_at, avatar_url, preferred_difficulty")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        if (data) setProfile(data);
        setLoading(false);
      });
  }, [user]);

  return { profile, loading };
}