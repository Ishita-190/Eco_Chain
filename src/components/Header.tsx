"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/src/lib/utils";
import { Marquee } from "@/src/components/magicui/marquee";
import { Dock, DockIcon } from "@/src/components/magicui/dock";

export function Header() {
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const marqueeItems = [
    "♻️ Reduce Waste",
    "🌱 Recycle",
    "💡 Earn Rewards",
    "🚀 Join Eco_Chain",
    "🌿 Eco_Chain",
  ];

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Upload", href: "/upload" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <header className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Navigation */}
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-300 group-hover:from-white group-hover:to-green-200 transition-all duration-300">Eco_Chain</span>
              <span className="ml-2 text-xl group-hover:scale-110 transition-transform duration-300">🌱</span>
            </Link>
          </div>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-white/20 text-white"
                    : "text-green-100 hover:text-white hover:bg-white/10"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Navigation - Using Dock for mobile */}
          <div className="md:hidden">
            <Dock orientation="horizontal" className="bg-emerald-800/70 shadow-md p-1 flex gap-2 items-center rounded-full border border-emerald-700/50">
              {navItems.map((item) => (
                <DockIcon key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-xs font-medium px-3 py-1 rounded-full transition-colors",
                      isActive(item.href)
                        ? "bg-white/20 text-white"
                        : "text-green-100 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {item.label}
                  </Link>
                </DockIcon>
              ))}
            </Dock>
          </div>
        </div>

        {/* 🌟 Marquee Section */}
        <div className="py-2">
          <Marquee
            pauseOnHover
            repeat={5}
            style={{ "--duration": "20s" } as React.CSSProperties}
            className="w-full bg-emerald-800/30 rounded-md text-green-100 font-semibold px-4 py-1.5 border border-emerald-700/30"
          >
            {marqueeItems.map((text, i) => (
              <span key={i} className="mx-6">
                {text}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </header>
  );
}
