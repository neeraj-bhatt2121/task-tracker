import React, { useState, useMemo } from "react";
import {
  Container,
  Typography,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Box,
} from "@mui/material";
import TaskContainer from "./components/TaskContainer";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const theme = useMemo(
    () => createTheme({ palette: { mode: darkMode ? "dark" : "light" } }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h4">Task Tracker</Typography>
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </Box>
        <TaskContainer />
      </Container>
    </ThemeProvider>
  );
}
