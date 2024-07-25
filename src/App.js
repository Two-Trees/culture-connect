import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";
import SubPage from "./SubPage";


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // example color, replace with your desired color
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:area" element={<SubPage />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;