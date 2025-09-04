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

  const dockItems = [
    { label: "Eco_Chain", href: "/" },
    { label: "Upload", href: "/upload" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <header className="bg-white/80 border-b border-border/50 backdrop-blur-xl shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        {/* Dock Navigation */}
        <Dock orientation="horizontal" className="bg-white/50 shadow-md p-2 mt-2 flex gap-6 items-center">
          {dockItems.map((item) => (
            <DockIcon key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium px-4 py-2 rounded-full transition-colors",
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

        {/* 🌟 Marquee Section */}
        <div className="mt-4">
          <Marquee
            pauseOnHover
            repeat={5}
            style={{ "--duration": "20s" } as React.CSSProperties}
            className="w-full bg-green-50 rounded-md text-green-800 font-semibold px-4 py-2"
          >
            {marqueeItems.map((text, i) => (
              <span key={i} className="mx-8">
                {text}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </header>
  );
}
