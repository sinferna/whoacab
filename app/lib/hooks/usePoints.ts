import { supabase } from "../supabase";

export async function awardPoints(userId: string, wordId: string, points: number): Promise<boolean> {
  console.log("awardPoints called", { userId, wordId, points });

  const { data: existing, error: checkError } = await supabase
    .from("user_completions")
    .select("id")
    .eq("user_id", userId)
    .eq("word_id", wordId)
    .single();

  if (existing) return false;

  const { error: rpcError } = await supabase.rpc("increment_points", { user_id: userId, amount: points });

  const { error: insertError } = await supabase
    .from("user_completions")
    .insert({ user_id: userId, word_id: wordId });

  return true;
}

export async function hasUserCompleted(userId: string, wordId: string): Promise<boolean> {
  const { data } = await supabase
    .from("user_completions")
    .select("id")
    .eq("user_id", userId)
    .eq("word_id", wordId)
    .single();

  return !!data;
}