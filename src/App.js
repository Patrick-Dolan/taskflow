import { AuthProvider } from "./Contexts/AuthContext";
import { Routes, Route } from "react-router";
import ResponsiveAppBar from "./Components/nav/ResponsiveAppBar";
import Homepage from "./Components/home/Homepage";
import Projects from "./Components/projects/Projects";
import Tasks from "./Components/tasks/Tasks";
import Settings from "./Components/settings/Settings";
import Account from "./Components/account/Account";
import Profile from "./Components/account/Profile";

const App = () => {
  return (
    <AuthProvider>
      <ResponsiveAppBar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="Home" element={<Homepage />} />
        <Route path="Projects" element={<Projects />} />
        <Route path="Tasks" element={<Tasks />} />
        <Route path="Profile" element={<Profile />} />
        <Route path="Account" element={<Account />} />
        <Route path="Settings" element={<Settings />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
