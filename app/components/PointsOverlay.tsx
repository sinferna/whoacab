"use client";

import { useEffect, useRef, useState } from "react";
import { gluten, instrumentSans } from "../lib/theme";

interface Props {
  points: number;
  onClose: () => void;
}

export default function PointsOverlay({ points, onClose }: Props) {
  const [displayedPoints, setDisplayedPoints] = useState(0);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayedPoints(Math.round(eased * points));
      if (progress < 1) animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [points]);

  return (
    <div
      className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
        <p className={`text-white text-3xl ${gluten.className}`}>
					You earned
				</p>
				<div className="flex items-baseline gap-3">
					<p className={`text-[#FF9600] text-8xl font-bold ${gluten.className}`}>
						{displayedPoints}
					</p>
					<p className={`text-white text-3xl tracking-widest ${gluten.className}`}>
						points
					</p>
				</div>

        <div className="mt-4 flex flex-col items-center gap-3">
          <p className={`text-white text-m mb-2 text-center max-w-[400px] ${instrumentSans.className}`}>
            Login to start tracking your points and streaks, and compete on the global leaderboard!
            </p>
          <button
            className={`px-8 py-3 rounded-full bg-[#9588FF] border border-[#6F5DFF] border-b-3 text-white text-lg cursor-pointer hover:bg-[#A99EFF] transition-colors ${gluten.className}`}
            onClick={() => {/* hook up login later */}}
          >
            LOGIN
          </button>
          <p className={`text-white/80 text-xs mt-6 ${instrumentSans.className}`}>
            Click anywhere to close
            </p>
        </div>
      </div>
    </div>
  );
}