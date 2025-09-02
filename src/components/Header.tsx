"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Header() {
  return (
    <header className="bg-background/80 border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl shadow-lg shadow-primary/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Leaf className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-200" />
            <span className="text-2xl font-bold text-primary tracking-tight">
              Eco_Chain
            </span>
          </Link>

          {/* Navigation (always horizontal) */}
          <nav className="flex items-center space-x-1">
            <Link
              href="/upload"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-primary/5 text-muted-foreground hover:text-primary"
              )}
            >
              Upload
            </Link>
            <Link
              href="/leaderboard"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-primary/5 text-muted-foreground hover:text-primary"
              )}
            >
              Leaderboard
            </Link>
            <Link
              href="/profile"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-primary/5 text-muted-foreground hover:text-primary"
              )}
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
