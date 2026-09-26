import { useEffect, useState } from "react";
import api from "../api";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get(`/api/orders`);
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await api.put(`/api/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  // UI Helper for status badge colors
  const getStatusClass = (status) => {
    switch (status) {
      case "Delivered": return "bg-success-subtle text-success border-success-subtle";
      case "Shipped": return "bg-info-subtle text-info border-info-subtle";
      case "Placed": return "bg-warning-subtle text-warning-emphasis border-warning-subtle";
      default: return "bg-secondary-subtle text-secondary";
    }
  };

  if (loading) {
    return (
      <div className="container mt-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Fetching latest orders...</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold m-0">Order Management</h2>
      </div>

      <div className="card shadow-sm border-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="ps-3">Order ID</th>
                <th>User ID</th>
                <th>Total Price</th>
                <th>Status</th>
                <th className="text-end pe-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-5 text-muted">
                    No orders found in the database.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="ps-3 font-monospace small">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>
                    <td>
                      <span className="text-muted small">{order.userId}</span>
                    </td>
                    <td className="fw-bold text-dark">
                      ₹{order.totalPrice.toLocaleString()}
                    </td>
                    <td>
                      <span className={`badge border ${getStatusClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="text-end pe-3">
                      <select
                        className="form-select form-select-sm d-inline-block w-auto"
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                      >
                        <option value="Placed">Placed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}