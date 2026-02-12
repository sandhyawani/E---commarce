import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  //  LOAD cart from localStorage on first render
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  //  SAVE cart whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id);
      if (exist) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + 1 }
            : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const increaseQty = (id) => {
    setCart((prev) => prev.map((item) => item._id === id ? { ...item, qty: item.qty + 1 } : item
    ));
  };
  const decreaseQty = (id) => {
    setCart((prev) => prev.map((item) =>
      item._id === id ? { ...item, qty: item.qty - 1 } : item)
      .filter((item) => item.qty > 0));
  };
  //  clear only after order
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalPrice = cart.reduce(
    (sum, item) => sum + item.qty * item.price, 0);
  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, totalItems, totalPrice, clearCart, }}>
      {children} </CartContext.Provider>);
}

export const useCart = () => useContext(CartContext);