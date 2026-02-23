import { instrumentSans } from "../layout";

interface Props {
  label: string;
  text: string;
}

export default function OptionItem({ label, text }: Props) {
  return (
    <div className="flex items-start text-black gap-3 border rounded-lg border-b-3 border-[#AAAAAA] p-2 bg-white shadow-sm cursor-pointer hover:bg-gray-200">
      <div className="w-10 aspect-square border-1 border-[#AAAAAA] rounded-full flex-shrink-0 mt-1" />
      <p className={`text-m ${instrumentSans.className}`}>
        {label} {text}
      </p>
    </div>
  );
}