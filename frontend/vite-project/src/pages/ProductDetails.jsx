import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { API_BASE_URL } from "../config";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(
          `${API_BASE_URL}/api/products/${id}`
        );
        setProduct(data);
      } catch (error) {
        console.error("Error loading product", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  const qty = cart.find((item) => item._id === product._id)?.qty || 0;

  return (
    <div className="container py-5">
      <button 
        className="btn btn-link text-decoration-none text-muted mb-4 ps-0"
        onClick={() => navigate(-1)}
      >
        <i className="bi bi-arrow-left me-2"></i>Back to Products
      </button>

      <div className="row g-4 justify-content-center">
        <div className="col-md-5">
          <div className="card border-0 rounded-4 shadow-sm bg-white p-3 d-flex align-items-center justify-content-center" style={{ minHeight: "400px" }}>
            <img
              src={product.image}
              alt={product.name}
              className="img-fluid"
              style={{ maxHeight: "350px", objectFit: "contain" }}
            />
          </div>
        </div>
        <div className="col-md-6 offset-md-1 d-flex flex-column justify-content-start pt-3">
          <div className="mb-3">
            <span className="badge bg-success-subtle text-success mb-2 px-3 py-2 rounded-pill small">
              Available in Stock
            </span>
            <h3 className="fw-bold text-dark mb-2">{product.name}</h3>
            
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="text-warning small">★★★★☆</span>
              <span className="text-muted small" style={{ fontSize: "0.85rem" }}>(42 reviews)</span>
            </div>

            <h4 className="text-primary fw-bold mb-3">
              ₹ {product.price}
            </h4>
            
            <p className="text-muted" style={{ fontSize: "1rem", lineHeight: "1.5" }}>
              {product.desc || product.description}
            </p>
          </div>

          <hr className="my-3 text-muted opacity-25" />
          <div className="d-flex flex-column gap-2" style={{ maxWidth: "400px" }}>
            {qty === 0 ? (
              <button
                className="btn btn-outline-dark w-100 rounded-2 py-2 fw-semibold"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            ) : (
              <div className="d-flex align-items-center justify-content-between p-2 border rounded-2 bg-light">
                <span className="small fw-semibold text-muted ms-2">Quantity:</span>
                <div className="d-flex align-items-center bg-white border rounded-pill px-1">
                  <button
                    className="btn btn-link text-dark text-decoration-none px-2 py-0"
                    onClick={() => decreaseQty(product._id)}
                    style={{ fontSize: "1.1rem" }}
                  >
                    −
                  </button>
                  <span className="fw-bold px-2">{qty}</span>
                  <button
                    className="btn btn-link text-dark text-decoration-none px-2 py-0"
                    onClick={() => increaseQty(product._id)}
                    style={{ fontSize: "1.1rem" }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}
            <button
              className="btn btn-primary w-100 rounded-2 py-2 fw-semibold shadow-sm"
              onClick={() => {
                const user = localStorage.getItem("user");
                if (!user) {
                  navigate("/login");
                  return;
                }
                addToCart(product);
                navigate("/checkout");
              }}
            >
              Buy Now
            </button>
          </div>
          <div className="mt-4 pt-3 d-flex gap-4 text-muted border-top" style={{ fontSize: "0.85rem" }}>
            <div className="d-flex align-items-center gap-1">
              <i className="bi bi-truck text-primary"></i> Fast Delivery
            </div>
            <div className="d-flex align-items-center gap-1">
              <i className="bi bi-shield-check text-primary"></i> Secure Payment
            </div>
            <div className="d-flex align-items-center gap-1">
              <i className="bi bi-arrow-counterclockwise text-primary"></i> 7 Day Return
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}