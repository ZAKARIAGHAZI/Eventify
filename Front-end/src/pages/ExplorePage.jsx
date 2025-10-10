import React, { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import Filters from "../components/Filters";
import EventCard from "../components/EventCard";
import { Pagination, CircularProgress } from "@mui/material";

const ExploreEvents = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  // Fetch events from Laravel API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/events");
        console.log(response.data.events.data);
        setEvents(response.data.events.data);
        setFilteredEvents(response.data.events.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch events from the server.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  // Filter + search logic
  useEffect(() => {
    let data = [...events];

    // Search
    if (searchTerm) {
      data = data.filter((e) =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (filters.category) {
      data = data.filter((e) => e.category === filters.category);
    }

    // Location filter
    if (filters.location) {
      data = data.filter((e) =>
        e.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Price filter (if your API provides it)
    if (filters.price) {
      data = data.filter((e) => e.price_type === filters.price);
    }

    setFilteredEvents(data);
  }, [searchTerm, filters, events]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-8 bg-[#f3f7fb] min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-1">Explore Events</h1>
      <p className="text-gray-500 mb-6">
        Discover events happening near you or search for specific interests.
      </p>

      {/* Search Bar */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Filters */}
      <div className="mt-4 mb-8">
        <Filters onFilterChange={setFilters} />
      </div>

      {/* Event Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-20">
          No events found matching your filters.
        </div>
      )}

      {/* Pagination (you can connect this to backend pagination later) */}
      <div className="flex justify-center mt-10">
        <Pagination
          count={10}
          page={page}
          onChange={(e, value) => setPage(value)}
          color="primary"
        />
      </div>
    </div>
  );
};

export default ExploreEvents;
