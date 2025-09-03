import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-white shadow-inner mt-8">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Logo / Name */}
        <div className="text-lg font-semibold text-green-700">
          Eco_Chain 🌱
        </div>

        {/* Links */}
        <div className="flex gap-6 text-sm text-gray-600">
          <Link href="/about" className="hover:text-green-600">
            About
          </Link>
          <Link href="/contact" className="hover:text-green-600">
            Contact
          </Link>
          <Link href="/privacy" className="hover:text-green-600">
            Privacy Policy
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Eco_Chain. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
