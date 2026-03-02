"use client";

import WordCard from "./components/WordCard";
import DifficultyBadge from "./components/DifficultyBadge";
import QuizSelection from "./components/QuizSelection";
import CheckButton from "./components/CheckButton";
import BottomNav from "./components/BottomNavigation";
import Toast from "./components/Toast";
import confetti from "canvas-confetti";
import { Quiz, Word } from "./lib/types";
import { useState, useEffect } from "react";

export default function Page() {
  const [selected, setSelected] = useState<number | null>(null);
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);
  
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

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-24">
      <div className="w-full max-w-md px-4 pt-6">
        <DifficultyBadge difficulty="HARD" />
        <WordCard word={word}/>
        <QuizSelection
          question={question}
          selected={selected}
          setSelected={setSelected}
          checked={checked}
        />
        <div className="flex justify-center">
          <CheckButton
            onClick={() => {
              if (selected === null) {
                setError(true);
              } else {
                setError(false);
                setChecked(true);
              }
            }}
            checked={checked}
          />
        </div>
      </div>
      <Toast
        message="Please select an option first."
        visible={error}
      />
      <BottomNav />
    </div>
  );
}