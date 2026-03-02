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