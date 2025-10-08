import React from "react";
import Navbar from "../components/Navbar"; // import reusable Navbar
import RegisterForm from "../components/RegisterForm"; // import the RegisterForm

const RegisterPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <RegisterForm />
      </main>
    </div>
  );
};

export default RegisterPage;
