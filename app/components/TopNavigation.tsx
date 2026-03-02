import Image from "next/image";
import logo from "../assets/whoacab-logo.png";

export default function TopNavigation() {
  return (
    <nav className="fixed top-0 w-full bg-[#9588FF] py-2">
      <div className="w-full px-8 py-1 flex items-center justify-between">
        <Image src={logo} alt="Whoacab logo" width={120} height={20}/>
        <div className="flex gap-8 text-2xl flex justify-end">
          <span>🏠</span>
          <span>📊</span>
          <span>👤</span>
          <span>☰</span>
        </div>
      </div>
    </nav>
  );
}