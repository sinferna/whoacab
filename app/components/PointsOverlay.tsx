"use client";

import { useEffect, useRef, useState } from "react";
import { gluten, instrumentSans } from "../lib/theme";
import PrimaryButton from "./PrimaryButton";
import { useRouter } from "next/navigation";

interface Props {
  points: number;
  wordId: string;
  isLoggedIn: boolean;
  onClose: () => void;
}

export default function PointsOverlay({ points, wordId, isLoggedIn, onClose }: Props) {
  const [displayedPoints, setDisplayedPoints] = useState(0);
  const [showBottom, setShowBottom] = useState(false);
  const animFrameRef = useRef<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const duration = 1400;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedPoints(Math.round(eased * points));
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setShowBottom(true), 350);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [points]);

  return (
    <div
      className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
        <p className={`text-white text-3xl ${gluten.className}`}>You earned</p>

        <div className="flex items-baseline gap-4">
          <p className={`text-[#FF9600] text-8xl font-bold ${gluten.className}`}>
            {displayedPoints}
          </p>
          <p className={`text-[#9588FF] text-4xl tracking-widest ${gluten.className}`}>
            points
          </p>
        </div>

        <div
          className="mt-4 flex flex-col items-center gap-3 transition-all duration-700"
          style={{
            opacity: showBottom ? 1 : 0,
            transform: showBottom ? "translateY(0)" : "translateY(12px)",
          }}
        >
          {!isLoggedIn && (
            <>
              <p className={`text-white text-m mb-2 text-center max-w-[420px] ${instrumentSans.className}`}>
                Login to start tracking your points and streaks, and compete on the global leaderboard!
              </p>
              <PrimaryButton
                label="LOGIN"
                onClick={() => router.push(`/login?points=${points}&wordId=${wordId}`)}
              />
            </>
          )}
          <p className={`text-white/80 text-xs mt-6 ${instrumentSans.className}`}>
            Click anywhere to close
          </p>
        </div>
      </div>
    </div>
  );
}