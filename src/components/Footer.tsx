import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Logo / Name */}
        <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Eco_Chain 🌱
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm">
          <Link href="/about" className="hover:text-emerald-400 transition-colors">
            About
          </Link>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
            Privacy Policy
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} Eco_Chain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
