import React from "react";
import { Link } from "react-router-dom";

const EventCard = ({ event }) => {
  return (
    <Link to={`/events/${event.id}`}>
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden hover:shadow-lg transition cursor-pointer">
        <div className="relative h-40 w-full">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          {event.category && (
            <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {event.category.toUpperCase()}
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg">{event.title}</h3>
          <p className="text-gray-500 text-sm">
            {event.location} | {new Date(event.date).toLocaleDateString()}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default EventCard;
