export default function Header({ toggleSidebar, toggleTheme, dark }) {
  return (
    <header className="header">
      {/* ☰ Mobile menu button */}
      <button className="menu-btn" onClick={toggleSidebar}>
        ☰
      </button>

      <h1 className="page-title">Admin Panel</h1>

      {/* 🌙 / ☀️ Theme toggle */}
      <button className="theme-toggle" onClick={toggleTheme}>
        {dark ? "☀️" : "🌙"}
      </button>
    </header>
  );
}