export default function Dashboard() {
  return (
    <div className="dashboard">
      <section className="cards">
        
        {/* Total Users */}
        <div className="card">
          <p className="card-title">Total Users</p>
          <h2>2,540</h2>

          <span>Clients: 1,860</span>
          <span>Experts / Agencies: 680</span>
        </div>

        {/* Total Projects */}
        <div className="card">
          <p className="card-title">Total Projects</p>
          <h2>420</h2>
        </div>

        {/* Recent Activities */}
        <div className="card card-wide">
          <p className="card-title">Recent Activities</p>
          <ul>
            <li>New project posted</li>
            <li>Expert bid placed</li>
          </ul>
        </div>

      </section>
    </div>
  );
}