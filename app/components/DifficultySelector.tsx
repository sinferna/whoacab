"use client";

import { instrumentSans } from "../lib/theme";

interface Props {
  selected: string;
  onChange: (d: string) => void;
  disabled?: boolean;
}

const DIFFICULTIES = ["EASY", "MEDIUM", "HARD"];

const difficultyStyles: Record<string, string> = {
  EASY:   "bg-[#DCFCE7] border-[#22C55E] text-[#16A34A]",
  MEDIUM: "bg-[#FFF7ED] border-[#FF9600] text-[#FF9600]",
  HARD:   "bg-[#FEF2F2] border-[#EF4444] text-[#DC2626]",
};

export default function DifficultySelector({ selected, onChange, disabled = false }: Props) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <p className={`text-[#AAAAAA] text-xs uppercase tracking-wide ${instrumentSans.className}`}>
        Preferred Difficulty
      </p>
      <div className="flex gap-2">
        {DIFFICULTIES.map(d => (
          <button
            key={d}
            className={`flex-1 py-1.5 rounded-lg text-xs font-bold border-2 transition-all
              ${selected === d ? difficultyStyles[d] : "bg-white border-[#AAAAAA] text-[#AAAAAA]"}
              ${disabled ? "cursor-default opacity-70" : "cursor-pointer hover:opacity-90"}
              ${instrumentSans.className}`}
            onClick={() => !disabled && onChange(d)}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}