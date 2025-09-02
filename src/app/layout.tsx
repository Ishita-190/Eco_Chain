import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "@/src/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "EcoCommerce - Waste to Rewards",
  description: "Turn your waste into blockchain rewards",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-green-50 via-green-100 to-green-200`}>
        <Providers>
          {/* Header */}
          <Header />

          {/* Main content */}
          <main className="min-h-screen">{children}</main>

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
