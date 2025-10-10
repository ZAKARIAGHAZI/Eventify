import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login", {
        email,
        password,
      });

      // Save token for future authenticated requests
      const token = response.data.token;
      localStorage.setItem("auth_token", token);

      console.log("Login successful:", response.data);
      alert(`Welcome back, ${response.data.user.name}!`);
      // Redirect to dashboard or home page
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight">Welcome Back!</h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Log in to your Eventify account.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-300 dark:border-gray-700">
        <form className="space-y-6" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="you@example.com"
              required
              className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:ring-purple-400 focus:border-purple-400 placeholder-gray-400 dark:placeholder-gray-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
            </div>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              required
              className="mt-1 block w-full px-4 py-3 rounded-lg bg-gray-100 dark:bg-gray-700 border-transparent focus:ring-purple-400 focus:border-purple-400 placeholder-gray-400 dark:placeholder-gray-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-purple-400 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 dark:focus:ring-offset-gray-800"
            >
              Log In
            </button>
          </div>
        </form>
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don't have an account?{" "}
        <a className="font-medium text-purple-400 hover:underline" href="#">
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
