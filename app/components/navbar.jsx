"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Github } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="border-b sticky">
      <div className="container mx-auto mr-auto px-0 py-3 flex items-center justify-between ">
        <Link href="/" className="flex items-center gap-2">
          <Github className="h-6 w-6" />
          <span className="font-semibold text-lg">GitHub Search</span>
        </Link>

        {pathname !== "/" ? (
          <nav className="flex items-center">
            <Link href="/" passHref>
              <button
                type="button"
                className="text-[#BE5B50] hover:text-white border border-[#BE5B50] hover:bg-[#8A2D3B] font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 cursor-pointer"
              >
                Back to Home
              </button>
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
