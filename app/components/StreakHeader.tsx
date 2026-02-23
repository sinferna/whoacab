import { instrumentSans } from "../layout";

interface Props {
  streak: number;
  progress: number; // 0–1
}

export default function StreakHeader({ streak, progress }: Props) {
  return (
    <div className="mb-4">
      <p className={`text-sm font-semibold text-[#9588FF] ${instrumentSans}`}>
        {streak} DAY STREAK
      </p>
      <div className="w-full h-5 bg-gray-300 rounded mt-1">
        <div
          className="h-5 bg-yellow-400 rounded"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}