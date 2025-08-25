// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';

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
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen bg-gradient-to-br from-eco-50 to-blue-50">
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
