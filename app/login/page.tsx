"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../lib/supabase";
import { awardPoints } from "../lib/hooks/usePoints";
import { gluten, instrumentSans } from "../lib/theme";
import PrimaryButton from "../components/PrimaryButton";
import { COUNTRIES } from "../lib/countries";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const points = parseInt(searchParams.get("points") ?? "0");
  const wordId = searchParams.get("wordId") ?? "";

  const [isSignup, setIsSignup]       = useState(searchParams.get("signup") === "true");
  const [email, setEmail]             = useState("");
  const [password, setPassword]       = useState("");
  const [username, setUsername]       = useState("");
  const [country, setCountry]         = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [error, setError]             = useState("");
  const [loading, setLoading]         = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const inputClass = `w-full border border-[#AAAAAA] border-b-2 rounded-lg px-4 py-2 text-black outline-none focus:border-[#9588FF] transition-colors ${instrumentSans.className}`;

  async function handleSignup() {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;
    if (data.user) {
      let attempts = 0;
      while (attempts < 10) {
        const { data: row } = await supabase.from("users").select("id").eq("id", data.user.id).single();
        if (row) break;
        await new Promise(resolve => setTimeout(resolve, 300));
        attempts++;
      }
      await supabase.from("users").update({ username, country, country_code: countryCode }).eq("id", data.user.id);
      if (points && wordId) await awardPoints(data.user.id, wordId, points);
      router.push("/profile");
    }
  }

  async function handleLogin() {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    if (data.user && points && wordId) await awardPoints(data.user.id, wordId, points);
    router.push("/");
  }

  async function handleSubmit() {
    if (!email || !password) { setError("Please fill in all fields."); return; }

    if (isSignup) {
      if (!username)                              { setError("Please enter a username."); return; }
      if (username.length > 12)                   { setError("Username must be 12 characters or less."); return; }
      if (!/^[a-zA-Z0-9_]+$/.test(username))     { setError("Username can only contain letters, numbers, and underscores."); return; }
      if (!country)                               { setError("Please select your country."); return; }
      if (password.length < 6)                    { setError("Password must be at least 6 characters."); return; }
      if (!/[A-Z]/.test(password))                { setError("Password must contain at least one capital letter."); return; }
      if (!/[^a-zA-Z0-9]/.test(password))         { setError("Password must contain at least one special character."); return; }
      if (!/[0-9]/.test(password))                { setError("Password must contain at least one number."); return; }
    }

    setLoading(true);
    setError("");

    try {
      isSignup ? await handleSignup() : await handleLogin();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-md flex flex-col gap-6">
        <h1 className={`text-4xl text-center text-black ${gluten.className}`}>
          {isSignup ? "SIGN UP" : "LOGIN"}
        </h1>

        {points > 0 && (
          <p className={`text-center text-[#9588FF] text-sm ${instrumentSans.className}`}>
            {isSignup ? `Sign up to claim your ${points} points!` : `Log in to claim your ${points} points!`}
          </p>
        )}

        <div className="flex flex-col gap-3 px-8">
          {isSignup && (
            <>
              <input
                className={inputClass}
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
              <select
                className={inputClass}
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
            </>
          )}
          <input
            className={inputClass}
            placeholder="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <div className="relative">
            <input
              className={inputClass}
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#AAAAAA] text-sm cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && (
          <p className={`text-red-500 text-sm text-center ${instrumentSans.className}`}>{error}</p>
        )}

        <div className="flex justify-center">
          <PrimaryButton
            label={loading ? "..." : isSignup ? "SIGN UP" : "LOG IN"}
            onClick={handleSubmit}
          />
        </div>

        <p
          className={`text-center text-sm text-[#AAAAAA] cursor-pointer ${instrumentSans.className}`}
          onClick={() => setIsSignup(!isSignup)}
        >
          {isSignup ? "Already have an account? Log in" : "Don't have an account? Sign up"}
        </p>
      </div>
    </div>
  );
}