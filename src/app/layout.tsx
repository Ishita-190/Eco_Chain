import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { Providers } from "./providers";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";

// Body font
const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "700", variable: "--font-space-grotesk" });

export const metadata = {
  title: "EcoCommerce - Waste to Rewards",
  description: "Turn your waste into blockchain rewards",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans relative">
        <Providers>

          <div className="flex flex-col min-h-screen bg-gradient-to-br from-eco-50 to-blue-50">
            {/* Header */}
            <Header />

            {/* Main content */}
            <main className="flex flex-col flex-1 items-center justify-center w-full">
              {children}
            </main>

            {/* Footer */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}

