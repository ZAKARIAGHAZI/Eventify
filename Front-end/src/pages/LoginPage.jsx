import React from "react";
import Navbar from "../components/Navbar"; 
import LoginForm from "../components/LoginForm"; 



const LoginPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans">
      <Navbar />
      <main className="flex flex-1 items-center justify-center p-4">
        <LoginForm />
      </main>
    </div>
  );
};

export default LoginPage;
