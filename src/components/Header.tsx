"use client";

import Link from "next/link";
import { Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-primary/5 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link
              href="/upload"
              className="block text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Upload
            </Link>
            <Link
              href="/leaderboard"
              className="block text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Leaderboard
            </Link>
            <Link
              href="/profile"
              className="block text-muted-foreground hover:text-primary transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Profile
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
