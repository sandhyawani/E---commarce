import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const { totalItems } = useCart();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);
  }, [location.pathname]);

  useEffect(() => {
    const delay = setTimeout(() => {
      if (search.trim()) {
        navigate(`/categories?search=${encodeURIComponent(search)}`);
      } else if (location.pathname.startsWith("/categories") && search === "") {
        navigate("/categories");
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  const handleLogout = () => {
    clearCart();
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };
  const { clearCart } = useCart();
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white sticky-top shadow-sm py-2">
      <div className="container">
        <Link className="navbar-brand fw-bold fs-4 text-primary" to="/Home">
          <i className="bi bi-shop me-2"></i>My<span className="text-dark">Shop</span>
        </Link>
        <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navContent">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
            <li className="nav-item">
              <NavLink className="nav-link fw-medium px-3" to="/categories">Categories</NavLink>
            </li>
           
          </ul>
          <div className="d-flex align-items-center me-lg-4 my-2 my-lg-0 flex-grow-1 flex-lg-grow-0" style={{ maxWidth: "400px" }}>
            <div className="input-group bg-light rounded-pill px-3 py-1 border-0">
              <span className="input-group-text bg-transparent border-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                className="form-control bg-transparent border-0 shadow-none ps-0"
                placeholder="Search premium products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}  />
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <Link
              to="/cart"
              className="position-relative text-dark text-decoration-none" >
              <i className="bi bi-cart3 fs-4"></i>
              {totalItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{
                    fontSize: "0.65rem",
                    padding: "4px 6px",
                  }} >
                  {totalItems}
                </span>
              )}
            </Link>
            <div className="vr d-none d-lg-block mx-2 shadow-sm" style={{ height: '50px' }}></div>
            {user ? (
              <div className="dropdown">
                <button
                  className="btn btn-light rounded-pill dropdown-toggle d-flex align-items-center gap-2 fw-medium border shadow-sm"
                  type="button"
                  data-bs-toggle="dropdown" >
                  <i className="bi bi-person-circle fs-5 text-primary"></i>
                  Hi, {user.name}
                </button>

                <ul className="dropdown-menu dropdown-menu-end shadow border-0 mt-2">
                  <li>
                    <button
                      className="dropdown-item py-2"
                      onClick={() => navigate("/profile")} >
                      <i className="bi bi-person me-2"></i>Profile
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item py-2"
                      onClick={() => navigate("/orders")}  >
                      <i className="bi bi-bag me-2"></i>My Orders
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item py-2 text-danger"
                      onClick={handleLogout} >
                      <i className="bi bi-box-arrow-right me-2"></i>Logout
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item py-2"
                      onClick={() => navigate("/users")}>
                      <i className="bi bi-people me-2"></i>Users List
                    </button>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                   <li className="nav-item">
              <NavLink className="nav-link fw-medium px-3 text-nowrap" to="/add-product">Add Product</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium px-3 text-nowrap" to="/admin/products">Admin</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link fw-medium px-3 text-nowrap" to="/admin/orders">Admin Orders</NavLink>
            </li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <NavLink
                  className="btn btn-link text-decoration-none text-dark fw-medium"
                  to="/login">  Login
                </NavLink>
                <NavLink
                  className="btn btn-primary rounded-pill px-4 shadow-sm fw-medium"
                  to="/signup" > Signup
                </NavLink>
              </div> )}
          </div>
        </div>
      </div>
      <style>{`
        .nav-link.active { color: var(--bs-primary) !important; font-weight: 700; }
        .nav-link:hover { color: var(--bs-primary); }
      `}</style>
    </nav>
  );
}