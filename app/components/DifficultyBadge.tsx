import { gluten, difficultyBadgeStyles } from "../lib/theme";
import { Difficulty } from "../lib/types";

interface Props {
  difficulty: Difficulty;
}

export default function DifficultyBadge({ difficulty }: Props) {
  return (
    <div className={difficultyBadgeStyles.wrapper}>
      <div className={difficultyBadgeStyles.badge}>
        <h1 className={`${difficultyBadgeStyles.difficulty} ${gluten.className}`}>{difficulty}</h1>
        <p className={`${difficultyBadgeStyles.label} ${gluten.className}`}>WORD OF THE DAY</p>
      </div>
    </div>
  );
}