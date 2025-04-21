import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white ">
      <div className="max-w-5xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center text-sm text-gray-600 gap-2">
        {/* Left: Brand */}
        <div className="text-center text-xs text-gray-400 ">
          <Link href="/" className="text-base font-semibold text-[#ed8936]">
            <span className="hover:underline">AustraTax</span>
          </Link>{" "}
          &copy; {new Date().getFullYear()} Austratax. All rights reserved.
        </div>

        {/* Right: Horizontal Links */}
        <div className="flex flex-wrap gap-x-4 gap-y-1">
          <Link
            href="/about"
            className="hover:text-[#ed8936] transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="hover:text-[#ed8936] transition-colors"
          >
            Contact
          </Link>
          <Link
            href="/privacy-policy"
            className="hover:text-[#ed8936] transition-colors"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms-and-conditions"
            className="hover:text-[#ed8936] transition-colors"
          >
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
