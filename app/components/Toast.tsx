"use client";

import { useEffect } from "react";
import { instrumentSans } from "../lib/theme";

interface Props {
  message: string;
  visible: boolean;
}

export default function Toast({ message, visible }: Props) {
  if (!visible) return null;

  return (
    <div className={`${instrumentSans.className} text-red-500 text-sm px-4 py-2`}>
      {message}
    </div>
  );
}