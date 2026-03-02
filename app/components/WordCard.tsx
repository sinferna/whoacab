import { wordCardStyles } from "../lib/theme";
import { Word } from "../lib/types";

interface Props {
  word: Word;
}

export default function WordCard({ word }: Props) {
  return (
    <div className={wordCardStyles.base}>
      <div className={wordCardStyles.header}>
        <h2 className={wordCardStyles.word}>{word.word}</h2>
        <span className={wordCardStyles.phonetic}>{word.phonetic} <em>{word.partOfSpeech}</em></span>
      </div>
      <p className={wordCardStyles.definition}>{word.definition}</p>
    </div>
  );
}