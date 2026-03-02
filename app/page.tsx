"use client";

import WordCard from "./components/WordCard";
import DifficultyBadge from "./components/DifficultyBadge";
import QuizSelection from "./components/QuizSelection";
import CheckButton from "./components/CheckButton";
import BottomNav from "./components/BottomNavigation";
import Toast from "./components/Toast";
import { Quiz } from "./lib/types";
import { useState } from "react";

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

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pb-24">
      <div className="w-full max-w-md px-4 pt-6">
        <DifficultyBadge difficulty="HARD" />
        <WordCard
          word="la·con·ic"
          phonetic="/ləˈkɒnɪk/"
          partOfSpeech="adjective"
          definition="using very few words in speech or writing."
        />
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
        onHide={() => setError(false)}
      />
      <BottomNav />
    </div>
  );
}