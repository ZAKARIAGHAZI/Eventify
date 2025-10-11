import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";

// ✅ Yup schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login",
        data
      );
      const { token, user } = response.data;

      if (token && user) {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user", JSON.stringify(user));

        const role = response.data.roles[0]; // "organizer" or "user"
        localStorage.setItem("role", role);

        if (role === "organizer") navigate("/organizer/dashboard");
        else navigate("/explore");
      } else {
        alert("Invalid response from server.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed. Please try again.");
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
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Email */}
          <div>
            <label className="text-sm font-medium" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className={`mt-1 block w-full px-4 py-3 rounded-lg border 
                ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } 
                bg-gray-100 dark:bg-gray-700 focus:ring-purple-400 focus:border-purple-400 
                placeholder-gray-400 dark:placeholder-gray-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className={`mt-1 block w-full px-4 py-3 rounded-lg border 
                ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-300 dark:border-gray-600"
                } 
                bg-gray-100 dark:bg-gray-700 focus:ring-purple-400 focus:border-purple-400 
                placeholder-gray-400 dark:placeholder-gray-500`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm 
                text-sm font-bold text-white bg-purple-500 hover:bg-purple-600 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-400 
                dark:focus:ring-offset-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </button>
          </div>
        </form>
      </div>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400">
        Don’t have an account?{" "}
        <a
          className="font-medium text-purple-500 hover:underline"
          href="/register"
        >
          Sign up
        </a>
      </p>
    </div>
  );
};

export default LoginForm;
