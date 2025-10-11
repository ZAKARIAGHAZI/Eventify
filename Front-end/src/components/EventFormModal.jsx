import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Close } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import axios from "axios";

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

// ✅ Yup validation schema
const schema = yup.object().shape({
  title: yup.string().required("Event title is required"),
  description: yup.string().required("Description is required"),
  start_date: yup.string().required("Start date is required"),
  start_time: yup.string().required("Start time is required"),
  end_date: yup.string().required("End date is required"),
  end_time: yup.string().required("End time is required"),
  location: yup.string().required("Location is required"),
  category: yup.string().required("Category is required"),
  price: yup.number().min(0, "Price cannot be negative"),
  available_seats: yup
    .number()
    .typeError("Seats must be a number")
    .positive("Seats must be positive")
    .required("Available seats required"),
  image: yup.string().required("Event image is required"),
});

const EventFormModal = ({ isOpen, onClose, onSubmit, event, mode }) => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      start_date: "",
      start_time: "",
      end_date: "",
      end_time: "",
      location: "",
      category: "",
      price: 0,
      available_seats: "",
      image: "",
    },
  });

  // Prefill when editing
  useEffect(() => {
    if (event && mode === "edit") {
      const [startDate, startTime] = event.start_time
        ? event.start_time.split("T")
        : ["", ""];
      const [endDate, endTime] = event.end_time
        ? event.end_time.split("T")
        : ["", ""];
      reset({
        title: event.title || "",
        description: event.description || "",
        start_date: startDate,
        start_time: startTime,
        end_date: endDate,
        end_time: endTime,
        location: event.location || "",
        category: event.category || "",
        price: event.price || 0,
        available_seats: event.available_seats || "",
        image: event.image || "",
      });
    } else {
      reset();
    }
  }, [event, mode, reset]);

  // ✅ Handle image upload to Cloudinary
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    const formDataImg = new FormData();
    formDataImg.append("file", file);
    formDataImg.append("upload_preset", UPLOAD_PRESET);

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formDataImg
      );
      setValue("image", res.data.secure_url);
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle form submission
  const onFormSubmit = async (data) => {
    const start_time = `${data.start_date} ${data.start_time}`;
    const end_time = `${data.end_date} ${data.end_time}`;

    if (new Date(end_time) < new Date(start_time)) {
      alert("End time cannot be before start time");
      return;
    }

    setLoading(true);
    try {
      await onSubmit({
        ...data,
        start_time,
        end_time,
        price: parseFloat(data.price) || 0,
      });
      onClose();
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-3xl my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {mode === "edit" ? "Edit Event" : "Create New Event"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Close className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onFormSubmit)}
          className="p-6 space-y-6 max-h-[70vh] overflow-y-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Event Title *
              </label>
              <input
                {...register("title")}
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                Description *
              </label>
              <textarea
                {...register("description")}
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Describe your event"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Date & Time */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Start Date *
              </label>
              <input
                type="date"
                {...register("start_date")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.start_date && (
                <p className="text-red-500 text-sm">
                  {errors.start_date.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                Start Time *
              </label>
              <input
                type="time"
                {...register("start_time")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.start_time && (
                <p className="text-red-500 text-sm">
                  {errors.start_time.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                End Date *
              </label>
              <input
                type="date"
                {...register("end_date")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.end_date && (
                <p className="text-red-500 text-sm">
                  {errors.end_date.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">
                End Time *
              </label>
              <input
                type="time"
                {...register("end_time")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.end_time && (
                <p className="text-red-500 text-sm">
                  {errors.end_time.message}
                </p>
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Location *
              </label>
              <input
                type="text"
                {...register("location")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.location && (
                <p className="text-red-500 text-sm">
                  {errors.location.message}
                </p>
              )}
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Category *
              </label>
              <select
                {...register("category")}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Select category</option>
                <option value="tech">Technology</option>
                <option value="music">Music</option>
                <option value="art">Art</option>
                <option value="food">Food</option>
                <option value="sports">Sports</option>
                <option value="community">Community</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm">
                  {errors.category.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Price (MAD)
              </label>
              <input
                type="number"
                {...register("price")}
                min="0"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>

            {/* Seats */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                Available Seats *
              </label>
              <input
                type="number"
                {...register("available_seats")}
                min="1"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {errors.available_seats && (
                <p className="text-red-500 text-sm">
                  {errors.available_seats.message}
                </p>
              )}
            </div>

            {/* Image Upload */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-2">
                Upload Event Image *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              {uploading && (
                <div className="mt-2 text-sm text-gray-500 flex items-center gap-2">
                  <CircularProgress size={16} color="inherit" />
                  Uploading image...
                </div>
              )}
              {errors.image && (
                <p className="text-red-500 text-sm">{errors.image.message}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || uploading}
              className="flex-1 px-6 py-3 rounded-lg bg-purple-600 text-white font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : mode === "edit" ? (
                "Update Event"
              ) : (
                "Create Event"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventFormModal;
