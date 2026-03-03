"use client";

import WordCard from "./components/WordCard";
import DifficultyBadge from "./components/DifficultyBadge";
import QuizSelection from "./components/QuizSelection";
import CheckButton from "./components/CheckButton";
import TopNavigation from "./components/TopNavigation";
import Toast from "./components/Toast";
import PointsOverlay from "./components/PointsOverlay";
import confetti from "canvas-confetti";
import { Quiz, Word, Difficulty, PointsResult } from "./lib/types";
import { useState, useEffect } from "react";

function calcPoints(difficulty: Difficulty, correct: boolean, streakDays?: number): PointsResult {
  const base = difficulty === "EASY" ? 100 : difficulty === "MEDIUM" ? 250 : 500;
  const streakMult = streakDays === undefined ? 1 : streakDays >= 30 ? 3 : streakDays >= 14 ? 2.5 : streakDays >= 7 ? 2 : streakDays >= 3 ? 1.5 : 1;
  const accuracyMult = correct ? 1 : 0.6;
  return {
    earned: Math.round(base * streakMult * accuracyMult),
    difficulty,
    streakDays,
    correct,
  };
}

export default function Page() {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);
  const [showOverlay, setShowOverlay] = useState(false);
  const [earnedPoints, setEarnedPoints] = useState(0);

  const isLoggedIn = false; // swap with real auth check later

  const question: Quiz = {
    options: [
      "She gave a laconic speech that lasted over two hours and covered every detail.",
      "The laconic painting was filled with bright and vibrant colors.",
      "They celebrated laconically with loud music and long speeches.",
      "His laconic reply of \"Fine.\" ended the conversation quickly.",
    ],
    correctIndex: 3,
  };

  const word: Word = {
    word: "la·con·ic",
    phonetic: "/ləˈkɒnɪk/",
    partOfSpeech: "adjective",
    definition: "using very few words in speech or writing.",
  };

  useEffect(() => {
    if (checked && selected === question.correctIndex) {
      confetti({
        particleCount: 150,
        spread: 100,
        ticks: 100,
        origin: { y: 0.8 },
        colors: ["#9588FF", "#6F5DFF", "#22C55E", "#FF9600"],
      });
    }
  }, [checked]);

  const handleCheck = () => {
    if (selected === null) {
      setError(true);
      return;
    }

    setError(false);
    setChecked(true);

    const correct = selected === question.correctIndex;
    if (!correct) setShakeKey(prev => prev + 1);

    const result = isLoggedIn
      ? calcPoints("HARD", correct, 7)  // swap 7 with user.streakDays later
      : calcPoints("HARD", correct);

    setEarnedPoints(result.earned);
    setTimeout(() => setShowOverlay(true), correct ? 2000 : 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-24">
      <TopNavigation />

      <div className="w-full max-w-md pt-12">
        <DifficultyBadge difficulty="HARD" />
        <WordCard word={word} />

        <div key={shakeKey} className={shakeKey > 0 ? "animate-shake" : ""}>
          <QuizSelection
            question={question}
            selected={selected}
            setSelected={setSelected}
            checked={checked}
          />
        </div>

        <div className="flex flex-col items-center">
          <CheckButton onClick={handleCheck} checked={checked} />
          <Toast message="Please select an option first." visible={error} />
        </div>
      </div>

      {showOverlay && (
        <PointsOverlay points={earnedPoints} onClose={() => setShowOverlay(false)} />
      )}
    </div>
  );
}