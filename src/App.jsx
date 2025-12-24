import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./utils/theme";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;
