"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tax-calculator", label: "Tax Calculator" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="w-full bg-white border-b border-gray-200 top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[#ed8936]">
          AustraTax
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-gray-700 hover:text-[#ed8936] transition-colors"
            >
              {link.label}
            </Link>
          ))}

          {/* Auth buttons */}
          <div className="flex items-center gap-4 ml-6">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-[#ed8936] transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 text-sm font-medium bg-[#ed8936] text-white rounded-md hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700"
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 pb-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#ed8936] transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Auth buttons in mobile menu */}
            <hr className="my-2" />
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-[#ed8936] transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium text-white bg-[#ed8936] px-4 py-2 rounded-md hover:opacity-90 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
