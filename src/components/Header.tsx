"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePageTransition } from "@/src/hooks/usePageTransition";
import { cn } from "@/src/lib/utils";
import NotificationButton from "./NotificationButton";

export function Header() {
  const pathname = usePathname();
  const { navigateTo, isTransitioning } = usePageTransition();
  const isActive = (path: string) => pathname === path;

  const navItems = [
    { label: "Upload", href: "/upload" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Profile", href: "/profile" },
  ];

  return (
    <header style={{
      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(240, 253, 244, 0.95))',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(34, 197, 94, 0.2)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px' }}>
          {/* Logo */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <span style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#059669',
                fontFamily: 'Outfit, sans-serif'
              }}>
                Eco_Chain
              </span>
              <span style={{ marginLeft: '8px', fontSize: '24px' }}>🌱</span>
            </div>
          </Link>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <nav style={{ display: 'flex', gap: '8px' }}>
              {navItems.map((item) => (
                <button
                  key={item.href}
                  onClick={() => navigateTo(item.href)}
                  disabled={isTransitioning}
                  style={{
                    padding: '12px 20px',
                    borderRadius: '12px',
                    fontSize: '16px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    backgroundColor: isActive(item.href) ? '#059669' : 'transparent',
                    color: isActive(item.href) ? 'white' : '#374151',
                    fontFamily: 'Inter, sans-serif',
                    transform: 'translateY(0)',
                    boxShadow: isActive(item.href) ? '0 4px 12px rgba(5, 150, 105, 0.3)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.backgroundColor = '#f0fdf4';
                      e.currentTarget.style.color = '#059669';
                      e.currentTarget.style.transform = 'translateY(-1px)';
                      e.currentTarget.style.boxShadow = '0 2px 8px rgba(5, 150, 105, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive(item.href)) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#374151';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <NotificationButton />
          </div>
        </div>
      </div>
    </header>
  );
}
