import { AuthProvider } from "./Contexts/AuthContext";
import { Routes, Route } from "react-router";
import { ThemeProvider } from "@mui/material";
import { theme } from "./Components/theme";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ResponsiveAppBar from "./Components/nav/ResponsiveAppBar";
import Homepage from "./Components/home/Homepage";
import Projects from "./Components/projects/Projects";
import Tasks from "./Components/tasks/Tasks";
import Settings from "./Components/settings/Settings";
import Account from "./Components/account/Account";
import Profile from "./Components/account/Profile";
import PasswordRecovery from "./Components/account/PasswordRecovery";
import ProtectedRoute from "./Components/account/ProtectedRoute";
import ContactsPage from "./Components/account/contacts/ContactsPage";

const App = () => {
  // Protect Routes snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleUnauthorizedAccess = () => {
    setSnackbarOpen(true);
  }

  return (
    <AuthProvider>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <ThemeProvider theme={theme}>
          <ResponsiveAppBar snackbarOpen={snackbarOpen} setSnackbarOpen={setSnackbarOpen} />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="Home" element={<Homepage />} />
            <Route path="Projects" element={
              <ProtectedRoute snackbarOpen={snackbarOpen} handleUnauthorizedAccess={handleUnauthorizedAccess}>
                <Projects />
              </ProtectedRoute>
              }
            />
            <Route path="Tasks" element={
              <ProtectedRoute snackbarOpen={snackbarOpen} handleUnauthorizedAccess={handleUnauthorizedAccess}>
                <Tasks />
              </ProtectedRoute>
              }
            />
            <Route path="Contacts" element={
              <ProtectedRoute snackbarOpen={snackbarOpen} handleUnauthorizedAccess={handleUnauthorizedAccess}>
                <ContactsPage />
              </ProtectedRoute>
              }
            />
            <Route path="Profile" element={
              <ProtectedRoute snackbarOpen={snackbarOpen} handleUnauthorizedAccess={handleUnauthorizedAccess}>
                <Profile />
              </ProtectedRoute>
              } />
            <Route path="Account" element={
              <ProtectedRoute snackbarOpen={snackbarOpen} handleUnauthorizedAccess={handleUnauthorizedAccess}>
                <Account />
              </ProtectedRoute>
              }
            />
            <Route path="Settings" element={<Settings />} />
            <Route path="PasswordRecovery" element={<PasswordRecovery />} />
          </Routes>
        </ThemeProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}

export default App;
