import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Checkout() {
  const { cart, totalItems, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [payment, setPayment] = useState("cod");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      alert("Please login to place order");
      navigate("/login");
    }
  }, [navigate]);

  const handleBuy = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    try {
      await axios.post("http://localhost:5000/api/orders", {
        userId: user.userId,
        items: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          qty: item.qty,
          image: item.image,
        })),
        totalItems,
        totalPrice,
        paymentMethod: payment,
      });

      clearCart();
      navigate("/order-success");
    } catch (err) {
      alert("Order failed");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">Finalize Your Order</h2>

      <div className="row g-4">
  
        <div className="col-md-7">
          <div className="card border-0 shadow-sm p-4">
            <h5 className="fw-bold mb-4">Payment Method</h5>
            
            <div className="d-flex flex-column gap-3">
              <label className={`p-3 border rounded d-flex align-items-center cursor-pointer transition-all ${payment === "cod" ? "border-primary bg-primary-subtle" : "bg-light"}`}>
                <input
                  type="radio"
                  className="form-check-input me-3"
                  name="payment"
                  value="cod"
                  checked={payment === "cod"}
                  onChange={(e) => setPayment(e.target.value)}
                />
                <div>
                  <div className="fw-bold">Cash on Delivery</div>
                  <small className="text-muted">Pay when you receive the package</small>
                </div>
              </label>
              <label className={`p-3 border rounded d-flex align-items-center cursor-pointer ${payment === "upi" ? "border-primary bg-primary-subtle" : "bg-light"}`}>
                <input
                  type="radio"
                  className="form-check-input me-3"
                  name="payment"
                  value="upi"
                  onChange={(e) => setPayment(e.target.value)}
                />
                <div>
                  <div className="fw-bold">UPI (GPay / PhonePe / Paytm)</div>
                  <small className="text-muted">Instant digital payment</small>
                </div>
              </label>

              <label className={`p-3 border rounded d-flex align-items-center cursor-pointer ${payment === "card" ? "border-primary bg-primary-subtle" : "bg-light"}`}>
                <input
                  type="radio"
                  className="form-check-input me-3"
                  name="payment"
                  value="card"
                  onChange={(e) => setPayment(e.target.value)}
                />
                <div>
                  <div className="fw-bold">Debit / Credit Card</div>
                  <small className="text-muted">Visa, Mastercard, RuPay</small>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h5 className="fw-bold mb-3">Order Summary</h5>
              <div className="mb-4">
                {cart.map((item) => (
                  <div key={item._id} className="d-flex justify-content-between small mb-2 border-bottom pb-2">
                    <span className="text-muted">{item.name} (x{item.qty})</span>
                    <span className="fw-medium">₹{(item.price * item.qty).toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="d-flex justify-content-between mb-2 fs-6">
                <span>Total Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold fs-5">Amount Payable</span>
                <span className="fw-bold fs-3 text-success">₹{totalPrice.toLocaleString()}</span>
              </div>

              <button
                className="btn btn-success btn-lg w-100 py-3 fw-bold shadow-sm rounded-3"
                onClick={handleBuy}
              >
                Confirm Order
              </button>
              <p className="text-center text-muted mt-3 small">
                By placing the order, you agree to our Terms & Conditions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}