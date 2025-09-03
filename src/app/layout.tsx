// app/layout.tsx
import "./globals.css";
import { Inter, Space_Grotesk } from "next/font/google";
import { Footer } from "@/src/components/Footer";
import { Header } from "@/src/components/Header";

import { Toaster } from "@/src/components/ui/toaster";
import { Toaster as Sonner } from "@/src/components/ui/sonner";
import { TooltipProvider } from "@/src/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Fonts
const inter = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: "700" });

const queryClient = new QueryClient();

export const metadata = {
  title: "EcoCommerce - Waste to Rewards",
  description: "Turn your waste into blockchain rewards",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${spaceGrotesk.className}`}>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />

            {/* Full-page flex container */}
            <div className="flex flex-col min-h-screen bg-gradient-to-br from-eco-50 to-blue-50">
              <Header />

              {/* Main content */}
              <main className="flex flex-col flex-1 items-center justify-center w-full">
                {children}
              </main>

              <Footer />
            </div>
          </TooltipProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
