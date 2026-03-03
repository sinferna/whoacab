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
    <div className="mt-8">
      <h3 className={`text-center text-black text-xl mb-1 ${gluten.className}`}>
        Which sentence uses it correctly?
      </h3>

      <div className="space-y-2">
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