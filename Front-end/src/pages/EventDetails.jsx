import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import {
  LocationOn,
  Event,
  AccessTime,
  Business,
  Category,
} from "@mui/icons-material";

const EventDetails = () => {
  const { id } = useParams(); // event id from route
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        setError("Failed to load event details.");
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 mt-20">{error}</div>;
  }

  if (!event) {
    return (
      <div className="text-center text-gray-500 mt-20">Event not found.</div>
    );
  }

  return (
    <div className="bg-[#f9fafc] min-h-screen p-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-3">
        <span className="text-blue-600 cursor-pointer">Events</span> &gt;{" "}
        {event.title}
      </div>

      {/* Title and Subtitle */}
      <h1 className="text-4xl font-bold text-gray-800 mb-2">{event.title}</h1>
      <p className="text-gray-600 mb-6 max-w-3xl">
        Join us for a day of innovation and networking. Explore the latest
        trends in {event.category || "technology"}, connect with industry
        leaders, and discover new opportunities.
      </p>

      {/* Banner Image */}
      <div className="rounded-xl overflow-hidden shadow-md mb-10">
        <img
          src={event.image || "https://via.placeholder.com/800x400"}
          alt={event.title}
          className="w-full h-[400px] object-cover"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="lg:col-span-2 space-y-10">
          {/* About Section */}
          <section>
            <h2 className="text-xl font-semibold mb-3">About the Event</h2>
            <p className="text-gray-600 leading-relaxed">
              {event.description ||
                "This event brings together professionals, enthusiasts, and innovators to explore the latest advancements in the field. Expect inspiring talks, networking sessions, and engaging activities."}
            </p>
          </section>

          {/* Tickets Section */}
          <section>
            <h2 className="text-xl font-semibold mb-5">Tickets</h2>

            <div className="grid md:grid-cols-2 gap-5">
              {/* General Admission */}
              <div className="border rounded-2xl bg-white shadow-sm hover:shadow-md transition p-6">
                <h3 className="font-semibold text-lg">General Admission</h3>
                <p className="text-3xl font-bold mt-2 mb-3">
                  ${event.price || "99"}
                </p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li>✔️ Access to all sessions</li>
                  <li>✔️ Networking opportunities</li>
                </ul>
                <button className="bg-gray-200 text-gray-700 w-full py-2 rounded-xl hover:bg-gray-300 transition">
                  Register
                </button>
              </div>

              {/* VIP Pass */}
              <div className="border rounded-2xl bg-white shadow-sm hover:shadow-md transition p-6 relative">
                <div className="absolute -top-3 right-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md">
                  MOST POPULAR
                </div>
                <h3 className="font-semibold text-lg">VIP Pass</h3>
                <p className="text-3xl font-bold mt-2 mb-3">
                  ${event.vip_price || "199"}
                </p>
                <ul className="text-gray-600 space-y-2 mb-4">
                  <li>✔️ All General Admission benefits</li>
                  <li>✔️ Exclusive VIP lounge access</li>
                  <li>✔️ Priority seating</li>
                </ul>
                <button className="bg-blue-600 text-white w-full py-2 rounded-xl hover:bg-blue-700 transition">
                  Register
                </button>
              </div>
            </div>
          </section>

          {/* Location Map */}
          <section>
            <h2 className="text-xl font-semibold mb-3">Location</h2>
            <iframe
              title="Event Location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                event.location
              )}&output=embed`}
              className="w-full h-64 rounded-xl shadow-sm"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </section>
        </div>

        {/* Right Sidebar - Event Details */}
        <aside>
          <div className="bg-blue-50 rounded-2xl p-6 shadow-sm">
            <h3 className="font-semibold text-lg mb-4">Event Details</h3>
            <ul className="space-y-3 text-gray-700 text-sm">
              <li className="flex items-start gap-2">
                <Event className="text-blue-600" />
                <div>
                  <span className="font-medium">Date</span>
                  <p>{new Date(event.date).toLocaleDateString()}</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <AccessTime className="text-blue-600" />
                <div>
                  <span className="font-medium">Time</span>
                  <p>{event.time || "9:00 AM - 5:00 PM"}</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <LocationOn className="text-blue-600" />
                <div>
                  <span className="font-medium">Location</span>
                  <p>{event.location}</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Business className="text-blue-600" />
                <div>
                  <span className="font-medium">Organizer</span>
                  <p>{event.organizer || "Eventify Inc."}</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Category className="text-blue-600" />
                <div>
                  <span className="font-medium">Category</span>
                  <p>{event.category || "Technology"}</p>
                </div>
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default EventDetails;
