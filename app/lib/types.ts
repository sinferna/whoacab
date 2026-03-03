export interface Quiz {
  options: string[];
  correctIndex: number;
}

export interface Word {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
}

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface PointsResult {
  earned: number;
  difficulty: Difficulty;
  streakDays?: number;
  correct: boolean;
}