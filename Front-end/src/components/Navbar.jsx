import React from "react";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

const Navbar = ({ user }) => {
  // Helper function to capitalize the role for display
  const formatRole = (role) => {
    if (!role) return "";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <header className="flex items-center justify-between px-6 md:px-10 py-4 border-b border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 z-20">
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

      {/* Logged in State */}
      {user ? (
        <div className="flex items-center gap-4 sm:gap-6 w-full justify-end">
          {/* Search bar (Desktop only) */}
          <div className="relative hidden md:block w-1/3 max-w-sm">
            <input
              type="text"
              placeholder="Search events..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 h-5 w-5" />
          </div>

          {/* Navigation links (Desktop only) */}
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
            {/* Show 'Create Event' link only if the user is an organizer */}
            {user.role === "organizer" && (
              <Link
                className="text-sm font-medium hover:text-purple-400"
                to="/create"
              >
                Create Event
              </Link>
            )}
          </nav>

          {/* Notification icon */}
          <button className="relative p-1">
            <NotificationsIcon className="text-gray-600 dark:text-gray-300 hover:text-purple-400 transition-colors h-6 w-6" />
            <span className="absolute top-0 right-0 inline-block w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Info & Logout Group */}
          <div className="flex items-center gap-3">
            {/* User Name & Role Display */}
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100 hidden sm:block">
              {user.name}
              <span className="text-purple-500 dark:text-purple-400 font-semibold ml-1">
                ({formatRole(user.role)})
              </span>
            </span>

            {/* Logout Button */}
            <Link
              className="px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
              to="/logout"
            >
              Logout
            </Link>
          </div>
        </div>
      ) : (
        // Not logged in State (Original Login/Register buttons)
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
