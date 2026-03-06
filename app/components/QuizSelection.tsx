"use client";

import OptionItem from "./OptionItem";
import { gluten } from "../lib/theme";
import { Quiz } from "../lib/types";

interface Props {
  question: Quiz;
  selected: number | null;
  setSelected: (i: number) => void;
  checked: boolean;
}

export default function QuizSelection({ question, selected, setSelected, checked }: Props) {
  const userGotItRight = checked && selected === question.correctIndex;

  return (
    <div className="mt-4 mb-6">
      <h3 className={`text-center text-black text-lg mb-1 ${gluten.className}`}>
        WHICH SENTENCE USES IT CORRECTLY?
      </h3>

      <div className="px-4 space-y-2">
        {question.options.map((option, index) => (
          <OptionItem 
            key={index} 
            checked={checked}
            label={`${String.fromCharCode(97 + index)})`} 
            text={option}
            isSelected={!checked && selected === index}
            isCorrect={checked && index === question.correctIndex}
            isWrong={checked && selected === index && index !== question.correctIndex}
            showCorrectFill={userGotItRight}
            onClick={() => !checked && setSelected(index)}
          />
        ))}
      </div>
    </div>
  );
}