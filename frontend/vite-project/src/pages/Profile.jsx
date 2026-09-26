import { useEffect, useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const { data } = await api.get(
          `/api/users/profile/${user.userId}`
        );
        setForm(data);
      } catch (err) {
        console.error("Profile load error");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.put(
        `/api/users/profile/${form.userId}`,
        form
      );

      // Persist changes to local storage so the Navbar updates immediately
      localStorage.setItem(
        "user",
        JSON.stringify({
          userId: data.userId,
          name: `${data.firstName} ${data.lastName}`,
        })
      );

      alert("Profile updated successfully!");
      navigate("/categories");
    } catch (err) {
      alert("Update failed. Please check your connection.");
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2 text-muted">Retrieving your details...</p>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-7 col-lg-6">
          <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div className="bg-primary p-4 text-center text-white">
              <div 
                className="bg-white text-primary rounded-circle d-inline-flex align-items-center justify-content-center mb-3 shadow"
                style={{ width: "80px", height: "80px", fontSize: "2rem", fontWeight: "bold" }}
              >
                {form.firstName[0]}{form.lastName[0]}
              </div>
              <h4 className="fw-bold mb-0">{form.firstName} {form.lastName}</h4>
              <p className="small opacity-75 mb-0">User ID: {form.userId}</p>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6 mb-2">
                    <label className="form-label small fw-bold text-muted">First Name</label>
                    <input
                      name="firstName"
                      className="form-control form-control-lg bg-light border-0"
                      value={form.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-6 mb-2">
                    <label className="form-label small fw-bold text-muted">Last Name</label>
                    <input
                      name="lastName"
                      className="form-control form-control-lg bg-light border-0"
                      value={form.lastName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 mb-2">
                    <label className="form-label small fw-bold text-muted">Mobile Number</label>
                    <input
                      name="mobile"
                      className="form-control form-control-lg bg-light border-0"
                      value={form.mobile}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 mb-2">
                    <label className="form-label small fw-bold text-muted">City</label>
                    <input
                      name="city"
                      className="form-control form-control-lg bg-light border-0"
                      value={form.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 mb-4">
                    <label className="form-label small fw-bold text-muted">Shipping Address</label>
                    <textarea
                      name="address"
                      rows="3"
                      className="form-control form-control-lg bg-light border-0"
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12">
                    <button className="btn btn-primary btn-lg w-100 fw-bold shadow-sm py-3">
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          
          <div className="text-center mt-4">
            <button 
              className="btn btn-link text-danger text-decoration-none small"
              onClick={() => {
                localStorage.clear();
                navigate("/login");
              }}
            >
              Sign Out from this device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}