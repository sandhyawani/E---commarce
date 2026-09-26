import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ item }) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const qty = cart.find((p) => p._id === item._id)?.qty || 0;
  
  let stockBadge = null;
  if (item.stock === 0) {
    stockBadge = <span className="badge badge-out-stock mb-2">Out of Stock</span>;
  } else if (item.stock <= 3) {
    stockBadge = <span className="badge badge-low-stock mb-2">Only {item.stock} left</span>;
  } else {
    stockBadge = <span className="badge badge-in-stock mb-2">In Stock</span>;
  }

  return (
    <div className="card h-100 product-card d-flex flex-column overflow-hidden position-relative">
      {/* Image Wrapper */}
      <div 
        className="product-img-wrapper" 
        onClick={() => navigate(`/product/${item._id}`)}
        style={{ cursor: "pointer" }}
      >
        <img src={item.image} alt={item.name} />
      </div>
      
      {/* Content */}
      <div className="card-body d-flex flex-column p-4">
        {stockBadge}
        <h6 
          className="fw-bold mb-1" 
          style={{ cursor: "pointer", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", lineHeight: "1.4" }} 
          onClick={() => navigate(`/product/${item._id}`)}
        >
          {item.name}
        </h6>
        
        {/* Rating Stars Mock */}
        <div className="d-flex align-items-center mb-2">
          <div className="text-warning small me-2">
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-fill"></i>
            <i className="bi bi-star-half"></i>
          </div>
          <small className="text-muted" style={{ fontSize: "0.75rem" }}>(42)</small>
        </div>

        <h5 className="text-primary fw-bold mb-3 mt-auto">?{item.price.toLocaleString()}</h5>
        
        {/* Actions */}
        <div className="d-flex flex-column gap-2 mt-2">
          {qty === 0 ? (
            <button 
              className="btn btn-outline-secondary w-100" 
              disabled={item.stock === 0}
              onClick={() => addToCart(item)}
            >
              <i className="bi bi-cart-plus me-2"></i>Add to Cart
            </button>
          ) : (
            <div className="d-flex justify-content-between align-items-center bg-light rounded px-2 py-1 border border-2 border-primary">
              <button className="btn btn-sm btn-link text-dark text-decoration-none px-2" onClick={() => decreaseQty(item._id)}>
                <i className="bi bi-dash-lg"></i>
              </button>
              <span className="fw-bold fs-6">{qty}</span>
              <button disabled={qty >= item.stock} className="btn btn-sm btn-link text-dark text-decoration-none px-2" onClick={() => increaseQty(item._id)}>
                <i className="bi bi-plus-lg"></i>
              </button>
            </div>
          )}
          
          <button 
            disabled={item.stock === 0}
            className="btn btn-primary w-100"
            onClick={() => {
              const user = localStorage.getItem("user");
              if (!user) { navigate("/login"); return; } 
              if (qty === 0) addToCart(item);
              navigate("/checkout");
            }} 
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}
