import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

  
const RegisterForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user"); // default: user
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
        role,
      });

      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("role", role);   
      }

     

      alert(`Welcome, ${user.name}! You are registered as an ${role}.`);

      // Redirect based on role
      if (role === "organizer") {
        navigate("/organizer/dashboard");
      } else {
        navigate("/explore");
      }
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
            <button
              type="button"
              onClick={() => setRole("user")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                role === "user"
                  ? "bg-purple-500 text-white shadow-lg"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              User (Attendee)
            </button>

            <button
              type="button"
              onClick={() => setRole("organizer")}
              className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                role === "organizer"
                  ? "bg-purple-500 text-white shadow-lg"
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600"
              }`}
            >
              Organizer (Host)
            </button>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            required
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 
            focus:ring-2 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 
            focus:ring-2 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 
            focus:ring-2 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password */}
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
            className="w-full h-12 px-4 rounded-lg bg-gray-100 dark:bg-gray-700 border-0 
            focus:ring-2 focus:ring-purple-500 placeholder-gray-400 dark:placeholder-gray-500 transition-shadow"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 rounded-lg shadow-sm 
            text-sm font-bold text-white bg-purple-600 hover:bg-purple-700 
            focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 
            focus:ring-offset-gray-100 dark:focus:ring-offset-gray-900 transition-colors"
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
