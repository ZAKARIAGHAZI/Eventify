import React from "react";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = ({ user }) => {
  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900">
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
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          Eventify
        </h1>
      </div>

      {/* Logged in */}
      {user ? (
        <div className="flex items-center gap-6 w-full justify-end">
          {/* Search bar */}
          <div className="relative hidden md:block w-1/3">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Notification icon */}
          <button className="relative">
            <NotificationsIcon className="text-gray-600 dark:text-gray-300 hover:text-purple-400 transition-colors" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Navigation links */}
          <nav className="hidden md:flex items-center gap-6">
            <Link className="text-sm font-medium hover:text-purple-400" to="/">
              Home
            </Link>
            <Link
              className="text-sm font-medium hover:text-purple-400"
              to="/explore"
            >
              Explore
            </Link>
            <Link
              className="text-sm font-medium hover:text-purple-400"
              to="/create"
            >
              Create Event
            </Link>
            <Link
              className="text-sm font-medium text-red-500 hover:text-red-400"
              to="/logout"
            >
              Logout
            </Link>
          </nav>
        </div>
      ) : (
        // Not logged in
        <div className="flex items-center gap-4">
          <Link
            className="px-4 py-2 text-sm font-bold rounded-lg bg-purple-400/20 hover:bg-purple-400/30 text-purple-500 transition-colors"
            to="/register"
          >
            Sign Up
          </Link>
          <Link
            className="px-4 py-2 text-sm font-bold rounded-lg bg-purple-400/20 hover:bg-purple-400/30 text-purple-500 transition-colors"
            to="/login"
          >
            Login
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
