import { useState } from "react";

export default function Projects() {
  const [projects, setProjects] = useState([
    {
      name: "Website Redesign",
      client: "ABC Corp",
      status: "open",
      bids: 12,
      assignedTo: "—",
    },
    {
      name: "Mobile App UI",
      client: "XYZ Pvt Ltd",
      status: "active",
      bids: 8,
      assignedTo: "Rahul Sharma",
    },
    {
      name: "E-commerce Backend",
      client: "ShopEase",
      status: "completed",
      bids: 15,
      assignedTo: "Anita Verma",
    },
    {
      name: "Logo Design",
      client: "StartupX",
      status: "blocked",
      bids: 4,
      assignedTo: "—",
    },
  ]);

  /* ================= ACTIONS ================= */

  const viewProject = (project) => {
    alert(`Viewing project: ${project.name}\nClient: ${project.client}`);
  };

  const viewBids = (project) => {
    alert(`Viewing bids for ${project.name}`);
  };

  const assignProject = (index) => {
    const assignee = prompt("Assign project to:");
    if (!assignee) return;

    const updated = [...projects];
    updated[index].assignedTo = assignee;
    updated[index].status = "active";
    setProjects(updated);

    alert(`${projects[index].name} assigned to ${assignee}`);
  };

  const resolveDispute = (index) => {
    const updated = [...projects];
    updated[index].status = "active";
    setProjects(updated);
    alert(`Dispute resolved for ${projects[index].name}`);
  };

  const closeProject = (index) => {
    if (!confirm(`Close project "${projects[index].name}"?`)) return;

    const updated = [...projects];
    updated[index].status = "blocked";
    setProjects(updated);

    alert(`${projects[index].name} closed`);
  };

  return (
    <div className="projects-page">
      <section className="content">
        <div className="panel">
          <h2>Project / Job Management</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Project</th>
                  <th>Client</th>
                  <th>Status</th>
                  <th>Bids</th>
                  <th>Assigned To</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {projects.map((p, i) => (
                  <tr key={i}>
                    <td>{p.name}</td>
                    <td>{p.client}</td>

                    <td className={`status ${p.status}`}>
                      {p.status === "open" && "New"}
                      {p.status === "active" && "In Progress"}
                      {p.status === "completed" && "Completed"}
                      {p.status === "blocked" && "Cancelled"}
                    </td>

                    <td>{p.bids}</td>
                    <td>{p.assignedTo}</td>

                    <td className="actions">
                      <button className="btn" onClick={() => viewProject(p)}>
                        View
                      </button>

                      {p.status === "open" && (
                        <>
                          <button
                            className="btn"
                            onClick={() => viewBids(p)}
                          >
                            View Bids
                          </button>

                          <button
                            className="btn"
                            onClick={() => assignProject(i)}
                          >
                            Assign
                          </button>
                        </>
                      )}

                      {p.status === "active" && (
                        <>
                          <button
                            className="btn"
                            onClick={() => resolveDispute(i)}
                          >
                            Resolve Dispute
                          </button>

                          <button
                            className="btn danger"
                            onClick={() => closeProject(i)}
                          >
                            Close
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}