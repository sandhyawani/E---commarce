import { createContext, useContext, useState, useEffect } from "react";
import api from "../api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user && user.token) {
        const { data } = await api.get("/api/cart");
        // Convert to match frontend expectations: _id, price, qty, etc.
        const mappedCart = data.items.map(item => ({
          ...item,
          _id: item.productId,
          qty: item.quantity
        }));
        setCart(mappedCart);
      }
    } catch (err) {
      console.error("Failed to fetch cart", err);
    }
  };

  const addToCart = async (product) => {
    try {
      const { data } = await api.post("/api/cart/add", { productId: product._id, quantity: 1 });
      updateLocalCart(data.items);
      alert("Added to cart");
    } catch (err) {
      alert(err.response?.data?.message || "Error adding to cart");
    }
  };

  const increaseQty = async (id) => {
    const item = cart.find(i => i._id === id);
    if (item) {
      try {
        const { data } = await api.put(`/api/cart/${id}`, { quantity: item.qty + 1 });
        updateLocalCart(data.items);
      } catch (err) {
        alert(err.response?.data?.message || "Cannot increase quantity");
      }
    }
  };

  const decreaseQty = async (id) => {
    const item = cart.find(i => i._id === id);
    if (item) {
      if (item.qty === 1) {
        try {
          const { data } = await api.delete(`/api/cart/${id}`);
          updateLocalCart(data.items);
        } catch (err) {
          alert("Error removing item");
        }
      } else {
        try {
          const { data } = await api.put(`/api/cart/${id}`, { quantity: item.qty - 1 });
          updateLocalCart(data.items);
        } catch (err) {
          alert("Error decreasing quantity");
        }
      }
    }
  };

  const removeFromCart = async (id) => {
     try {
        const { data } = await api.delete(`/api/cart/${id}`);
        updateLocalCart(data.items);
      } catch (err) {
        alert("Error removing item");
      }
  };

  const clearCart = async () => {
    try {
      await api.delete("/api/cart");
      setCart([]);
    } catch (err) {
      console.error("Failed to clear cart", err);
    }
  };

  const updateLocalCart = (items) => {
    const mappedCart = items.map(item => ({
      ...item,
      _id: item.productId,
      qty: item.quantity
    }));
    setCart(mappedCart);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart, totalItems, totalPrice, clearCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
