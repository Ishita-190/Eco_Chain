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
      <body className={`${inter.className} antialiased`}>
        <Providers>
          {/* Navbar */}
          <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
              <Link href="/" className="text-2xl font-bold text-green-700 hover:text-green-600 transition-colors">
                EcoCommerce 🌍
              </Link>
              <nav className="flex gap-6 text-gray-700 font-medium">
                <Link href="/upload" className="hover:text-green-600 transition-colors">
                  Upload
                </Link>
                <Link href="/leaderboard" className="hover:text-green-600 transition-colors">
                  Leaderboard
                </Link>
                <Link href="/profile" className="hover:text-green-600 transition-colors">
                  Profile
                </Link>
              </nav>
            </div>
          </header>

          {/* Main content */}
          <main className="min-h-screen bg-gradient-to-br from-eco-50 to-blue-50">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
