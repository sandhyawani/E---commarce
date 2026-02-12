import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Categories from "./pages/Categories";
import CategoryProducts from "./pages/CategoryProducts";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AddProduct from "./pages/AddProduct";
import AdminProducts from "./pages/AdminProducts";
import EditProduct from "./pages/EditProduct";
import Users from "./pages/Users";
import EditUser from "./pages/EditUser";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import AdminOrders from "./pages/AdminOrders";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/categories" element={<Categories />} />
        <Route path="/category/:slug" element={<CategoryProducts />} />
        <Route path="/product/:id" element={<ProductDetails />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<Orders />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/users" element={<Users />} />
        <Route path="/edit-user/:id" element={<EditUser />} />

        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
        <Route path="/admin/orders" element={<AdminOrders />} /> 
      </Routes>
    </>
  );
}
