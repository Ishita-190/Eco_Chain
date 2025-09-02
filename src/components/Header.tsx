import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-4 shadow-md bg-white">
      {/* Left: Logo */}
      <Link href="/" className="text-2xl font-bold text-gray-800 no-underline">
        Eco_Chain
      </Link>

      {/* Right: Nav links */}
      <nav className="flex gap-8">
        <Link
          href="/upload"
          className="text-lg text-gray-700 hover:text-green-700 transition-colors no-underline"
        >
          Upload
        </Link>
        <Link
          href="/leaderboard"
          className="text-lg text-gray-700 hover:text-green-700 transition-colors no-underline"
        >
          Leaderboard
        </Link>
        <Link
          href="/profile"
          className="text-lg text-gray-700 hover:text-green-700 transition-colors no-underline"
        >
          Profile
        </Link>
      </nav>
    </header>
  );
}
