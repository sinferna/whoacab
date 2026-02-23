interface Props {
  difficulty: "EASY" | "MEDIUM" | "HARD";
}

export default function DifficultyBadge({ difficulty }: Props) {
  return (
    <div className="flex justify-center my-6">
      <div className="bg-[#9588ff] rounded-full px-10 py-6 text-center shadow-md">
        <h1 className="text-3xl font-bold text-red-500">{difficulty}</h1>
        <p className="text-black font-semibold">WORD OF THE DAY</p>
      </div>
    </div>
  );
}