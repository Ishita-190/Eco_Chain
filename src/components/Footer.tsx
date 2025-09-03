import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 border-t border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center md:justify-between md:space-x-8 space-y-6 md:space-y-0">
        
        {/* Logo / Name */}
        <div className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400">
          Eco_Chain 🌱
        </div>

        {/* Links */}
        <div className="flex gap-8 text-sm">
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

        {/* Copyright */}
        <p className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} Eco_Chain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
