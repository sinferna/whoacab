interface Props {
  word: string;
  phonetic: string;
  partOfSpeech: string;
  definition: string;
}

export default function WordCard({
  word,
  phonetic,
  partOfSpeech,
  definition,
}: Props) {
  return (
    <div className="bg-[#D9D4FF] rounded-2xl p-6 border-b-3 border border-[#9588ff]">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl text-black font-serif font-bold">{word}</h2>
        <span className="text-black font-serif">
          {phonetic} <em>{partOfSpeech}</em>
        </span>
      </div>
      <p className="text-lg mt-4 text-black font-serif">{definition}</p>
    </div>
  );
}