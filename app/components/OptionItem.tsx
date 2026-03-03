"use client";

import { useState } from "react";
import { instrumentSans, optionStyles } from "../lib/theme";

interface Props {
  label: string;
  text: string;
  isSelected?: boolean;
  isCorrect?: boolean;
  isWrong?: boolean;
  checked?: boolean;
  showCorrectFill?: boolean;
  onClick?: () => void;
}

export default function OptionItem({
  label,
  text,
  isSelected = false,
  isCorrect = false,
  isWrong = false,
  checked = false,
  showCorrectFill = false,
  onClick,
}: Props) {
  const [pressed, setPressed] = useState(false);

  const wrapperState = isCorrect
    ? optionStyles.correct
    : isWrong
    ? optionStyles.wrong
    : isSelected
    ? optionStyles.selected
    : checked
    ? optionStyles.idle
    : optionStyles.idleHover;

  const badgeState = isCorrect
    ? optionStyles.badgeCorrect
    : isWrong
    ? optionStyles.badgeWrong
    : isSelected
    ? optionStyles.badgeSelected
    : checked
    ? optionStyles.badgeIdle
    : optionStyles.badgeIdleHover;

  return (
    <div
      className={`${checked ? optionStyles.baseChecked : optionStyles.base} ${wrapperState} ${pressed && !checked ? optionStyles.pressed : ""}`}
      onClick={onClick}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
    >
      <div className={`${optionStyles.badgeBase} ${badgeState}`}>
        {isCorrect && showCorrectFill && <div className="w-6 h-6 rounded-full bg-[#50C341]" />}
        {isWrong && <div className="w-6 h-6 rounded-full bg-[#FF4C46]" />}
        {isSelected && !isCorrect && !isWrong && <div className="w-6 h-6 rounded-full bg-[#FF9600]" />}
      </div>
      <p className={`${instrumentSans.className} text-base font-m px-0.5`}>
        <span>{label}</span> {text}
      </p>
    </div>
  );
}