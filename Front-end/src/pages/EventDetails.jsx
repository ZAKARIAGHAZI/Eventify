import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import {
  LocationOn,
  Event,
  AccessTime,
  Business,
  Category,
  ConfirmationNumber,
} from "@mui/icons-material";
import Navbar from "../components/Navbar";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  const isLoggedIn = !!localStorage.getItem("auth_token");

  // Fetch event details
  const fetchEvent = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("auth_token");
      const headers = token
        ? { Authorization: `Bearer ${token}`, Accept: "application/json" }
        : { Accept: "application/json" };
      const res = await axios.get(`http://localhost:8000/api/events/${id}`, {
        headers,
      });
      setEvent(res.data.event);
    } catch (err) {
      setError("Failed to load event details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  // Register/Unregister handler
  const handleAction = async () => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }

    setActionLoading(true);
    try {
      const token = localStorage.getItem("auth_token");
      const headers = {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      };

      if (event.is_registered) {
        await axios.post(
          `http://localhost:8000/api/events/${id}/unregister`,
          {},
          { headers }
        );
        setEvent({
          ...event,
          is_registered: false,
          available_seats: event.available_seats + 1,
        });
        alert("You have successfully unregistered.");
      } else {
        if (event.available_seats <= 0) {
          alert("No seats available.");
          return;
        }
        await axios.post(
          `http://localhost:8000/api/events/${id}/register`,
          {},
          { headers }
        );
        setEvent({
          ...event,
          is_registered: true,
          available_seats: event.available_seats - 1,
        });
        alert("You have successfully registered.");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Action failed. Please try again.");
    } finally {
      setActionLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
        <CircularProgress color="primary" />
      </div>
    );
  }

  if (error)
    return <div className="text-center text-red-500 mt-20">{error}</div>;
  if (!event)
    return (
      <div className="text-center text-gray-500 mt-20">Event not found.</div>
    );

  const isFree = event.price_type === "free" || event.price === 0;
  const priceDisplay = isFree ? "FREE" : `$${event.price || "N/A"}`;

  const buttonText = !isLoggedIn
    ? "Login to Register"
    : event.is_registered
    ? "Unregister"
    : "Register Now";

  const buttonColorClass = !isLoggedIn
    ? "bg-gray-400 cursor-not-allowed"
    : event.is_registered
    ? "bg-red-500 hover:bg-red-600"
    : "bg-purple-600 hover:bg-purple-700";

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          {/* Breadcrumb */}
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-3">
            <Link
              to="/explore"
              className="text-purple-600 hover:text-purple-400 transition"
            >
              Events
            </Link>{" "}
            &gt; {event.title}
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-extrabold mb-2">
            {event.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-4xl text-lg">
            {event.subtitle ||
              `Join us for a day of innovation and networking.`}
          </p>

          {/* Banner */}
          <div className="rounded-2xl overflow-hidden shadow-xl mb-12">
            <img
              src={event.image || "https://via.placeholder.com/1200x500"}
              alt={event.title}
              className="w-full h-64 md:h-[500px] object-cover"
            />
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-12">
              {/* About */}
              <section className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-purple-600 mb-4">
                  About the Event
                </h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {event.description || "Event description goes here."}
                </p>
              </section>

              {/* Ticket & Register */}
              <section className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-purple-600 mb-6 flex items-center">
                  <ConfirmationNumber className="mr-2" />
                  Ticket Information
                </h2>

                <div className="border border-purple-300 dark:border-purple-800 rounded-2xl p-8 max-w-lg mx-auto bg-purple-50 dark:bg-gray-700 transition hover:shadow-xl">
                  <h3 className="font-extrabold text-2xl mb-2">
                    {isFree ? "Free Entry" : "General Admission"}
                  </h3>
                  <p className="text-5xl font-extrabold text-purple-700 mb-2">
                    {priceDisplay}
                  </p>

                  {/* Available seats */}
                  <p className="text-gray-700 dark:text-gray-300 mb-6">
                    Available Seats: {event.available_seats}
                  </p>

                  <button
                    onClick={handleAction}
                    disabled={
                      actionLoading || !isLoggedIn || event.available_seats <= 0
                    }
                    className={`w-full py-3 text-lg font-bold text-white rounded-xl transition ${buttonColorClass} ${
                      actionLoading ? "opacity-70 cursor-not-allowed" : ""
                    }`}
                  >
                    {actionLoading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      buttonText
                    )}
                  </button>

                  {isLoggedIn && (
                    <p
                      className={`mt-3 text-center text-sm font-medium ${
                        event.is_registered
                          ? "text-green-600 dark:text-green-400"
                          : event.available_seats <= 0
                          ? "text-red-500 dark:text-red-400"
                          : "text-gray-600 dark:text-gray-300"
                      }`}
                    >
                      {event.is_registered
                        ? "You are successfully registered for this event."
                        : event.available_seats <= 0
                        ? "No seats available."
                        : "Register to secure your spot."}
                    </p>
                  )}
                </div>
              </section>
            </div>

            
            {/* Sidebar */}
            <aside>
              <div className="sticky top-10 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-700">
                <h3 className="font-bold text-2xl mb-5">Event Snapshot</h3>
                <ul className="space-y-4">
                  {/* Start Date */}
                  <li className="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Event className="text-purple-600 mt-1" />
                    <div>
                      <span className="font-semibold text-sm block">
                        Start Date
                      </span>
                      <p>
                        {event.start_time
                          ? new Date(event.start_time).toLocaleDateString()
                          : "TBD"}
                      </p>
                    </div>
                  </li>

                  {/* End Date */}
                  <li className="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Event className="text-purple-600 mt-1" />
                    <div>
                      <span className="font-semibold text-sm block">
                        End Date
                      </span>
                      <p>
                        {event.end_time
                          ? new Date(event.end_time).toLocaleDateString()
                          : "TBD"}
                      </p>
                    </div>
                  </li>

                  {/* Time */}
                  <li className="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <AccessTime className="text-purple-600 mt-1" />
                    <div>
                      <span className="font-semibold text-sm block">Time</span>
                      <p>
                        {event.start_time && event.end_time
                          ? `${new Date(event.start_time).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )} - ${new Date(event.end_time).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}`
                          : "9:00 AM - 5:00 PM"}
                      </p>
                    </div>
                  </li>

                  {/* Location */}
                  <li className="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <LocationOn className="text-purple-600 mt-1" />
                    <div>
                      <span className="font-semibold text-sm block">
                        Location
                      </span>
                      <p>{event.location || "TBD"}</p>
                    </div>
                  </li>

                  {/* Organizer */}
                  <li className="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Business className="text-purple-600 mt-1" />
                    <div>
                      <span className="font-semibold text-sm block">
                        Organizer
                      </span>
                      <p>
                        {event.organizer?.name ||
                          event.organizer ||
                          "Eventify Inc."}
                      </p>
                    </div>
                  </li>

                  {/* Category */}
                  <li className="flex items-start gap-3 p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <Category className="text-purple-600 mt-1" />
                    <div>
                      <span className="font-semibold text-sm block">
                        Category
                      </span>
                      <p>{event.category || "Technology"}</p>
                    </div>
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetails;
