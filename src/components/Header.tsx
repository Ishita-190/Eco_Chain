"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Leaf, Scale, Menu, X } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  return (
    <header className="bg-background/80 border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl shadow-lg shadow-primary/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Nav (left aligned) */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              href="/upload"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-primary/5",
                isActive("/upload")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              Upload
            </Link>
            <Link
              href="/leaderboard"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-primary/5",
                isActive("/leaderboard")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              Leaderboard
            </Link>
            <Link
              href="/profile"
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:bg-primary/5",
                isActive("/profile")
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              Profile
            </Link>
          </nav>

          {/* Centered Logo with Leaf + Scale */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative flex items-center">
              <Leaf className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-200" />
              <Scale className="h-6 w-6 text-accent -ml-2 opacity-80 group-hover:rotate-6 transition-transform duration-300" />
            </div>
            <span className="text-2xl font-bold text-primary tracking-tight">
              Eco_Chain
            </span>
          </Link>

          {/* Auth Buttons (desktop) */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
              asChild
            >
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

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
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button className="w-full" asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
