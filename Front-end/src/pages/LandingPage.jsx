import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      {/* Hero Section */}
      <section className="flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-20 py-16 md:py-32">
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Discover and Host Amazing Events
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl">
            Eventify helps you explore the latest events around you and create
            your own in a few clicks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              to="/register"
              className="px-6 py-3 bg-purple-400 text-white font-bold rounded-lg shadow-md hover:bg-purple-500 transition-colors text-center"
            >
              Get Started
            </Link>
            <Link
              to="/login"
              className="px-6 py-3 border border-purple-400 text-purple-400 font-bold rounded-lg hover:bg-purple-400/10 transition-colors text-center"
            >
              Login
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 mb-10 md:mb-0">
          <img
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
            alt="Events Illustration"
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Features / Events Section */}
      <section className="px-6 md:px-20 py-16 md:py-32 bg-gray-50 dark:bg-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Explore Events
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
            <img
              src="https://images.unsplash.com/photo-1524777317-51d3c2eafe03?auto=format&fit=crop&w=600&q=80"
              alt="Music Concert"
              className="rounded-lg mb-4"
            />
            <h3 className="font-bold text-xl mb-2">Music Concert</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Experience live performances by your favorite artists in your
              city.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
            <img
              src="https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=600&q=80"
              alt="Art Exhibition"
              className="rounded-lg mb-4"
            />
            <h3 className="font-bold text-xl mb-2">Art Exhibition</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Discover incredible artworks from talented artists around the
              world.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-700 rounded-xl shadow-md p-6">
            <img
              src="https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?auto=format&fit=crop&w=600&q=80"
              alt="Tech Conference"
              className="rounded-lg mb-4"
            />
            <h3 className="font-bold text-xl mb-2">Tech Conference</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join discussions and workshops with industry leaders and
              innovators.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 md:px-20 py-16 md:py-32 text-center bg-purple-400 text-white rounded-t-3xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Join Eventify?
        </h2>
        <p className="text-lg mb-8">
          Create an account now and start exploring or hosting amazing events
          today!
        </p>
        <Link
          to="/register"
          className="px-8 py-4 bg-white text-purple-500 font-bold rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
};

export default LandingPage;
