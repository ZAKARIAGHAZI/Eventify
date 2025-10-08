import React from "react";
import { Link } from "react-router-dom"; // import Link

const Navbar = () => {
  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-gray-300 dark:border-gray-700">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 text-purple-400">
          <svg
            fill="currentColor"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 42.4379C4 42.4379 14.0962 36.0744 24 41.1692C35.0664 46.8624 44 42.2078 44 42.2078L44 7.01134C44 7.01134 35.068 11.6577 24.0031 5.96913C14.0971 0.876274 4 7.27094 4 7.27094L4 42.4379Z" />
          </svg>
        </div>
        <h1 className="text-xl font-bold">Eventify</h1>
      </div>

      {/* Navigation links */}
      <nav className="hidden md:flex items-center gap-8">
        <Link
          className="text-sm font-medium hover:text-purple-400 transition-colors"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-sm font-medium hover:text-purple-400 transition-colors"
          to="/explore"
        >
          Explore
        </Link>
        <Link
          className="text-sm font-medium hover:text-purple-400 transition-colors"
          to="/"
        >
          Create Event
        </Link>
      </nav>

      {/* Sign Up button */}
      <div className="flex items-center gap-4">
        <Link
          className="px-4 py-2 text-sm font-bold rounded-lg bg-purple-400/20 hover:bg-purple-400/30 text-purple-400 transition-colors"
          to="/register" 
        >
          Sign 
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
