import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import HomePage from "./pages/Home";
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

import About from "./pages/About";
import Contact from "./pages/Contact";
import Returns from "./pages/Returns";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/"           element={<HomePage />} />
          <Route path="/home"       element={<HomePage />} />

          <Route path="/login"      element={<Login />} />
          <Route path="/signup"     element={<Signup />} />

          <Route path="/categories"         element={<Categories />} />
          <Route path="/category/:slug"     element={<CategoryProducts />} />
          <Route path="/product/:id"        element={<ProductDetails />} />

          <Route path="/cart"           element={<Cart />} />
          <Route path="/checkout"       element={<Checkout />} />
          <Route path="/order-success"  element={<OrderSuccess />} />
          <Route path="/orders"         element={<Orders />} />

          <Route path="/profile"        element={<Profile />} />
          <Route path="/users"          element={<Users />} />
          <Route path="/edit-user/:id"  element={<EditUser />} />

          <Route path="/add-product"          element={<AddProduct />} />
          <Route path="/admin/products"       element={<AdminProducts />} />
          <Route path="/edit-product/:id"     element={<EditProduct />} />
          <Route path="/admin/orders"         element={<AdminOrders />} />

          {/* Static Pages */}
          <Route path="/about"    element={<About />} />
          <Route path="/contact"  element={<Contact />} />
          <Route path="/returns"  element={<Returns />} />
          <Route path="/terms"    element={<Terms />} />
          <Route path="/privacy"  element={<Privacy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
