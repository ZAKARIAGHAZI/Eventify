import React, { useState } from "react";
import axios from "axios";


const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // NEW state for role selection
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // API call with the selected role included in the payload
      const response = await axios.post("http://127.0.0.1:8000/api/register", {
        name,
        email,
        password,
        password_confirmation: confirmPassword,
        role, 
      });

      if (response.data.token) {
        localStorage.setItem("auth_token", response.data.token);
      }

      alert(
        `Welcome, ${response.data.user.name}! Registration successful as a ${role}.`
      );
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="w-full max-w-md space-y-8 bg-white dark:bg-gray-800 p-8 md:p-10 rounded-xl shadow-2xl">
      <div className="text-center">
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Join Eventify to discover and host amazing events.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleRegister}>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Role Selection */}
        <div className="pt-2">
          <label className="block text-base font-semibold mb-3 text-gray-700 dark:text-gray-200">
            Register as:
          </label>
          <div className="flex bg-gray-100 dark:bg-gray-700 rounded-lg p-1 space-x-2">
            {/* User Role */}
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all 
                        ${
                          role === "user"
                            ? "bg-purple-500 text-white shadow-lg"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
            >
              <span className="truncate">User (Attendee)</span>
            </button>

            {/* organizer Role */}
            <button
              type="button"
              onClick={() => setRole("organizer")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all 
                        ${
                          role === "organizer"
                            ? "bg-purple-500 text-white shadow-lg"
                            : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
            >
              <span className="truncate">organizer (Host)</span>
            </button>
          </div>
        </div>
        {/* End Role Selection */}

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            required
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
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
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
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
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
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
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 focus:ring-2 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 transition-colors"
          >
            Register
          </button>
        </div>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Already have an account?{" "}
        <a
          className="font-medium text-purple-500 hover:text-purple-400 underline"
          href="/login"
        >
          Log in
        </a>
      </p>
    </div>
  );
};

export default RegisterForm;
