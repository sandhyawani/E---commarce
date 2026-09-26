import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ item }) {
  const { cart, addToCart, increaseQty, decreaseQty } = useCart();
  const navigate = useNavigate();

  const qty = cart.find((p) => p._id === item._id)?.qty || 0;
  return (<div className="card h-100 border-0 shadow-sm rounded-4 overflow-hidden product-card">
    <div className="bg-white d-flex align-items-center justify-content-center p-3" style={{ height: "220px", borderBottom: "1px solid #eee" }}>
      <img src={item.image} alt={item.name} className="img-fluid"
        style={{
          maxHeight: "100%",
          objectFit: "contain",
          cursor: "pointer",
        }} onClick={() => navigate(`/product/${item._id}`)} /></div>
    <div className="card-body d-flex flex-column p-3">
      <h6 className="fw-bold text-truncate" style={{ cursor: "pointer" }} onClick={() => navigate(`/product/${item._id}`)} >
        {item.name} </h6>
      <h5 className="text-primary fw-bold mb-3">  ₹ {item.price}</h5>
      <div className="mt-auto">{qty === 0 ? (<button className="btn btn-outline-dark w-100 rounded-pill mb-2"
        onClick={() => addToCart(item)} > Add to Cart </button>
      ) : (<div className="d-flex justify-content-between align-items-center bg-light rounded-pill border px-2 py-1 mb-2">
        <button className="btn btn-outline-danger p-0 px-2" onClick={() => decreaseQty(item._id)} >
          − </button> <span className="fw-bold">{qty}</span><button
            className="btn btn-outline-success text-white p-0 px-2" onClick={() => increaseQty(item._id)}> + </button>  </div>)} <button
              className="btn btn-primary w-100 rounded-pill"
              onClick={() => {
                const user = localStorage.getItem("user");
                if (!user) { navigate("/login"); return; } addToCart(item);
                navigate("/checkout");
              }} >  Buy Now </button> </div> </div></div>);
}

