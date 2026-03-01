import { useState } from "react";
import { Link } from "react-router-dom";

const NAV_LINKS = [
  { name: "Find Jobs", path: "/jobs" },
  { name: "Browse Companies", path: "/companies" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="border-b border-gray-100 sticky top-0 z-50 bg-white">
      <div className="common_container flex items-center justify-between py-4">
        {/* Left Side */}
        <div className="flex items-center gap-8">
          <div className="font-clash font-bold text-2xl text-primary">
            <Link to="/">
              <img src="/Logo 1.png" alt="Quick Hire Logo" className="h-8" />
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-6 text-slate-600">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="hover:text-primary transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            <Link
              to="/login"
              className="font-medium text-primary px-6 py-2 hover:bg-primary hover:text-white transition-all duration-300"
            >
              Login
            </Link>
          </div>

          {/* Mobile Menu Bar Icon */}
          <button
            className="md:hidden text-slate-800 p-2 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menus */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white shadow-sm absolute w-[300px] z-50 right-1">
          <div className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="font-medium text-slate-600 hover:text-primary transition-colors px-6 py-3  bg-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="p-6 flex flex-col gap-3 ">
              <Link
                to="/login"
                className="w-full text-center font-medium text-primary border border-primary px-6 py-2.5 hover:bg-primary hover:text-white transition-all duration-300"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
