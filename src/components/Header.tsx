"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { Marquee } from "@/src/components/magicui/marquee"; // <-- import your Marquee

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-white/80 border-b border-border/50 backdrop-blur-xl shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left Navigation */}
          <nav className="flex items-center space-x-4">
            <Link
              href="/upload"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary/5",
                isActive("/upload")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Upload
            </Link>
            <Link
              href="/leaderboard"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary/5",
                isActive("/leaderboard")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Leaderboard
            </Link>
            <Link
              href="/profile"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-primary/5",
                isActive("/profile")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              Profile
            </Link>
          </nav>

          {/* Center Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Leaf className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-200" />
            <span className="text-2xl font-bold text-primary tracking-tight">
              Eco_Chain
            </span>
          </Link>

          {/* Right Auth Buttons */}
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold shadow-md hover:brightness-110 transition-all"
            >
              Get Started
            </Link>
          </div>
        </div>

        {/* 🌟 Marquee Section */}
        <Marquee
          className="mt-2 bg-green-50 rounded-md text-green-800 font-semibold px-2 py-1"
          repeat={3}
          pauseOnHover
        >
          <span>♻️ Reduce Waste</span>
          <span>🌱 Recycle</span>
          <span>💡 Earn Rewards</span>
          <span>🚀 Join Eco_Chain</span>
        </Marquee>
      </div>
    </header>
  );
}
