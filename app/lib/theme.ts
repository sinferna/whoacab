import { Geist, Geist_Mono, Gluten, Instrument_Sans } from "next/font/google";

export const optionStyles = {
  // wrapper
  base: "group flex items-center gap-3 rounded-lg border border-b-3 p-2 cursor-pointer select-none transition-all duration-150 ease-out shadow-sm",
  baseChecked: "flex items-center gap-3 rounded-lg border border-b-3 p-2 cursor-default select-none transition-all duration-150 ease-out shadow-sm",
  idle: "bg-white border-[#AAAAAA] text-black",
  idleHover: "bg-white border-[#AAAAAA] text-black hover:bg-[#ffefd8] hover:border-[#FF9600]",
  selected: "bg-[#ffefd8] border-[#FF9600] text-black",
  correct: "bg-[#F0FFF4] border-[#50C341] text-black",
  wrong: "bg-[#FFF5F5] border-[#FF4C46] text-black",
  pressed: "translate-y-[2px] border-b-1",

  // badge
  badgeBase: "w-10 aspect-square flex-shrink-0 rounded-full border flex items-center justify-center text-m transition-all duration-150 mt-1",
  badgeIdle: "border-[#AAAAAA] bg-white text-[#888] group-hover:border-[#FF9600] group-hover:text-[#FF9600]",
  badgeIdleHover: "border-[#AAAAAA] bg-white text-[#888] group-hover:border-[#FF9600] group-hover:text-[#FF9600]",
  badgeSelected: "border-[#FF9600] bg-white",
  badgeCorrect: "border-[#50C341] bg-white",
  badgeWrong: "border-[#FF4C46] bg-white",
};

export const checkButtonStyles = {
  base: "w-60 mt-8 p-2 text-lg rounded-full border border-[#6F5DFF] bg-[#9588FF] text-white cursor-pointer select-none transition-all duration-150 ease-out",
  pressed: "translate-y-[2px]",
  checked: "w-60 mt-8 p-2 text-lg rounded-full border border-[#6F5DFF] bg-[#9588FF] text-white cursor-default select-none opacity-90",
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