import { Geist, Geist_Mono, Gluten, Instrument_Sans } from "next/font/google";

export const difficultyBadgeStyles = {
  wrapper: "flex justify-center",
  badge: "bg-[#9588ff] rounded-t-full px-4 pt-6 pb-2 mt-4 text-center shadow-md",
  difficulty: "text-4xl font-bold text-red-500 drop-shadow-md/85",
  label: "text-white text-xl",
};

export const wordCardStyles = {
  base: "bg-[#D9D4FF] rounded-2xl p-4 px-6 mx-2 border-b-3 border border-[#9588ff]",
  header: "flex justify-between items-center",
  word: "text-2xl text-black font-serif font-bold",
  phonetic: "text-black font-serif",
  definition: "text-m mt-4 text-black font-serif",
};

export const optionStyles = {
  // wrapper
  base: "group flex items-center gap-3 rounded-lg border border-b-3 p-1 cursor-pointer select-none transition-all duration-150 ease-out shadow-sm",
  baseChecked: "flex items-center gap-3 rounded-lg border border-b-3 p-1 cursor-default select-none transition-all duration-150 ease-out shadow-sm",
  idle: "bg-white border-[#AAAAAA] text-black",
  idleHover: "bg-white border-[#AAAAAA] text-black hover:bg-[#ffefd8] hover:border-[#FF9600]",
  selected: "bg-[#ffefd8] border-[#FF9600] text-black",
  correct: "bg-[#E1FEE9] border-[#74BF6A] text-black",
  wrong: "bg-[#FFE5E5] border-[#F45050] text-black",
  pressed: "translate-y-[2px] border-b-1",

  // badge
  badgeBase: "w-8 ml-2 aspect-square flex-shrink-0 rounded-full border flex items-center justify-center text-m transition-all duration-150",
  badgeIdle: "border-[#AAAAAA] bg-white text-[#888] group-hover:border-[#FF9600] group-hover:text-[#FF9600]",
  badgeIdleHover: "border-[#AAAAAA] bg-white text-[#888] group-hover:border-[#FF9600] group-hover:text-[#FF9600]",
  badgeSelected: "border-[#FF9600] bg-white",
  badgeCorrect: "border-[#74BF6A] bg-white",
  badgeWrong: "border-[#F45050] bg-white",
};

export const checkButtonStyles = {
  base: "w-50 p-1 text-lg rounded-full border border-[#6F5DFF] bg-[#9588FF] text-white cursor-pointer select-none transition-all duration-150 ease-out hover:bg-[#A99EFF]",
  pressed: "translate-y-[2px]",
  checked: "w-50 p-1 text-lg rounded-full border border-[#6F5DFF] bg-[#9588FF] text-white cursor-default select-none",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const gluten = Gluten({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});