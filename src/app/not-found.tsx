export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a
          href="/"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
}
