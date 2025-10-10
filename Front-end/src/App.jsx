import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventDetails from "./pages/EventDetails";
import LandingPage from "./pages/LandingPage";
import Explore from "./pages/ExplorePage";
import Register from "./pages/RegisterPage";
import Login from "./pages/LoginPage";
import OrganizerDashboard from "./pages/OrganizerDashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/organizer/dashboard" element={<OrganizerDashboard />} />
        <Route path="/events/:id" element={<EventDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
