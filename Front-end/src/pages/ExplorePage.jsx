import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

const ExplorePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // ✅ Temporary sample data — replace with API call later
    const sampleEvents = [
      {
        id: 1,
        title: "Tech Conference 2024",
        category: "Tech",
        location: "San Francisco, CA",
        date: "Oct 26, 2024",
        image:
          "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
      },
      {
        id: 2,
        title: "Music Festival",
        category: "Music",
        location: "Los Angeles, CA",
        date: "Nov 15, 2024",
        image:
          "https://images.unsplash.com/photo-1507874457470-272b3c8d8ee2?auto=format&fit=crop&w=1200&q=80",
      },
    ];
    setEvents(sampleEvents);
  }, []);

  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-display text-gray-900 dark:text-gray-100">
      {/* 🧭 Header */}
      <header className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 md:px-10 py-4">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-indigo-600">
            <span className="material-symbols-outlined text-3xl">event</span>
            <h2 className="text-xl font-bold">Eventify</h2>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-indigo-600">
              Home
            </a>
            <a href="#" className="text-sm font-medium text-indigo-600">
              Explore
            </a>
            <a href="#" className="text-sm font-medium hover:text-indigo-600">
              Create
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {/* 🔍 Search */}
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              search
            </span>
            <input
              type="text"
              className="rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 pl-10 pr-4 py-2 text-sm placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
              placeholder="Search"
            />
          </div>

          {/* 🔔 Notifications */}
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700">
            <span className="material-symbols-outlined">notifications</span>
          </button>

          {/* 👤 Profile */}
          <div
            className="h-10 w-10 rounded-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1607746882042-944635dfe10e?auto=format&fit=crop&w=400&q=80')",
            }}
          ></div>
        </div>
      </header>

      {/* 📦 Main content */}
      <main className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-40 py-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold">Explore Events</h1>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Discover events happening near you or search for your interests.
            </p>
          </div>

          {/* 🔍 Filter Bar */}
          <div className="mb-8">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                search
              </span>
              <input
                type="text"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 py-3 pl-12 pr-4 text-base placeholder-gray-400 focus:ring-2 focus:ring-indigo-600 focus:outline-none"
                placeholder="Search for events by name, location, or keyword..."
              />
            </div>
          </div>

          {/* 🗓️ Event Cards */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {events.map((event) => (
              <EventCard key={event.id} {...event} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
