interface Props {
  label: string;
  text: string;
}

export default function OptionItem({ label, text }: Props) {
  return (
    <div className="flex items-start text-black gap-3 border rounded-lg p-4 bg-white shadow-sm cursor-pointer hover:bg-gray-200">
      <div className="w-5 h-5 border rounded-full mt-1" />
      <p>
        {label} {text}
      </p>
    </div>
  );
}