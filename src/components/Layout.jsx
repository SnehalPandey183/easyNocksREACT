import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {
  const [dark, setDark] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* Dark mode */
  useEffect(() => {
    document.body.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="app">
      {/* Sidebar */}
      <Sidebar
        open={sidebarOpen}
        closeSidebar={() => setSidebarOpen(false)}
      />

      {/* Overlay */}
      <div
        className={`overlay ${sidebarOpen ? "show" : ""}`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <main className="main">
        <Header
          toggleSidebar={() => setSidebarOpen(true)}
          toggleTheme={() => setDark(prev => !prev)}
          dark={dark}
        />

        {/* Routed pages */}
        <Outlet />
      </main>
    </div>
  );
}