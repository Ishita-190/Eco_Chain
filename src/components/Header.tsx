import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-border not-prose">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Brand (click goes home) */}
          <Link
            href="/"
            className="text-2xl font-bold tracking-tight text-green-900 no-underline hover:opacity-85"
          >
            Eco_Chain
          </Link>

          {/* Right: Nav (horizontal) */}
          <nav className="flex items-center gap-8">
            <Link
              href="/upload"
              className="no-underline text-lg text-gray-800 hover:text-green-700 visited:text-gray-800"
            >
              Upload
            </Link>
            <Link
              href="/leaderboard"
              className="no-underline text-lg text-gray-800 hover:text-green-700 visited:text-gray-800"
            >
              Leaderboard
            </Link>
            <Link
              href="/profile"
              className="no-underline text-lg text-gray-800 hover:text-green-700 visited:text-gray-800"
            >
              Profile
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
