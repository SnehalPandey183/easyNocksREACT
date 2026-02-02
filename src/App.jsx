import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Projects from "./pages/Projects";
import Disputes from "./pages/Disputes";
import Marketplace from "./pages/Marketplace";
import Reviews from "./pages/Reviews";
import Settings from "./pages/Settings";
import Notifications from "./pages/Notifications";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout wrapper */}
        <Route element={<Layout />}>
          {/* Dashboard = INDEX ROUTE = "/" */}
          <Route index element={<Dashboard />} />

          {/* Other pages */}
          <Route path="users" element={<Users />} />
          <Route path="projects" element={<Projects />} />
          <Route path="disputes" element={<Disputes />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="settings" element={<Settings />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}