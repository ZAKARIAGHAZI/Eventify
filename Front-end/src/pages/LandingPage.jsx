import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    // FIX: Removed h-screen on the base div.
    // Added sm:h-screen to apply full-screen height ONLY from the tablet breakpoint up.
    <div className="flex flex-col w-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans min-h-screen sm:h-screen">
      {/* Navbar */}
      <Navbar user={null} />

      {/* Hero Section - This still uses flex-grow for full remaining height on sm:h-screen layouts. 
          The 'overflow-y-auto' is now less necessary but kept for safety in the split view (md:). */}
      <section className="relative flex flex-col-reverse md:flex-row items-center justify-center flex-grow px-6 sm:px-10 md:px-20 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white overflow-y-auto pt-10 pb-10 sm:pt-16 sm:pb-12">
        {/* Decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-4 sm:space-y-6 z-10 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
            Discover & Host <br /> Amazing Events
          </h1>
          <p className="text-white/90 text-base sm:text-lg md:text-xl">
            Explore the latest events near you or create your own — all in one
            place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
            <Link
              to="/explore"
              className="px-8 py-3 bg-white text-purple-600 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-all text-center"
            >
              Explore Events
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all text-center"
            >
              Host an Event
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <div className="w-full md:w-1/2 mb-8 sm:mb-10 md:mb-0 z-10 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=900&q=80"
            alt="Event Crowd"
            className="rounded-2xl shadow-2xl max-w-full 
                       max-h-[50vh] sm:max-h-[60vh] md:max-h-[70vh] lg:max-h-[80vh] 
                       h-auto object-cover w-full md:w-auto"
          />
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
