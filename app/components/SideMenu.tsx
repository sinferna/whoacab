"use client";

import { useRouter } from "next/navigation";
import { gluten, instrumentSans } from "../lib/theme";
import { useAuth } from "../lib/hooks/useAuth";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function SideMenu({ isOpen, onClose }: Props) {
  const router = useRouter();
  const { user } = useAuth();

  const navigate = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <>
      {/* backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={onClose}
        />
      )}

      {/* drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end mt-1 mr-8">
          <span className="text-2xl text-black cursor-pointer" onClick={onClose}>✕</span>
        </div>

        <div className="flex flex-col gap-2 px-6 pt-4">
          {user ? (
            <>
              <p className={`text-[#AAAAAA] text-xs mb-2 ${instrumentSans.className}`}>
                Signed in as {user.email}
              </p>
              <MenuItem label="About" onClick={() => navigate("/About")} />
              <MenuItem label="Sign Out" onClick={async () => {
                const { supabase } = await import("../lib/supabase");
                await supabase.auth.signOut();
                onClose();
              }} />
            </>
          ) : (
            <>
              <MenuItem label="Login" onClick={() => navigate("/login")} />
              <MenuItem label="Sign Up" onClick={() => navigate("/login?signup=true")} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

function MenuItem({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      className={`w-full text-left px-4 py-3 rounded-xl text-black border border-[#FF9600]
         border-b-2 hover:bg-[#F5F3FF] cursor-pointer hover:border-[#9588FF] transition-all uppercase ${gluten.className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}