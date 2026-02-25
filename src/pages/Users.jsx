// import { useState } from "react";

// export default function Users() {
//   const [clients, setClients] = useState([
//     {
//       name: "Rahul Sharma",
//       email: "rahul@gmail.com",
//       projects: 5,
//       status: "active",
//     },
//     {
//       name: "Anita Verma",
//       email: "anita@gmail.com",
//       projects: 2,
//       status: "blocked",
//     },
//   ]);

//   const [experts, setExperts] = useState([
//     {
//       name: "Amit Patel",
//       skills: "Web Development",
//       rating: "4.6 ⭐",
//       status: "pending",
//     },
//     {
//       name: "DesignPro Agency",
//       skills: "UI / UX Design",
//       rating: "4.8 ⭐",
//       status: "active",
//     },
//   ]);

//   /* ================= CLIENT ACTIONS ================= */

//   const toggleClientStatus = (index) => {
//     const updated = [...clients];
//     const isBlocked = updated[index].status === "blocked";

//     updated[index].status = isBlocked ? "active" : "blocked";
//     setClients(updated);

//     alert(
//       `${updated[index].name} ${isBlocked ? "unblocked" : "blocked"}`
//     );
//   };

//   /* ================= EXPERT ACTIONS ================= */

//   const approveExpert = (index) => {
//     const updated = [...experts];
//     updated[index].status = "active";
//     setExperts(updated);
//     alert(`${updated[index].name} approved`);
//   };

//   const rejectExpert = (index) => {
//     const updated = [...experts];
//     updated[index].status = "blocked";
//     setExperts(updated);
//     alert(`${updated[index].name} rejected`);
//   };

//   return (
//     <div className="users-page">
//       <section className="content">
//         {/* ================= CLIENTS ================= */}
//         <div className="panel">
//           <h2>Clients Management</h2>

//           <div className="table-wrapper">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Client Name</th>
//                   <th>Email</th>
//                   <th>Projects</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {clients.map((c, i) => (
//                   <tr key={i}>
//                     <td>{c.name}</td>
//                     <td>{c.email}</td>
//                     <td>{c.projects}</td>

//                     <td className={`status ${c.status}`}>
//                       {c.status === "active" ? "Active" : "Blocked"}
//                     </td>

//                     <td className="actions">
//                       <button className="btn">Projects</button>
//                       <button className="btn">Complaints</button>

//                       <button
//                         className={`btn ${
//                           c.status === "active" ? "danger" : ""
//                         }`}
//                         onClick={() => toggleClientStatus(i)}
//                       >
//                         {c.status === "active" ? "Block" : "Unblock"}
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* ================= EXPERTS ================= */}
//         <div className="panel">
//           <h2>Experts / Agencies Management</h2>

//           <div className="table-wrapper">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Skills</th>
//                   <th>Rating</th>
//                   <th>Status</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {experts.map((e, i) => (
//                   <tr key={i}>
//                     <td>{e.name}</td>
//                     <td>{e.skills}</td>
//                     <td>{e.rating}</td>

//                     <td className={`status ${e.status}`}>
//                       {e.status === "pending" && "Pending Approval"}
//                       {e.status === "active" && "Active"}
//                       {e.status === "blocked" && "Rejected"}
//                     </td>

//                     <td className="actions">
//                       <button className="btn">View</button>

//                       {e.status === "pending" && (
//                         <>
//                           <button
//                             className="btn"
//                             onClick={() => approveExpert(i)}
//                           >
//                             Approve
//                           </button>

//                           <button
//                             className="btn danger"
//                             onClick={() => rejectExpert(i)}
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}

//                       {e.status === "active" && (
//                         <button
//                           className="btn danger"
//                           onClick={() => rejectExpert(i)}
//                         >
//                           Suspend
//                         </button>
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




import { useEffect, useState } from "react";
import { getAllUsers } from "../api/userApi";

export default function Users() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await getAllUsers({
        pageNo: 0,
        pageSize: 10,
        lastId: 5,
        lastCreatedAtMs: 1766071091472,
      });

      console.log("Full API Response:", response);

      // ✅ Correct array path based on your backend
      const usersArray = response?.data?.data || [];

      setClients(Array.isArray(usersArray) ? usersArray : []);

    } catch (err) {
      setError("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="users-page">
      <section className="content">
        <div className="panel">
          <h2>Clients Management</h2>

          {loading && <p>Loading users...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}

          {!loading && !error && (
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Created Date</th>
                  </tr>
                </thead>

                <tbody>
                  {clients.length > 0 ? (
                    clients.map((user) => (
                      <tr key={user.id}>
                        <td>{user.id}</td>
                        <td>{user.fullName}</td>
                        <td>{user.email}</td>
                        <td>{user.phone}</td>
                        <td>{user.role}</td>
                        <td
                          style={{
                            color:
                              user.status === "ACTIVE"
                                ? "green"
                                : "red",
                          }}
                        >
                          {user.status}
                        </td>
                        <td>{user.createdDate}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}