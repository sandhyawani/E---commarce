import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.userId) {
      setUserId(location.state.userId);
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!userId || !password) {
      setError("Please enter UserId and Password");
      return;
    }
    

    try {
      const { data } = await api.post(
        `/api/auth/login`,
        {
          userId,
          password,
        }
      );

      // Save logged-in user
     localStorage.setItem("user", JSON.stringify(data));

      // Redirect after login
      navigate("/cart");
    } catch (err) {
      setError("Invalid UserId or Password");
    }
  };

  const handleCancel = () => {
    setUserId("");
    setPassword("");
    setError("");
    navigate(-1);
  };

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="col-12 col-sm-8 col-md-6 col-lg-4">
        <div className="card border-0 shadow-sm rounded-4 p-4 p-md-5 bg-white">
          <div className="text-center mb-4">
            <div className="bg-primary-subtle d-inline-block p-3 rounded-circle mb-3">
              <i className="bi bi-shield-lock fs-2 text-primary"></i>
            </div>
            <h3 className="fw-bold text-dark">Welcome Back</h3>
            <p className="text-muted small">
              Please enter your details to sign in
            </p>
          </div>
          {error && (
            <div
              className="alert alert-danger py-2 text-center border-0 small rounded-3"
              role="alert"
            >
              <i className="bi bi-exclamation-circle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label small fw-bold text-muted text-uppercase">
                User ID
              </label>
              <div className="input-group bg-light rounded-3 px-2 border">
                <span className="input-group-text bg-transparent border-0">
                  <i className="bi bi-person text-muted"></i>
                </span>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 shadow-none"
                  placeholder="Enter your ID"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="form-label small fw-bold text-muted text-uppercase">
                Password
              </label>
              <div className="input-group bg-light rounded-3 px-2 border">
                <span className="input-group-text bg-transparent border-0">
                  <i className="bi bi-lock text-muted"></i>
                </span>
                <input
                  type="password"
                  className="form-control bg-transparent border-0 shadow-none"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="d-grid gap-2 mb-3">
              <button
                type="submit"
                className="btn btn-primary rounded-pill py-2 fw-bold shadow-sm"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="btn btn-link text-muted text-decoration-none small"
              >
                Cancel
              </button>
            </div>
          </form>
          <div className="text-center mt-3 pt-3 border-top">
            <p className="text-muted small">
              New here?{" "}
              <Link
                to="/signup"
                className="text-primary fw-bold text-decoration-none" >
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
