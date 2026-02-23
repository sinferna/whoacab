interface Props {
  streak: number;
  progress: number; // 0–1
}

export default function StreakHeader({ streak, progress }: Props) {
  return (
    <div className="mb-4">
      <p className="text-sm font-semibold text-[#9588FF]">
        {streak} DAY STREAK
      </p>
      <div className="w-full h-3 bg-gray-300 rounded-full mt-2">
        <div
          className="h-3 bg-yellow-400 rounded-full"
          style={{ width: `${progress * 100}%` }}
        />
      </div>
    </div>
  );
}