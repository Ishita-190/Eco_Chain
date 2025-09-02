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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased bg-gradient-to-br from-green-100 to-green-300`}>
        <Providers>
          {/* Navbar */}
          <header className="bg-green-50 shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link
                href="/"
                className="text-2xl font-bold text-green-800 hover:text-green-700 transition-colors"
              >
                EcoCommerce 🌍
              </Link>
              <nav className="flex gap-6 text-green-800 font-medium">
                <Link
                  href="/upload"
                  className="hover:text-green-700 transition-colors"
                >
                  Upload
                </Link>
                <Link
                  href="/leaderboard"
                  className="hover:text-green-700 transition-colors"
                >
                  Leaderboard
                </Link>
                <Link
                  href="/profile"
                  className="hover:text-green-700 transition-colors"
                >
                  Profile
                </Link>
              </nav>
            </div>
          </header>

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
