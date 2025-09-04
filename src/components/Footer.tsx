import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center md:justify-between space-y-6 md:space-y-0">
        
        {/* Logo / Name */}
        <div className="flex items-center">
          <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
            Eco_Chain
          </div>
          <span className="ml-1 text-xl">🌱</span>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          <Link href="/about" className="hover:text-emerald-400 transition-colors px-2 py-1">
            About
          </Link>
          <Link href="/contact" className="hover:text-emerald-400 transition-colors px-2 py-1">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-emerald-400 transition-colors px-2 py-1">
            Privacy Policy
          </Link>
          <Link href="/feedback" className="hover:text-emerald-400 transition-colors px-2 py-1">
            Feedback
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} Eco_Chain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
