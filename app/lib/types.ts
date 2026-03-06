export interface Quiz {
  id: number;
  word_id: string;
  options: string[];
  correctIndex: number;
}

export interface Word {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
  difficulty: Difficulty;
}

export type Difficulty = "EASY" | "MEDIUM" | "HARD";

export interface PointsResult {
  earned: number;
  difficulty: Difficulty;
  streakDays?: number;
  correct: boolean;
}