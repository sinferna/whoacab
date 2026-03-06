import { useEffect, useState } from "react";
import { supabase } from "../supabase";
import { Word, Quiz } from "../types";

export function useWord() {
  const [word, setWord] = useState<Word | null>(null);
  const [question, setQuestion] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetch() {
      const { data: wordData, error  } = await supabase
        .from("words")
        .select("*")
        .limit(1)
        .single();


console.log(wordData, error);
      const { data: questionData } = await supabase
        .from("questions")
        .select("*")
        .eq("word_id", wordData.id)
        .single();

      setWord({
        word: wordData.word,
        phonetic: wordData.phonetic,
        partOfSpeech: wordData.part_of_speech,
        definition: wordData.definition,
        difficulty: wordData.difficulty,
      });

      setQuestion({
        id: questionData.id,
        word_id: questionData.word_id,
        options: [
          questionData.option_1,
          questionData.option_2,
          questionData.option_3,
          questionData.option_4,
        ],
        correctIndex: questionData.correct_index,
      });

      setLoading(false);
    }

    fetch();
  }, []);

  return { word, question, loading };
}