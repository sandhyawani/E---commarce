import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems, clearCart } = useCart();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location.pathname]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/categories?search=${encodeURIComponent(search.trim())}`);
    }
  };

  const handleLogout = () => {
    clearCart();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-3">
      <div className="container">
        {/* Logo */}
        <Link className="navbar-brand fw-bold fs-3 text-primary d-flex align-items-center" to="/">
          <i className="bi bi-bag-check-fill me-2 fs-2"></i>
          <span>My<span className="text-dark">Store</span></span>
        </Link>
        
        <button className="navbar-toggler border-0 shadow-none" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          {/* Search Bar - Centered */}
          <form className="d-flex mx-auto my-3 my-lg-0 w-100" style={{ maxWidth: "500px" }} onSubmit={handleSearchSubmit}>
            <div className="input-group">
              <input
                type="text"
                className="form-control bg-light border-0 shadow-none"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ borderRadius: "8px 0 0 8px", paddingLeft: "20px" }}
              />
              <button className="btn btn-primary" type="submit" style={{ borderRadius: "0 8px 8px 0", padding: "0 20px" }}>
                <i className="bi bi-search"></i>
              </button>
            </div>
          </form>

          {/* Right Links */}
          <ul className="navbar-nav align-items-center gap-2 gap-lg-3">
            <li className="nav-item d-none d-lg-block">
              <NavLink className="nav-link fw-semibold" to="/categories">Categories</NavLink>
            </li>
            
            {/* Cart Icon */}
            <li className="nav-item mx-2">
              <Link to="/checkout" className="position-relative text-dark text-decoration-none d-flex align-items-center gap-1">
                <i className="bi bi-cart3 fs-4"></i>
                <span className="fw-semibold d-lg-none">Cart</span>
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger shadow-sm" style={{ fontSize: "0.7rem", transform: "translate(-20%, -20%)" }}>
                    {totalItems}
                  </span>
                )}
              </Link>
            </li>

            {/* Account Dropdown */}
            {user ? (
              <li className="nav-item dropdown ms-lg-2">
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center gap-2 fw-semibold border-0 bg-transparent shadow-none"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <div className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
                    {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="d-none d-lg-inline text-truncate" style={{ maxWidth: "100px" }}>{user.name}</span>
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow-lg border-0 rounded-3 mt-2">
                  <li className="px-3 py-2 border-bottom mb-2">
                    <div className="fw-bold">{user.name}</div>
                    <small className="text-muted text-truncate d-block" style={{ maxWidth: "200px" }}>{user.userId}</small>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2 fw-medium" to="/profile">
                      <i className="bi bi-person me-2 text-muted"></i>Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item py-2 fw-medium" to="/orders">
                      <i className="bi bi-box-seam me-2 text-muted"></i>My Orders
                    </Link>
                  </li>
                  
                  {/* Admin Links */}
                  {user.isAdmin && (
                    <>
                      <li><hr className="dropdown-divider my-2" /></li>
                      <li className="px-3 pb-1 pt-0"><small className="text-muted fw-bold" style={{fontSize: "0.7rem", textTransform: "uppercase"}}>Admin Controls</small></li>
                      <li>
                        <Link className="dropdown-item py-2 fw-medium" to="/admin/products">
                          <i className="bi bi-grid me-2 text-muted"></i>Dashboard
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2 fw-medium" to="/add-product">
                          <i className="bi bi-plus-circle me-2 text-muted"></i>Add Product
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2 fw-medium" to="/admin/orders">
                          <i className="bi bi-receipt me-2 text-muted"></i>Manage Orders
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item py-2 fw-medium" to="/users">
                          <i className="bi bi-people me-2 text-muted"></i>Users
                        </Link>
                      </li>
                    </>
                  )}

                  <li><hr className="dropdown-divider my-2" /></li>
                  <li>
                    <button className="dropdown-item py-2 fw-medium text-danger" onClick={handleLogout}>
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                  </li>
                </ul>
              </li>
            ) : (
              <li className="nav-item d-flex gap-2 ms-lg-2 mt-3 mt-lg-0">
                <Link className="btn btn-outline-primary fw-semibold" to="/login">Login</Link>
                <Link className="btn btn-primary fw-semibold" to="/signup">Sign Up</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
