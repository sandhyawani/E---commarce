import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/users");
      setUsers(res.data);
    } catch (err) {
      console.error("Failed to fetch users", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      alert("User deleted");
      fetchUsers();
    } catch (err) {
      alert("Error deleting user");
    }
  };

  return (
    <div className="container py-5">
 
      <div className="d-flex justify-content-between align-items-end mb-4">
        <div>
          <h2 className="fw-bold mb-1">User Management</h2>
          <p className="text-muted mb-0">View and manage registered customers</p>
        </div>
        <div className="text-end">
          <span className="badge bg-primary-subtle text-primary px-3 py-2 rounded-pill">
            Total Users: {users.length}
          </span>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4 border-0 text-muted small text-uppercase">User Details</th>
                <th className="border-0 text-muted small text-uppercase">Contact</th>
                <th className="border-0 text-muted small text-uppercase">Location</th>
                <th className="pe-4 border-0 text-muted small text-uppercase text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((u) => (
                  <tr key={u._id}>
                    <td className="ps-4">
                      <div className="d-flex align-items-center gap-3">
                        <div 
                          className="rounded-circle bg-secondary d-flex align-items-center justify-content-center text-white fw-bold"
                          style={{ width: "40px", height: "40px", fontSize: "14px" }}
                        >
                          {u.firstName[0]}{u.lastName[0]}
                        </div>
                        <div>
                          <div className="fw-bold text-dark">{u.firstName} {u.lastName}</div>
                          <div className="text-muted extra-small font-monospace">ID: {u.userId}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="small text-dark">{u.mobile}</div>
                    </td>
                    <td>
                      <div className="small text-dark">{u.city}, {u.state}</div>
                      <div className="text-muted extra-small text-uppercase">{u.country}</div>
                    </td>
                    <td className="pe-4 text-end">
                      <div className="btn-group">
                        <button
                          className="btn btn-outline-primary btn-sm px-3"
                          onClick={() => navigate(`/edit-user/${u._id}`)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-outline-danger btn-sm px-3"
                          onClick={() => handleDelete(u._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">
                    No users registered in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}