import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, addToCart, decreaseQty, totalItems, totalPrice } = useCart();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center gap-3 mb-4">
        <h2 className="fw-bold m-0">Shopping Cart</h2>
        <span className="badge bg-primary rounded-pill fs-6">
          {totalItems} Items
        </span>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          {cart.length === 0 ? (
            <div className="text-center py-5 border rounded bg-light shadow-sm">
              <div className="display-1 mb-3">🛒</div>
              <h4 className="fw-bold">Your cart is empty!</h4>
              <p className="text-muted">
                Explore our products and add some items.
              </p>
              <button
                className="btn btn-primary btn-lg mt-2 px-5"
                onClick={() => navigate("/")}
              >
                Shop Now
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item._id}
                className="card border-0 shadow-sm mb-3 overflow-hidden"
              >
                <div className="card-body p-0">
                  <div className="d-flex flex-column flex-sm-row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="img-fluid"
                      style={{
                        width: "160px",
                        height: "160px",
                        objectFit: "cover",
                      }}
                    />
                    <div className="p-3 flex-grow-1 d-flex flex-column justify-content-between">
                      <div>
                        <h5 className="fw-bold mb-1">{item.name}</h5>
                        <span className="badge bg-light text-secondary border text-capitalize">
                          {item.category}
                        </span>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <div className="d-flex align-items-center border rounded-pill overflow-hidden bg-light">
                          <button
                            className="btn btn-sm px-3 py-1 border-0"
                            onClick={() => decreaseQty(item._id)}
                          >
                            -
                          </button>
                          <span className="px-3 fw-bold">
                            {item.qty || 1}
                          </span>
                          <button
                            className="btn btn-sm px-3 py-1 border-0"
                            onClick={() => addToCart(item)}
                          >
                            +
                          </button>
                        </div>
                        <div className="text-primary fw-bold fs-5">
                          ₹
                          {(item.price * (item.qty || 1)).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="col-lg-4">
          <div
            className="card border-0 shadow-sm sticky-top"
            style={{ top: "2rem" }}
          >
            <div className="card-body p-2">
              <h5 className="fw-bold mb-4 border-bottom pb-2">
                Price Details
              </h5>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-muted">
                  Price ({totalItems} items)
                </span>
                <span>₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 text-success">
                <span>Delivery Charges</span>
                <span>FREE</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between align-items-center mb-4">
                <span className="fw-bold fs-5">Total Amount</span>
                <span className="fw-bold fs-4 text-dark">
                  ₹{totalPrice.toLocaleString()}
                </span>
              </div>

              {user ? (
                <button
                  className="btn btn-warning btn-lg w-100 fw-bold py-2 shadow"
                  disabled={cart.length === 0}
                  onClick={() => navigate("/checkout")}
                >
                  Place Order
                </button>
              ) : (
                <button
                  className="btn btn-outline-primary btn-lg w-100 fw-bold py-2"
                  onClick={() => navigate("/login")}
                
                >
                 Login or Signup to Place Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
