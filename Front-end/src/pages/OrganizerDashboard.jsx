import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Event, People, Category } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import EventFormModal from "../components/EventFormModal"; // ✅ use your real modal

const OrganizerDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("create");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [stats, setStats] = useState({
    totalEvents: 0,
    totalSeats: 0,
    totalRegistrations: 0,
  });

  // ✅ On mount: check auth & load events
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("auth_token");
    const storedUser = localStorage.getItem("user");

    if (!token || !storedUser) {
      navigate("/login");
      return;
    }

    const parsedUser = JSON.parse(storedUser);    


    // ✅ Only allow organizers
    if (parsedUser.roles[0].name !== "organizer") {
      console.log("Access denied: Not an organizer");
      navigate("/");
      return;
    }

    setUser(parsedUser);
    fetchOrganizerEvents(token);
  };

  // ✅ Fetch organizer events
  const fetchOrganizerEvents = async (token) => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8000/api/organizer/events",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const eventsData = response.data.events || response.data;
      setEvents(eventsData);

      const totalSeats = eventsData.reduce(
        (sum, e) => sum + (e.available_seats || 0),
        0
      );
      setStats({
        totalEvents: eventsData.length,
        totalSeats,
        totalRegistrations: 0,
      });
    } catch (error) {
      console.error("Error fetching events:", error);
      alert("Failed to load events. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Create event
  const handleCreateEvent = async (formData) => {
    try {
      const token = localStorage.getItem("auth_token");
      await axios.post("http://localhost:8000/api/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      alert("Event created successfully!");
      setShowModal(false);
      fetchOrganizerEvents(token);
    } catch (error) {
      console.error("Error creating event:", error);
      alert(error.response?.data?.message || "Failed to create event");
    }
  };

  // ✅ Update event
  const handleUpdateEvent = async (formData) => {
    if (!selectedEvent) return;
    try {
      const token = localStorage.getItem("auth_token");
      await axios.put(
        `http://localhost:8000/api/events/${selectedEvent.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
      alert("Event updated successfully!");
      setShowModal(false);
      fetchOrganizerEvents(token);
    } catch (error) {
      console.error("Error updating event:", error);
      alert(error.response?.data?.message || "Failed to update event");
    }
  };

  // ✅ Delete event
  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("auth_token");
      await axios.delete(`http://localhost:8000/api/events/${eventId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      alert("Event deleted successfully!");
      fetchOrganizerEvents(token);
    } catch (error) {
      console.error("Error deleting event:", error);
      alert(error.response?.data?.message || "Failed to delete event");
    }
  };

  // ✅ Modal handlers
  const openCreateModal = () => {
    setModalMode("create");
    setSelectedEvent(null);
    setShowModal(true);
  };

  const openEditModal = (event) => {
    setModalMode("edit");
    setSelectedEvent(event);
    setShowModal(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <CircularProgress color="primary" size={60} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar user={user} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Organizer Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your events and track performance
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatCard
            title="Total Events"
            value={stats.totalEvents}
            icon={
              <Event className="text-purple-600 dark:text-purple-400 w-8 h-8" />
            }
          />
          <StatCard
            title="Total Seats"
            value={stats.totalSeats}
            icon={
              <People className="text-blue-600 dark:text-blue-400 w-8 h-8" />
            }
          />
          <StatCard
            title="Registrations"
            value={stats.totalRegistrations}
            icon={
              <Category className="text-green-600 dark:text-green-400 w-8 h-8" />
            }
          />
        </div>

        {/* Events */}
        {events.length === 0 ? (
          
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            No events found. Click below to create your first event.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 flex flex-col justify-between border border-gray-200 dark:border-gray-700"
              >
                <div>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {event.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {event.description}
                  </p>
                </div>

                <div className="flex justify-between mt-2">
                  <button
                    onClick={() => openEditModal(event)}
                    className="text-purple-600 hover:underline font-medium"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteEvent(event.id)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Event Button */}
        <button
          onClick={openCreateModal}
          className="fixed bottom-8 right-8 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full shadow-lg font-semibold"
        >
          + Add Event
        </button>
      </div>

      {/* ✅ Real Modal */}
      <EventFormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={
          modalMode === "create" ? handleCreateEvent : handleUpdateEvent
        }
        event={selectedEvent}
        mode={modalMode}
      />
    </div>
  );
};

// ✅ Stat card
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
          {title}
        </p>
        <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
          {value}
        </p>
      </div>
      <div className="bg-purple-100 dark:bg-purple-900/30 p-4 rounded-xl">
        {icon}
      </div>
    </div>
  </div>
);

export default OrganizerDashboard;
