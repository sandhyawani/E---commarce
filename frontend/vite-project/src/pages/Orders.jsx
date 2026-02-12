import { useEffect, useState } from "react";
import axios from "axios";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:5000/api/orders/user/${user.userId}`
        );
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (user?.userId) fetchOrders();
  }, []);

  // Helper to style status badges
  const getStatusBadge = (status) => {
    const statusLower = status.toLowerCase();
    if (statusLower === "delivered") return "bg-success";
    if (statusLower === "shipped") return "bg-info text-dark";
    if (statusLower === "processing") return "bg-warning text-dark";
    return "bg-secondary";
  };
  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">My Orders</h2>
        <span className="badge bg-primary rounded-pill">{orders.length} Orders</span>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-5 shadow-sm rounded bg-light">
          <p className="text-muted">You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="row">
          {orders.map((order) => (
            <div key={order._id} className="col-12 mb-4">
              <div className="card border-0 shadow-sm">
                <div className="card-header bg-white d-flex justify-content-between align-items-center py-3">
                  <div>
                    <small className="text-muted d-block">ORDER ID</small>
                    <span className="fw-medium text-uppercase">#{order._id.slice(-8)}</span>
                  </div>
                  <span className={`badge ${getStatusBadge(order.status)} px-3 py-2`}>
                    {order.status}
                  </span>
                </div>
                <div className="card-body">
                  {order.items.map((item, i) => (
                    <div key={i} className="d-flex align-items-center gap-3 mb-3 pb-3 border-bottom-last-child">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="rounded border"
                        style={{ width: "70px", height: "70px", objectFit: "cover" }} 
                      />
                      <div className="flex-grow-1">
                        <h6 className="mb-0 fw-bold">{item.name}</h6>
                        <small className="text-muted">Quantity: {item.qty}</small>
                      </div>
                      <div className="text-end">
                        <span className="fw-medium">₹ {item.price || (order.totalPrice / item.qty).toFixed(2)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="card-footer bg-light d-flex justify-content-between align-items-center py-3">
                  <span className="text-muted">Order Total:</span>
                  <h5 className="mb-0 fw-bold text-primary">₹ {order.totalPrice}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}