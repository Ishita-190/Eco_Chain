import Link from "next/link";
import { Leaf, Mail, Phone, Globe, Heart, Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 text-white border-t border-green-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Section with Logo and Links */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1 flex flex-col items-center md:items-center">
            <div className="flex items-center justify-center mb-4">
              <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-teal-300">
                Eco_Chain
              </div>
              <span className="ml-2 text-2xl">🌱</span>
            </div>
            <p className="text-green-200 text-center md:text-center mb-4">
              Making our planet greener, one recycled item at a time.
            </p>
            <div className="flex space-x-4 mt-2">
              <Link href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Globe className="h-5 w-5 text-green-300" />
              </Link>
              <Link href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Mail className="h-5 w-5 text-green-300" />
              </Link>
              <Link href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors">
                <Heart className="h-5 w-5 text-green-300" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2 text-center">
              <li>
                <Link href="/" className="text-green-200 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-green-200 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-green-200 hover:text-white transition-colors">
                  Upload
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-green-200 hover:text-white transition-colors">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-2 text-center">
              <li>
                <Link href="/privacy" className="text-green-200 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-green-200 hover:text-white transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-green-200 hover:text-white transition-colors">
                  Feedback
                </Link>
              </li>
              <li>
                <Link href="#" className="text-green-200 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1 flex flex-col items-center">
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-green-200 mb-4 text-center">
              Join our newsletter for eco-tips and updates
            </p>
            <div className="flex w-full max-w-xs">
              <input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/10 text-white placeholder-green-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button className="bg-green-500 hover:bg-green-600 text-white rounded-r-lg px-4 transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="pt-8 border-t border-green-800 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center text-green-300 mb-4 md:mb-0">
            <Shield className="h-4 w-4 mr-2" />
            <span className="text-xs">Secured by blockchain technology</span>
          </div>
          <p className="text-sm text-green-300">
            © {new Date().getFullYear()} Eco_Chain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
