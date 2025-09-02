import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Link from "next/link";
import { Header } from "@/src/components/Header"; // <-- import your Header

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EcoCommerce - Waste to Rewards",
  description: "Turn your waste into blockchain rewards",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-eco-50 to-blue-50 flex flex-col">
            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="flex-1">{children}</main>

            {/* Footer */}
            <footer className="bg-white border-t border-gray-200 shadow-inner">
              <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
                <p>© {new Date().getFullYear()} EcoCommerce. All rights reserved.</p>
                <div className="flex gap-4 mt-2 md:mt-0">
                  <Link href="/about" className="hover:text-green-600">
                    About
                  </Link>
                  <Link href="/contact" className="hover:text-green-600">
                    Contact
                  </Link>
                  <Link href="/privacy" className="hover:text-green-600">
                    Privacy
                  </Link>
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}

