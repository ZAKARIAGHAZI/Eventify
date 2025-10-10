import React, { useState } from "react";


const EventCardDashboard = ({ event, onEdit, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image || "https://via.placeholder.com/400x300"}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
          {event.category?.toUpperCase()}
        </div>
      </div>

      <div className="p-5 space-y-3">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-1">
          {event.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
          {event.description}
        </p>

        <div className="space-y-2">
          <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
            <CalendarToday className="w-4 h-4 mr-2 text-purple-500" />
            <span>{new Date(event.date).toLocaleDateString()}</span>
            <AccessTime className="w-4 h-4 ml-4 mr-2 text-purple-500" />
            <span>{event.time}</span>
          </div>

          <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
            <LocationOn className="w-4 h-4 mr-2 text-purple-500" />
            <span className="line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
            <People className="w-4 h-4 mr-2 text-purple-500" />
            <span>{event.available_seats} seats available</span>
          </div>

          <div className="flex items-center text-gray-700 dark:text-gray-300 text-sm">
            <AttachMoney className="w-4 h-4 mr-2 text-purple-500" />
            <span className="font-semibold">
              {event.price_type === "free" || event.price === 0
                ? "FREE"
                : `$${event.price}`}
            </span>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={() => onEdit(event)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            <Edit className="w-4 h-4" />
            Edit
          </button>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
          >
            <Delete className="w-4 h-4" />
            Delete
          </button>
        </div>
      </div>

      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
              Confirm Delete
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to delete "{event.title}"? This action
              cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDelete(event.id);
                  setShowDeleteConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCardDashboard;