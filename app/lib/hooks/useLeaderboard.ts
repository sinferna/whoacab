import { useEffect, useState } from "react";
import { supabase } from "../supabase";

export interface LeaderboardEntry {
  username: string;
  country: string | null;
  country_code: string | null;
  points: number;
}

export function useLeaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data, error } = await supabase
        .from("users")
        .select("username, country, country_code, points")
        .order("points", { ascending: false })
        .limit(20);

      if (data) setEntries(data);
      setLoading(false);
    }
    fetch();
  }, []);

  return { entries, loading };
}