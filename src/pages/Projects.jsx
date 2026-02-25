// import { useState } from "react";

// export default function Projects() {
//   const [projects, setProjects] = useState([
//     {
//       name: "Website Redesign",
//       client: "ABC Corp",
//       status: "open",
//       bids: 12,
//       assignedTo: "—",
//     },
//     {
//       name: "Mobile App UI",
//       client: "XYZ Pvt Ltd",
//       status: "active",
//       bids: 8,
//       assignedTo: "Rahul Sharma",
//     },
//     {
//       name: "E-commerce Backend",
//       client: "ShopEase",
//       status: "completed",
//       bids: 15,
//       assignedTo: "Anita Verma",
//     },
//     {
//       name: "Logo Design",
//       client: "StartupX",
//       status: "blocked",
//       bids: 4,
//       assignedTo: "—",
//     },
//   ]);

//   /* ================= ACTIONS ================= */

//   const viewProject = (project) => {
//     alert(`Viewing project: ${project.name}\nClient: ${project.client}`);
//   };

//   const viewBids = (project) => {
//     alert(`Viewing bids for ${project.name}`);
//   };

//   const assignProject = (index) => {
//     const assignee = prompt("Assign project to:");
//     if (!assignee) return;

//     const updated = [...projects];
//     updated[index].assignedTo = assignee;
//     updated[index].status = "active";
//     setProjects(updated);

//     alert(`${projects[index].name} assigned to ${assignee}`);
//   };

//   const resolveDispute = (index) => {
//     const updated = [...projects];
//     updated[index].status = "active";
//     setProjects(updated);
//     alert(`Dispute resolved for ${projects[index].name}`);
//   };

//   const closeProject = (index) => {
//     if (!confirm(`Close project "${projects[index].name}"?`)) return;

//     const updated = [...projects];
//     updated[index].status = "blocked";
//     setProjects(updated);

//     alert(`${projects[index].name} closed`);
//   };

//   return (
//     <div className="projects-page">
//       <section className="content">
//         <div className="panel">
//           <h2>Project / Job Management</h2>

//           <div className="table-wrapper">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Project</th>
//                   <th>Client</th>
//                   <th>Status</th>
//                   <th>Bids</th>
//                   <th>Assigned To</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {projects.map((p, i) => (
//                   <tr key={i}>
//                     <td>{p.name}</td>
//                     <td>{p.client}</td>

//                     <td className={`status ${p.status}`}>
//                       {p.status === "open" && "New"}
//                       {p.status === "active" && "In Progress"}
//                       {p.status === "completed" && "Completed"}
//                       {p.status === "blocked" && "Cancelled"}
//                     </td>

//                     <td>{p.bids}</td>
//                     <td>{p.assignedTo}</td>

//                     <td className="actions">
//                       <button className="btn" onClick={() => viewProject(p)}>
//                         View
//                       </button>

//                       {p.status === "open" && (
//                         <>
//                           <button
//                             className="btn"
//                             onClick={() => viewBids(p)}
//                           >
//                             View Bids
//                           </button>

//                           <button
//                             className="btn"
//                             onClick={() => assignProject(i)}
//                           >
//                             Assign
//                           </button>
//                         </>
//                       )}

//                       {p.status === "active" && (
//                         <>
//                           <button
//                             className="btn"
//                             onClick={() => resolveDispute(i)}
//                           >
//                             Resolve Dispute
//                           </button>

//                           <button
//                             className="btn danger"
//                             onClick={() => closeProject(i)}
//                           >
//                             Close
//                           </button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }


import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAdminJobs,
  deleteJob,
  cancelJob,
} from "../api/jobsApi";

export default function Projects() {
  const queryClient = useQueryClient();

  /* ================= GET JOBS ================= */
  const { data: jobs, isLoading, isError } = useQuery({
    queryKey: ["admin-jobs"],
    queryFn: getAdminJobs,
  });

  /* ================= DELETE MUTATION ================= */
  const deleteMutation = useMutation({
    mutationFn: deleteJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-jobs"]);
      alert("Job deleted successfully");
    },
  });

  /* ================= CANCEL MUTATION ================= */
  const cancelMutation = useMutation({
    mutationFn: cancelJob,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-jobs"]);
      alert("Job cancelled successfully");
    },
  });

  if (isLoading) return <p>Loading jobs...</p>;
  if (isError) return <p>Error loading jobs</p>;

  return (
    <div className="projects-page">
      <section className="content">
        <div className="panel">
          <h2>Project / Job Management</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Budget</th>
                  <th>Payment</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {jobs?.map((job) => (
                  <tr key={job.id}>
                    <td>{job.title}</td>

                    <td className={`status ${job.status.toLowerCase()}`}>
                         {job.status}
                    </td>

                    <td>
                      {job.budgetMin} - {job.budgetMax} {job.currency}
                    </td>

                    <td>{job.paymentMode}</td>

                    <td>
                      {/* Cancel Button */}
                      {job.status !== "CANCELLED" && (
                        <button className="btn"
                          onClick={() => {
                            if (
                              confirm(
                                `Cancel job "${job.title}"?`
                              )
                            ) {
                              cancelMutation.mutate(job.id);
                            }
                          }}
                          disabled={cancelMutation.isLoading}
                          style={{ marginRight: "8px" }}
                        >
                          {cancelMutation.isLoading
                            ? "Cancelling..."
                            : "Cancel"}
                        </button>
                      )}

                      {/* Delete Button */}
                      <button className="btn danger"
                        onClick={() => {
                          if (
                            confirm(
                              `Delete job "${job.title}"?`
                            )
                          ) {
                            deleteMutation.mutate(job.id);
                          }
                        }}
                        disabled={deleteMutation.isLoading}
                        style={{ background: "red", color: "white" }}
                      >
                        {deleteMutation.isLoading
                          ? "Deleting..."
                          : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {jobs?.length === 0 && (
              <p>No jobs available.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
