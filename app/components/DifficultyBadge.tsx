import { gluten } from "../layout";

interface Props {
  difficulty: "EASY" | "MEDIUM" | "HARD";
}

export default function DifficultyBadge({ difficulty }: Props) {
  return (
    <div className="flex justify-center">
      <div className="bg-[#9588ff] rounded-t-full px-10 pt-8 pb-4 text-center shadow-md">
        <h1 className={`text-5xl font-bold text-red-500 drop-shadow-md/85 ${gluten.className}`}>{difficulty}</h1>
        <p className={`text-white text-xl ${gluten.className}`}>WORD OF THE DAY</p>
      </div>
    </div>
  );
}