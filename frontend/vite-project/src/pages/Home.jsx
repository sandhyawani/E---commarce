import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import ProductCard from "../components/ProductCard";

const CATEGORIES = [
  { label: "Electronics", slug: "electronics", icon: "bi-phone" },
  { label: "Fashion",     slug: "fashion",     icon: "bi-bag" },
  { label: "Kitchen",     slug: "kitchen",     icon: "bi-cup-hot" },
  { label: "Beauty",      slug: "beauty",      icon: "bi-stars" },
];

function SkeletonCard() {
  return (
    <div className="card product-card h-100">
      <div className="skeleton skeleton-img"></div>
      <div className="card-body p-4">
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text" style={{ width: "60%" }}></div>
        <div className="skeleton skeleton-title mt-2"></div>
        <div className="skeleton skeleton-btn mt-3"></div>
        <div className="skeleton skeleton-btn mt-2"></div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    setLoading(true);
    setError(false);
    try {
      const { data } = await api.get("/api/products");
      setProducts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const featured = products.slice(0, 4);
  const newest   = [...products].reverse().slice(0, 4);

  return (
    <div style={{ backgroundColor: "var(--bg-color)" }}>

      {/* Hero */}
      <div style={{ background: "linear-gradient(135deg, #2563eb 0%, #1e40af 100%)" }} className="py-5">
        <div className="container py-4">
          <div className="row align-items-center">
            <div className="col-md-8 col-lg-6">
              <h1 className="display-4 fw-bold text-white mb-3 lh-sm">
                Discover Our Latest Products
              </h1>
              <p className="lead mb-4" style={{ color: "rgba(255,255,255,0.7)" }}>
                Browse our curated catalogue across Electronics, Fashion, Kitchen, and Beauty.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <button className="btn btn-light fw-bold px-4 py-2" onClick={() => navigate("/categories")}>
                  Shop Now <i className="bi bi-arrow-right ms-2"></i>
                </button>
                <button className="btn btn-outline-light fw-semibold px-4 py-2" onClick={() => navigate("/categories")}>
                  Browse Categories
                </button>
              </div>
            </div>
            <div className="col-md-4 d-none d-md-flex justify-content-center pt-4 pt-md-0">
              <i className="bi bi-bag-check-fill" style={{ fontSize: "8rem", color: "rgba(255,255,255,0.2)" }}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="container py-5">
        <h2 className="fw-bold mb-4">Shop by Category</h2>
        <div className="row g-3">
          {CATEGORIES.map(c => (
            <div key={c.slug} className="col-6 col-md-3">
              <div
                className="card border-0 shadow-sm text-center p-4 h-100"
                style={{ cursor: "pointer", borderRadius: "var(--border-radius)", transition: "all 0.2s" }}
                onClick={() => navigate(`/category/${c.slug}`)}
                onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
              >
                <i className={`bi ${c.icon} fs-1 text-primary mb-3 d-block`}></i>
                <h6 className="fw-bold mb-0">{c.label}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div className="container pb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fw-bold mb-0">Featured Products</h2>
          <button className="btn btn-outline-primary btn-sm fw-semibold" onClick={() => navigate("/categories")}>
            View All <i className="bi bi-arrow-right ms-1"></i>
          </button>
        </div>

        {error ? (
          <div className="empty-state">
            <i className="bi bi-wifi-off"></i>
            <h5 className="fw-bold">Could not load products</h5>
            <p className="text-muted mb-4">Check your connection and try again.</p>
            <button className="btn btn-primary" onClick={fetchProducts}>
              <i className="bi bi-arrow-clockwise me-2"></i>Try Again
            </button>
          </div>
        ) : loading ? (
          <div className="row g-4">
            {[1,2,3,4].map(i => <div key={i} className="col-12 col-sm-6 col-md-4 col-lg-3"><SkeletonCard /></div>)}
          </div>
        ) : featured.length === 0 ? (
          <div className="empty-state">
            <i className="bi bi-box-seam"></i>
            <h5 className="fw-bold">No products yet</h5>
            <p className="text-muted">Check back soon for new arrivals.</p>
          </div>
        ) : (
          <div className="row g-4">
            {featured.map(p => (
              <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                <ProductCard item={p} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* New Arrivals */}
      {!loading && newest.length > 0 && (
        <div style={{ backgroundColor: "#f1f5f9" }} className="py-5">
          <div className="container">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h2 className="fw-bold mb-0">New Arrivals</h2>
              <button className="btn btn-outline-primary btn-sm fw-semibold" onClick={() => navigate("/categories")}>
                View All <i className="bi bi-arrow-right ms-1"></i>
              </button>
            </div>
            <div className="row g-4">
              {newest.map(p => (
                <div key={p._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                  <ProductCard item={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Why Shop With Us */}
      <div className="container py-5">
        <h2 className="fw-bold text-center mb-5">Why Shop With Us?</h2>
        <div className="row g-4 text-center">
          {[
            { icon: "bi-shield-check", title: "Secure Payments",   text: "Your data is protected with JWT authentication and encrypted connections." },
            { icon: "bi-arrow-repeat", title: "Easy Returns",      text: "Contact us within 7 days of delivery and we will arrange your return." },
            { icon: "bi-headset",      title: "Customer Support",  text: "Reach us through our contact page for any product or order queries." },
            { icon: "bi-bag-check",    title: "Verified Products", text: "Every item is reviewed by our admin team before it is listed for sale." },
          ].map(f => (
            <div key={f.icon} className="col-6 col-md-3">
              <div className="card border-0 shadow-sm p-4 h-100" style={{ borderRadius: "var(--border-radius)" }}>
                <i className={`bi ${f.icon} fs-1 text-primary mb-3 d-block`}></i>
                <h6 className="fw-bold">{f.title}</h6>
                <p className="text-muted small mb-0">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
