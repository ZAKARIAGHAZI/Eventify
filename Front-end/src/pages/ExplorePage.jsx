import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import EventCard from "../components/EventCard";
import { Pagination, CircularProgress } from "@mui/material";

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const eventsPerPage = 5; 

  const fetchEvents = async (pageNumber = 1) => {
    setLoading(true);
    setError("");

    try {
      const params = { page: pageNumber, ...filters };
      if (searchTerm) params.search = searchTerm;

      const response = await axios.get("http://localhost:8000/api/events", {
        params,
      });

      const data = response.data.events;
      setEvents(data.data); // Laravel pagination structure
      setTotalPages(data.last_page);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch events from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(page);
  }, [page]);

  // Reset to page 1 whenever filters or search term change
  useEffect(() => {
    setPage(1);
  }, [filters, searchTerm]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 bg-gray-50 dark:bg-gray-900">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white pt-16 pb-16 md:pt-24 md:pb-24 shadow-xl">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 z-10 relative">
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-3">
              Find Your Next Adventure
            </h1>
            <p className="text-white/90 text-xl md:text-2xl font-light">
              Explore thousands of events happening right now.
            </p>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col gap-4 max-w-4xl mx-auto p-4 bg-white/20 backdrop-blur-md rounded-xl shadow-2xl border border-white/30 relative z-10">
            <div className="w-full">
              <SearchBar
                value={searchTerm}
                onChange={setSearchTerm}
                placeholder="Search by event title..."
                className="w-full bg-white text-gray-800 rounded-lg p-3 shadow-inner"
              />
            </div>
            <div className="w-full">
              <Filters onFilterChange={setFilters} />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 sm:px-10 md:px-12 py-12 md:py-16">
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 font-medium">
          Showing **{events.length}** events
          {searchTerm || Object.keys(filters).length > 0
            ? " matching your criteria."
            : " available."}
        </p>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                className="shadow-xl rounded-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 ease-in-out border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-xl text-gray-500 dark:text-gray-400 py-20 bg-white dark:bg-gray-800 rounded-lg shadow-inner">
            <p className="mb-2">😔 No events found.</p>
            <p className="text-base">
              Try adjusting your search term or filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(e, value) => setPage(value)}
              color="primary"
              variant="outlined"
              size="large"
              className="p-2 rounded-xl"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: "inherit",
                  "&.Mui-selected": {
                    backgroundColor: "rgb(147 51 234 / 0.1)",
                    color: "rgb(147 51 234)",
                    "&.Mui-selected:hover": {
                      backgroundColor: "rgb(147 51 234 / 0.2)",
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default ExploreEvents;
