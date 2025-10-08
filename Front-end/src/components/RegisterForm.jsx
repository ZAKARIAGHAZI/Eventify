import React, { useState } from "react";
import axios from "axios";

const   RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword, 
      });

      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
      }

      alert(`Welcome, ${response.data.user.name}! Registration successful.`);
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-md">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold">Create your account</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Join Eventify to discover and host amazing events.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleRegister}>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            required
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-purple-300 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-purple-300 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-purple-300 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="confirm-password"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm your password"
            required
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-purple-300 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-purple-300 hover:bg-purple-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-300 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 transition-colors"
          >
            Register
          </button>
        </div>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <a
          className="font-medium text-purple-300 hover:text-purple-400 underline"
          href="/login"
        >
          Log in
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
