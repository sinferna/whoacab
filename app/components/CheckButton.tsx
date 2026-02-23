import { gluten } from "../layout";

export default function CheckButton() {
  return (
    <button className={`w-60 mt-8 p-2 text-lg rounded-full border-[#6F5DFF] border-b-3 bg-[#9588FF] text-white ${gluten.className}`}>
        CHECK
    </button>
  );
}