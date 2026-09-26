import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api";
import ProductCard from "../components/ProductCard";

export default function CategoryProducts() {
  const { slug } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await api.get(
        `/api/products?category=${slug}`
      );
      setProducts(data);
    };

    fetchProducts();
  }, [slug]);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-uppercase mb-0">
          {slug} Products
        </h2>
        <span className="text-muted">
          {products.length} Items found
        </span>
      </div>

      <div className="row g-4">
        {products.map((p) => (
          <div
            className="col-12 col-sm-6 col-md-4 col-lg-3"
            key={p._id}
          >
            <ProductCard item={p} />
          </div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-5">
          <h4>No products found</h4>
        </div>
      )}
    </div>
  );
}
