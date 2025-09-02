"use client";

import Link from "next/link";
import { Leaf } from "lucide-react";
import { cn } from "@/src/lib/utils";

export function Header() {
  return (
    <header className="bg-background/80 border-b border-border/50 backdrop-blur-xl shadow-lg shadow-primary/5">
      <div className="container mx-auto px-6">
        <div className="relative flex items-center h-16">
          {/* Navigation (left for mobile) */}
          <nav className="hidden md:flex items-center space-x-1 absolute left-0">
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

          {/* Logo centered */}
          <div className="mx-auto flex items-center space-x-2">
            <Link href="/" className="flex items-center space-x-2 group">
              <Leaf className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-200" />
              <span className="text-2xl font-bold text-primary tracking-tight">
                Eco_Chain
              </span>
            </Link>
          </div>

          {/* Mobile nav (optional) */}
          <nav className="flex md:hidden items-center space-x-1 absolute right-0">
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
