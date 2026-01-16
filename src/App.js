import React from "react";
import "./App.css";
import Navbar from "./Components/Navbar";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Movies from "./Pages/Movies";
import TVSeries from "./Pages/TVSeries";
import AdminDashboard from "./Pages/AdminDashboard";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

// Create default admin
const adminUser = {
  name: "Admin",
  email: "admin@reelstream.com",
  password: "Admin@123",
  role: "ADMIN",
};

if (!localStorage.getItem("reelstream_admin")) {
  localStorage.setItem("reelstream_admin", JSON.stringify(adminUser));
}

function AdminRoute({ children }) {
  const { user } = useAuth();
  if (!user || user.role !== "ADMIN") {
    return <Navigate to="/" />;
  }
  return children;
}

function GuestRoute({ children }) {
  const { user } = useAuth();
  if (user) return <Navigate to="/" />;
  return children;
}

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <GuestRoute>
              <Signup />
            </GuestRoute>
          }
        />

        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<TVSeries />} />

        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />

        <Route path="*" element={<h2 style={{ paddingTop: "80px" }}>Page not found</h2>} />
      </Routes>
    </div>
  );
}

export default App;
