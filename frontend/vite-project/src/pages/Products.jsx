import React from "react";
import { products } from "../items/Product";
import ProductCard from "../components/ProductCard";

export default function Products() {
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">All Products</h2>

      <div className="row">
        {products.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}