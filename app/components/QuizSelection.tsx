import OptionItem from "./OptionItem";
import { gluten } from "../layout";

export default function QuizSelection() {
  const options = [
    "She gave a laconic speech that lasted over two hours and covered every detail.",
    "The laconic painting was filled with bright and vibrant colors.",
    "They celebrated laconically with loud music and long speeches.",
    "His laconic reply of “Fine.” ended the conversation quickly.",
  ];

  return (
    <div className="mt-8">
      <h3 className={`text-center text-black text-xl mb-3 ${gluten.className}`}>
        WHICH SENTENCE USES IT CORRECTLY?
      </h3>

      <div className="space-y-2">
        {options.map((option, index) => (
          <OptionItem key={index} label={`${String.fromCharCode(97 + index)})`} text={option} />
        ))}
      </div>
    </div>
  );
}