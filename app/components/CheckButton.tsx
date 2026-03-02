"use client";

import { useState } from "react";
import { gluten, checkButtonStyles } from "../lib/theme";

interface Props {
  onClick: () => void;
  checked?: boolean;
}

export default function CheckButton({ onClick, checked}: Props) {
  const [pressed, setPressed] = useState(false);

  return (
    <button
      className={`${checked ? checkButtonStyles.checked : `${checkButtonStyles.base} ${pressed ? checkButtonStyles.pressed : ""}`} ${gluten.className}`}
      style={{ borderBottomWidth: checked || pressed ? "1px" : "3px" }}
      onMouseUp={() => setPressed(false)}
      onMouseLeave={() => setPressed(false)}
      onClick={onClick}
      disabled={checked}
    >
      CHECK
    </button>
  );
}