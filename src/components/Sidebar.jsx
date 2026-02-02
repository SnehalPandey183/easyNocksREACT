import { NavLink } from "react-router-dom";
import logo from "../assets/Group 1.png";

export default function Sidebar({ open, closeSidebar }) {
  return (
    <aside className={`sidebar ${open ? "show" : ""}`}>
      <div className="logo">
        <img src={logo} alt="EasyNocks" />
      </div>

      <nav>
        <NavLink to="/" end onClick={closeSidebar}>
          Dashboard
        </NavLink>

        <NavLink to="/users" onClick={closeSidebar}>
          Users
        </NavLink>

        <NavLink to="/projects" onClick={closeSidebar}>
          Projects
        </NavLink>

        <NavLink to="/disputes" onClick={closeSidebar}>
          Disputes
        </NavLink>

        <NavLink to="/marketplace" onClick={closeSidebar}>
          Marketplace
        </NavLink>

        <NavLink to="/reviews" onClick={closeSidebar}>
          Reviews
        </NavLink>

        <NavLink to="/settings" onClick={closeSidebar}>
          Settings
        </NavLink>

        <NavLink to="/notifications" onClick={closeSidebar}>
          Notifications
        </NavLink>
      </nav>
    </aside>
  );
}