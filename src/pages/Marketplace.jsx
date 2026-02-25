// import { useState } from "react";

// export default function Marketplace() {
//   /* ================= PRODUCTS ================= */
//   const [products, setProducts] = useState([
//     {
//       name: "Website Development",
//       seller: "DesignPro Agency",
//       category: "Service",
//       price: "₹25,000",
//       stock: "—",
//       status: "pending",
//     },
//     {
//       name: "Hosting Plan",
//       seller: "HostEasy",
//       category: "Product",
//       price: "₹3,000",
//       stock: 120,
//       status: "active",
//     },
//   ]);

//   /* ================= ORDERS ================= */
//   const [orders] = useState([
//     {
//       id: "#ORD-501",
//       product: "Hosting Plan",
//       buyer: "Rahul Sharma",
//       seller: "HostEasy",
//       status: "active",
//       amount: "₹3,000",
//     },
//     {
//       id: "#ORD-502",
//       product: "UI Design Package",
//       buyer: "Anita Verma",
//       seller: "DesignPro Agency",
//       status: "open",
//       amount: "₹10,000",
//     },
//   ]);

//   /* ================= PRODUCT ACTIONS ================= */

//   const viewProduct = (p) => {
//     alert(
//       `Product/Service: ${p.name}\nSeller: ${p.seller}\nStatus: ${p.status}`
//     );
//   };

//   const approveProduct = (index) => {
//     if (!confirm(`Approve "${products[index].name}"?`)) return;
//     const updated = [...products];
//     updated[index].status = "active";
//     setProducts(updated);
//     alert("✅ Product approved");
//   };

//   const rejectProduct = (index) => {
//     if (!confirm(`Reject "${products[index].name}"?`)) return;
//     const updated = [...products];
//     updated[index].status = "blocked";
//     setProducts(updated);
//     alert("❌ Product rejected");
//   };

//   const removeProduct = (index) => {
//     if (!confirm(`Remove "${products[index].name}"?`)) return;
//     const updated = products.filter((_, i) => i !== index);
//     setProducts(updated);
//     alert("🗑️ Product removed");
//   };

//   const editProduct = (p) => {
//     alert(`✏️ Edit product: ${p.name}`);
//   };

//   /* ================= ORDER ACTIONS ================= */

//   const viewOrder = (o) => {
//     alert(
//       `Order ID: ${o.id}\nProduct: ${o.product}\nStatus: ${o.status}`
//     );
//   };

//   return (
//     <div className="marketplace-page">
//       <section className="content">
//         {/* ================= PRODUCT MANAGEMENT ================= */}
//         <div className="panel">
//           <h2>Product Management</h2>

//           <div className="table-wrapper">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Product / Service</th>
//                   <th>Seller</th>
//                   <th>Category</th>
//                   <th>Price</th>
//                   <th>Stock</th>
//                   <th>Status</th>
//                   <th>Admin Actions</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {products.map((p, i) => (
//                   <tr key={i}>
//                     <td>{p.name}</td>
//                     <td>{p.seller}</td>
//                     <td>{p.category}</td>
//                     <td>{p.price}</td>
//                     <td>{p.stock}</td>

//                     <td className={`status ${p.status}`}>
//                       {p.status === "pending" && "Pending"}
//                       {p.status === "active" && "Approved"}
//                       {p.status === "blocked" && "Rejected"}
//                     </td>

//                     <td className="actions">
//                       <button className="btn" onClick={() => viewProduct(p)}>
//                         View
//                       </button>

//                       {p.status === "pending" && (
//                         <>
//                           <button
//                             className="btn"
//                             onClick={() => approveProduct(i)}
//                           >
//                             Approve
//                           </button>
//                           <button
//                             className="btn danger"
//                             onClick={() => rejectProduct(i)}
//                           >
//                             Reject
//                           </button>
//                         </>
//                       )}

//                       {p.status === "active" && (
//                         <>
//                           <button
//                             className="btn"
//                             onClick={() => editProduct(p)}
//                           >
//                             Edit
//                           </button>
//                           <button
//                             className="btn danger"
//                             onClick={() => removeProduct(i)}
//                           >
//                             Remove
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

//         {/* ================= ORDERS MANAGEMENT ================= */}
//         <div className="panel">
//           <h2>Orders Management</h2>

//           <div className="table-wrapper">
//             <table>
//               <thead>
//                 <tr>
//                   <th>Order ID</th>
//                   <th>Product</th>
//                   <th>Buyer</th>
//                   <th>Seller</th>
//                   <th>Order Status</th>
//                   <th>Amount</th>
//                   <th>Details</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {orders.map((o, i) => (
//                   <tr key={i}>
//                     <td>{o.id}</td>
//                     <td>{o.product}</td>
//                     <td>{o.buyer}</td>
//                     <td>{o.seller}</td>

//                     <td className={`status ${o.status}`}>
//                       {o.status === "active" && "Completed"}
//                       {o.status === "open" && "Processing"}
//                     </td>

//                     <td>{o.amount}</td>

//                     <td>
//                       <button
//                         className="btn"
//                         onClick={() => viewOrder(o)}
//                       >
//                         View
//                       </button>
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
import { getAdminAds, deleteAd } from "../api/adApi";

export default function Marketplace() {
  const queryClient = useQueryClient();

  /* ================= GET ADS ================= */
  const { data: products, isLoading, isError } = useQuery({
    queryKey: ["admin-ads"],
    queryFn: getAdminAds,
  });

  /* ================= DELETE MUTATION ================= */
  const deleteMutation = useMutation({
    mutationFn: deleteAd,
    onSuccess: () => {
      queryClient.invalidateQueries(["admin-ads"]);
      alert("🗑️ Product removed successfully");
    },
  });

  const viewProduct = (p) => {
    alert(
      `Product/Service: ${p.title}\nSeller ID: ${p.clientId}\nStatus: ${p.status}`
    );
  };

  if (isLoading) return <p style={{ padding: "20px" }}>Loading products...</p>;
  if (isError) return <p style={{ padding: "20px" }}>Failed to load products.</p>;

  return (
    <div className="marketplace-page">
      <section className="content">

        {/* ================= PRODUCT MANAGEMENT ================= */}
        <div className="panel">
          <h2>Product Management</h2>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product / Service</th>
                  <th>Seller</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Admin Actions</th>
                </tr>
              </thead>

              <tbody>
                {products?.map((p) => (
                  <tr key={p.id}>
                    <td>{p.title}</td>
                    <td>{p.clientId}</td>
                    <td>{p.categoryId}</td>
                    <td>₹{p.price}</td>
                    <td>
                      {p.availableQuantity} {p.measurementUnit}
                    </td>

                    <td className={`status ${p.status.toLowerCase()}`}>
                      {p.status}
                    </td>

                    <td className="actions">
                      <button
                        className="btn"
                        onClick={() => viewProduct(p)}
                      >
                        View
                      </button>

                      <button
                        className="btn danger"
                        onClick={() => {
                          if (confirm(`Remove "${p.title}"?`)) {
                            deleteMutation.mutate(p.id);
                          }
                        }}
                        disabled={deleteMutation.isLoading}
                      >
                        {deleteMutation.isLoading
                          ? "Removing..."
                          : "Remove"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {products?.length === 0 && (
              <p style={{ padding: "20px" }}>
                No products available.
              </p>
            )}
          </div>
        </div>

      </section>
    </div>
  );
}