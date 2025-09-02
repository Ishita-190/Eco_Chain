import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";

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
          {/* Normal flow (no min-h-screen) */}
          <div className="flex flex-col bg-gradient-to-br from-eco-50 to-blue-50">
            {/* Header */}
            <Header />

            {/* Main content */}
            <main>{children}</main>

            {/* Footer appears just below content */}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
