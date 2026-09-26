import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "#0f172a", color: "#94a3b8" }} className="py-5 mt-auto">
      <div className="container">
        <div className="row g-4 mb-4">
          {/* Brand */}
          <div className="col-12 col-md-4">
            <h5 className="fw-bold text-white mb-3">
              <i className="bi bi-bag-check-fill me-2 text-primary"></i>MyStore
            </h5>
            <p className="small" style={{ lineHeight: 1.8 }}>
              A full-stack MERN e-commerce platform with persistent cart,
              inventory management, role-based access control, and secure JWT authentication.
            </p>
          </div>

          {/* Company */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3">Company</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/about" className="text-decoration-none" style={{ color: "#94a3b8" }}>About Us</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-decoration-none" style={{ color: "#94a3b8" }}>Contact</Link></li>
            </ul>
          </div>

          {/* Customer */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3">Customer</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/orders" className="text-decoration-none" style={{ color: "#94a3b8" }}>My Orders</Link></li>
              <li className="mb-2"><Link to="/profile" className="text-decoration-none" style={{ color: "#94a3b8" }}>My Profile</Link></li>
              <li className="mb-2"><Link to="/returns" className="text-decoration-none" style={{ color: "#94a3b8" }}>Returns</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3">Legal</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/terms" className="text-decoration-none" style={{ color: "#94a3b8" }}>Terms of Service</Link></li>
              <li className="mb-2"><Link to="/privacy" className="text-decoration-none" style={{ color: "#94a3b8" }}>Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-6 col-md-2">
            <h6 className="fw-bold text-white mb-3">Shop</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/category/electronics" className="text-decoration-none" style={{ color: "#94a3b8" }}>Electronics</Link></li>
              <li className="mb-2"><Link to="/category/fashion" className="text-decoration-none" style={{ color: "#94a3b8" }}>Fashion</Link></li>
              <li className="mb-2"><Link to="/category/kitchen" className="text-decoration-none" style={{ color: "#94a3b8" }}>Kitchen</Link></li>
              <li className="mb-2"><Link to="/category/beauty" className="text-decoration-none" style={{ color: "#94a3b8" }}>Beauty</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-top pt-4 d-flex flex-column flex-md-row justify-content-between align-items-center gap-2"
             style={{ borderColor: "#1e293b !important" }}>
          <small>&copy; {new Date().getFullYear()} MyStore. All rights reserved.</small>
          <small>Built with React, Node.js, Express & MongoDB</small>
        </div>
      </div>
    </footer>
  );
}
