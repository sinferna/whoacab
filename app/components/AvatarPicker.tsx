"use client";

import { AVATARS } from "../lib/avatars";
import Image from "next/image";

interface Props {
  selected: string | null;
  onSelect: (url: string) => void;
}

export default function AvatarPicker({ selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-4 gap-3 w-full">
      {AVATARS.map((avatar) => (
        <div
          key={avatar.id}
          className={`rounded-full border-2 cursor-pointer overflow-hidden transition-all ${
            selected === avatar.url
              ? "border-[#9588FF] scale-110"
              : "border-[#AAAAAA] hover:border-[#9588FF]"
          }`}
          onClick={() => onSelect(avatar.url)}
        >
          <img src={avatar.url} alt={avatar.id} className="w-full h-full" />
        </div>
      ))}
    </div>
  );
}