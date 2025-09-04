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
    <header className="bg-white/90 border-b border-border/50 backdrop-blur-xl shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo and Navigation */}
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold text-primary">Eco_Chain</span>
              <span className="ml-1 text-xl">🌱</span>
            </Link>
          </div>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                  isActive(item.href)
                    ? "bg-primary/10 text-primary"
                    : "text-gray-700 hover:text-primary hover:bg-primary/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* Mobile Navigation - Using Dock for mobile */}
          <div className="md:hidden">
            <Dock orientation="horizontal" className="bg-white/50 shadow-sm p-1 flex gap-2 items-center rounded-full">
              {navItems.map((item) => (
                <DockIcon key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "text-xs font-medium px-3 py-1 rounded-full transition-colors",
                      isActive(item.href)
                        ? "bg-primary/20 text-primary"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
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
            className="w-full bg-green-50 rounded-md text-green-800 font-semibold px-4 py-1.5"
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
