import React from "react";
import { Outlet } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Sidebar from "../components/Sidebar";
import { Box } from "@mui/material";

const AdminLayout = () => (
  <Box display="flex">
    <Sidebar />
    <Box flex={1}>
      <AdminNavbar />
      <Outlet />
    </Box>
  </Box>
);

export default AdminLayout;
