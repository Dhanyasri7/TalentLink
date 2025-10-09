import React from "react";
import { Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FindFreelancers from "./pages/FindFreelancers";
import FindProjects from "./pages/FindProjects";
import Dashboard from "./pages/Dashboard";
import FreelancerDashboard from "./pages/FreelancerDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/freelancerdashboard" element={<FreelancerDashboard />} />
      <Route path="/find-freelancers" element={<FindFreelancers />} />
      <Route path="/find-projects" element={<FindProjects />} />
    </Routes>
  );
}

export default App;
