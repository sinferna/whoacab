"use client";

import { useState } from "react";
import { gluten, checkButtonStyles } from "../lib/theme";

interface Props {
  label: string;
  onClick: () => void;
}

export default function PrimaryButton({ label, onClick }: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      className={`${checkButtonStyles.base} ${pressed ? checkButtonStyles.pressed : ""} ${gluten.className}`}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
    >
      {label}
    </button>
  );
}