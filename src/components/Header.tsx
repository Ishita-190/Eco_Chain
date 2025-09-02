import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 shadow-md bg-background">
      {/* Left: Logo */}
      <h1 className="text-2xl font-bold text-gradient">EcoCommerce</h1>

      {/* Right: Nav links */}
      <nav className="flex gap-8">
        <Link
          href="/upload"
          className="font-medium text-lg hover:text-primary transition-colors no-underline"
        >
          Upload
        </Link>
        <Link
          href="/leaderboard"
          className="font-medium text-lg hover:text-primary transition-colors no-underline"
        >
          Leaderboard
        </Link>
        <Link
          href="/profile"
          className="font-medium text-lg hover:text-primary transition-colors no-underline"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}
