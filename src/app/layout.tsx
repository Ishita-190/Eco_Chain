import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EcoCommerce - Waste to Rewards',
  description: 'Turn your waste into blockchain rewards',
  manifest: '/manifest.json',
};

import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-md bg-background">
      <h1 className="text-2xl font-display font-bold text-gradient">
        EcoCommerce
      </h1>

      {/* Right side: Navigation links */}
      <nav className="flex gap-8">
        <Link
          href="/upload"
          className="font-medium text-lg hover:text-primary transition-colors no-underline"
        >
          Upload
        </Link>
        <Link
          href="/leaderboard"
          className="font-medium text-lg hover:text-primary transition-colors no-underline"
        >
          Leaderboard
        </Link>
        <Link
          href="/profile"
          className="font-medium text-lg hover:text-primary transition-colors no-underline"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}

          {/* Main content */}
          <main className="min-h-screen">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-green-50 border-t border-green-200 py-8 mt-12">
            <div className="max-w-6xl mx-auto text-center text-green-800">
              © {new Date().getFullYear()} EcoCommerce. Building a sustainable future.
            </div>
          </footer>
        </Providers>
      </body>
    </html>
  );
}

