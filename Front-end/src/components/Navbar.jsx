import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user }) => {
  const navigate = useNavigate();

  // Capitalize the role for display
  const formatRole = (role) => {
    if (!role) return "";
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  // 🧹 Logout function
  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("auth_token");

      await axios.post(
        "http://127.0.0.1:8000/api/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear local storage
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");

      // Redirect to main page
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Something went wrong while logging out.");
    }
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

      {/* Logged in */}
      {user ? (
        <div className="flex items-center gap-6 w-full justify-end">
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

            {/* Show "Create Event" only for organizers */}
            {user.role === "organizer" && (
              <Link
                className="text-sm font-medium hover:text-purple-400"
                to="/create"
              >
                Create Event
              </Link>
            )}
          </nav>

          {/* User + Logout */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-gray-800 dark:text-gray-100 hidden sm:block">
              {user.name}
              <span className="text-purple-500 dark:text-purple-400 font-semibold ml-1">
                ({formatRole(user.roles[0].name)})
              </span>
            </span>

            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs sm:text-sm font-bold rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
            >
              Logout
            </button>
          </div>
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
