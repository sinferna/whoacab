"use client";

import WordCard from "./components/WordCard";
import DifficultyBadge from "./components/DifficultyBadge";
import QuizSelection from "./components/QuizSelection";
import CheckButton from "./components/CheckButton";
import TopNavigation from "./components/TopNavigation";
import Toast from "./components/Toast";
import PointsOverlay from "./components/PointsOverlay";
import confetti from "canvas-confetti";
import { Difficulty, PointsResult } from "./lib/types";
import { useState, useEffect } from "react";
import { useWord } from "./lib/hooks/useWord";
import { useAuth } from "./lib/hooks/useAuth";
import { awardPoints, hasUserCompleted } from "./lib/hooks/usePoints";
import { instrumentSans } from "./lib/theme";

function calcPoints(difficulty: Difficulty, correct: boolean, streakDays?: number): PointsResult {
  const base = difficulty === "EASY" ? 100 : difficulty === "MEDIUM" ? 250 : 500;
  const streakMult = streakDays === undefined ? 1 : streakDays >= 30 ? 3 : streakDays >= 14 ? 2.5 : streakDays >= 7 ? 2 : streakDays >= 3 ? 1.5 : 1;
  const accuracyMult = correct ? 1 : 0.4;
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
  const [alreadyCompleted, setAlreadyCompleted] = useState(false);

  const { word, question, loading } = useWord();
  const { user } = useAuth();
  const isLoggedIn = !!user;

  useEffect(() => {
    if (user && question) {
      hasUserCompleted(user.id, question.word_id).then(completed => {
        if (completed) {
          setAlreadyCompleted(true);
          setChecked(true);
          setSelected(question.correctIndex);
        }
      });
    }
  }, [user, question]);

  useEffect(() => {
    if (checked && !alreadyCompleted && question && selected === question.correctIndex) {
      confetti({
        particleCount: 150,
        spread: 100,
        ticks: 100,
        origin: { y: 0.8 },
        colors: ["#9588FF", "#6F5DFF", "#22C55E", "#FF9600"],
      });
    }
  }, [checked]);

  useEffect(() => {
    if (!user) {
      setSelected(null);
      setChecked(false);
      setError(false);
      setShakeKey(0);
      setShowOverlay(false);
      setEarnedPoints(0);
      setAlreadyCompleted(false);
    }
  }, [user]);

  const handleCheck = async () => {
    if (selected === null) {
      setError(true);
      return;
    }

    setError(false);
    setChecked(true);

    const correct = selected === question!.correctIndex;
    if (!correct) setShakeKey(prev => prev + 1);

    const result = calcPoints(word!.difficulty, correct);
    setEarnedPoints(result.earned);

    if (user) {
      await awardPoints(user.id, question!.word_id, result.earned);
    }

    setTimeout(() => setShowOverlay(true), correct ? 2000 : 1200);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-24">
      <TopNavigation />

      <div className="w-full max-w-md pt-12">
        <DifficultyBadge difficulty={word?.difficulty ?? "HARD"} />

        {loading ? (
          <p className={`text-center text-[#AAAAAA] text-sm mt-6 ${instrumentSans.className}`}>Loading...</p>
        ) : !word || !question ? (
          <p className={`text-center text-[#AAAAAA] text-sm mt-6 ${instrumentSans.className}`}>Something went wrong.</p>
        ) : (
          <>
            <WordCard word={word} />
            <div key={shakeKey} className={shakeKey > 0 ? "animate-shake" : ""}>
              <QuizSelection
                question={question}
                selected={selected}
                setSelected={setSelected}
                checked={checked || alreadyCompleted}
              />
            </div>
            <div className="flex flex-col items-center">
              <CheckButton onClick={handleCheck} checked={checked || alreadyCompleted} />
              <Toast message="Please select an option first." visible={error} />
            </div>
          </>
        )}
      </div>

      {showOverlay && (
        <PointsOverlay
          points={earnedPoints}
          wordId={question!.word_id}
          isLoggedIn={isLoggedIn}
          onClose={() => setShowOverlay(false)}
        />
      )}
    </div>
  );
}