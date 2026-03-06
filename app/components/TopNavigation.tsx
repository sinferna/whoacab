"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "../assets/whoacab-logo.png";
import { useAuth } from "../lib/hooks/useAuth";
import { useState } from "react";
import SideMenu from "./SideMenu";

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
  const { user } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full bg-[#9588FF] z-40">
        <div className="w-full px-8 flex items-center justify-between">
          <Image src={logo} alt="Whoacab logo" width={148} height={40} quality={75} />
          <div className="flex gap-8 mt-1 text-2xl items-center">
            {navItems.map((item) => (
              <div
                key={item.page}
                className="flex flex-col items-center cursor-pointer"
                onClick={() => {
                  if (item.page === "menu") {
                    setMenuOpen(true);
                  } else {
                    router.push(item.href);
                  }
                }}
              >
                <span>{item.icon}</span>
                <div className={`w-2 h-[4] mt-[2px] ${item.page === activePage ? "rounded-t-full bg-white/100" : ""}`} />
              </div>
            ))}
          </div>
        </div>
      </nav>
      <SideMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}