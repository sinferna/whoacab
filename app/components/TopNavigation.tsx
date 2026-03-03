"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../assets/whoacab-logo.png";

interface NavItem {
  icon: string;
  page: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: "🏠", page: "home",        href: "/"            },
  { icon: "📊", page: "leaderboard", href: "/leaderboard" },
  { icon: "👤", page: "profile",     href: "/profile"     },
  { icon: "☰",  page: "menu",        href: "/menu"        },
];

interface Props {
  activePage?: string;
}

export default function TopNavigation({ activePage = "home" }: Props) {
  const router = useRouter();

  return (
    <nav className="fixed top-0 w-full bg-[#9588FF] py-1 z-40">
      <div className="w-full px-8 flex items-center justify-between">
        <Image src={logo} alt="Whoacab logo" width={148} height={40} quality={100} />
        <div className="flex gap-8 mt-1 text-2xl items-center">
          {navItems.map((item) => (
        <div
          key={item.page}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => router.push(item.href)}
        >
          <span>{item.icon}</span>
          <div className={`w-2 h-[4] mt-[2px] ${item.page === activePage ? "rounded-t-full bg-white/100" : ""}`} />
        </div>
        ))}
        </div>
      </div>
    </nav>
  );
}