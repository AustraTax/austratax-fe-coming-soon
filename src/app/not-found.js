import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-white text-center px-4">
      <h1 className="text-6xl font-extrabold text-[#ed8936] mb-4">404</h1>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        Page Not Found
      </h2>
      <p className="text-gray-600 text-lg mb-8 max-w-md">
        Oops! The page you're looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-[#ed8936] text-white text-base font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-all"
      >
        Go back to Home
      </Link>
    </section>
  );
}
