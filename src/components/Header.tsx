"use client";

import Link from "next/link";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white/80 border-b border-border/50 sticky top-0 z-50 backdrop-blur-xl shadow-lg shadow-primary/5">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Leaf className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-200" />
            <span className="text-xl font-bold text-primary tracking-tight">
              Eco_Chain
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="/upload"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Upload
            </Link>
            <Link
              href="/leaderboard"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Leaderboard
            </Link>
            <Link
              href="/profile"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Profile
            </Link>
          </nav>

          {/* Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-green-600 hover:from-primary/90 hover:to-green-700 shadow-lg"
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
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-4">
            <Link href="/upload" className="block text-muted-foreground hover:text-primary">
              Upload
            </Link>
            <Link href="/leaderboard" className="block text-muted-foreground hover:text-primary">
              Leaderboard
            </Link>
            <Link href="/profile" className="block text-muted-foreground hover:text-primary">
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
