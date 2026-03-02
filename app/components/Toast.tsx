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
    <div className={`${instrumentSans.className} fixed bottom-32 left-1/2 -translate-x-1/2 text-red-500 text-sm px-4 py-2`}>
      {message}
    </div>
  );
}