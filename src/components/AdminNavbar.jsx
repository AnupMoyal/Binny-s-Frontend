// src/components/AdminNavbar.jsx
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const AdminNavbar = () => (
  <AppBar position="static" color="primary" sx={{ ml: "240px" }}>
    <Toolbar>
      <Typography variant="h6">Admin Panel</Typography>
    </Toolbar>
  </AppBar>
);

export default AdminNavbar;
