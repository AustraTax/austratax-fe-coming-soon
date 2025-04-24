"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { user, logout, loading } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const router = useRouter();

  // ✅ Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ✅ Close dropdown on login/logout
  useEffect(() => {
    setDropdownOpen(false);
  }, [user]);

  // ✅ Logout logic
  const handleLogout = () => {
    localStorage.removeItem("token");
    logout();
    router.refresh();
    router.push("/login");
  };

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tax-calculator", label: "Tax Calculator" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  const getInitials = () => {
    if (user?.firstName || user?.lastName) {
      return (
        (user.firstName?.[0] || "") + (user.lastName?.[0] || "")
      ).toUpperCase();
    }
    return user?.email?.[0]?.toUpperCase() || "U";
  };

  const getDisplayName = () => {
    if (user?.firstName) {
      const name = `${user.firstName} ${user.lastName || ""}`.trim();
      return name.length > 12 ? name.slice(0, 10) + "…" : name;
    }
    return user?.email?.split("@")[0] || "User";
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 top-0 z-50">
      <div className="max-w-5xl mx-auto flex justify-between items-center px-4 py-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold text-[#ed8936]">
          AustraTax
        </Link>

        {/* Desktop Navigation */}
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

          {/* Auth Section */}
          <div className="flex items-center gap-4 ml-6">
            {loading ? null : user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-[#ed8936] text-white flex items-center justify-center font-bold text-sm uppercase">
                    {getInitials()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate capitalize">
                    {getDisplayName()}
                  </span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
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
              </>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-gray-700"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <nav className="md:hidden bg-white border-t border-gray-200">
          <div className="max-w-5xl mx-auto px-4 pb-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-700 hover:text-[#ed8936] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            <hr className="my-2" />

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="text-sm font-medium text-gray-700 hover:text-[#ed8936] transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileOpen(false);
                  }}
                  className="text-sm font-medium text-gray-700 hover:text-[#ed8936] transition text-left"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-gray-700 hover:text-[#ed8936] transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="text-sm font-medium text-white bg-[#ed8936] px-4 py-2 rounded-md hover:opacity-90 transition"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}
