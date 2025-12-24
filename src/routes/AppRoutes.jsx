import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import Navbar from "../components/Navbar";
import HomePage from "../pages/user/HomePage";
import SearchPage from "../pages/user/SearchPage";
import LoginPage from "../pages/user/LoginPage";
import RegisterPage from "../pages/user/RegisterPage";
import AddMoviePage from "../pages/admin/AddMoviePage";
import EditMoviePage from "../pages/admin/EditMoviePage";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user?.role === "admin" ? children : <Navigate to="/login" />;
};

const AppRoutes = () => (
  <>
    <Navbar />
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Admin Routes */}
      <Route path="/admin/add" element={<ProtectedRoute><AddMoviePage /></ProtectedRoute>} />
      <Route path="/admin/edit" element={<ProtectedRoute><EditMoviePage /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </>
);

export default AppRoutes;
