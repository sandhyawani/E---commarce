import { useEffect, useState } from "react";
import api from "../api";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";

export default function Categories() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get("search");

  const categoryImages = {
    beauty: "https://content.jdmagicbox.com/comp/datia/u1/9999p7522.7522.190127125200.q9u1/catalogue/venus-beauty-parlour-bada-bazar-datia-makeup-artists-qgw85zuapo.jpg",
    kitchen: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800",
    fashion: "https://img.theloom.in/blog/wp-content/uploads/2024/03/thumb3.png",
    electronics: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get(
          `/api/products`,
          {
            params: searchQuery ? { search: searchQuery } : {},
          }
        );
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }
if (searchQuery) {
    return (
      <div className="container py-5">
        <div className="text-center mb-5">
          <h6 className="text-primary fw-bold text-uppercase small ls-widest">Search Results</h6>
          <h2 className="fw-bold text-dark">Showing results for "{searchQuery}"</h2>
          <p className="text-muted">{products.length} products found</p>
        </div>

        <div className="row g-4">
          {products.map((item) => (
            <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={item._id}>
              <ProductCard item={item} />
            </div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-5 mt-4 bg-light rounded-4 border border-dashed">
            <i className="bi bi-search fs-1 text-muted d-block mb-3"></i>
            <h4 className="text-dark">No products found</h4>
            <p className="text-muted">Try adjusting your keywords or filters.</p>
          </div>
        )}
      </div>
    );
  }
  //  Category Grouping Logic 
  const grouped = products.reduce((acc, p) => {
    acc[p.category] = acc[p.category] || [];
    acc[p.category].push(p);
    return acc;
  }, {});

  return (
    <div className="container py-5">

      <div className="text-center mb-5">
        <h3 className="fw-bold text-dark">Shop by Categories</h3>
        <p className="text-muted mx-auto" style={{ maxWidth: "500px" }}>
          Browse our collections to find exactly what you're looking for.
        </p>
      </div>

      
      <div className="row g-4 justify-content-center">
        {Object.keys(grouped).map((cat) => (
          <CategoryCard
            key={cat}
            category={{
              slug: cat,
              name: cat,
              image: categoryImages[cat] || "https://via.placeholder.com/300",
            }}
            products={grouped[cat]}
          />
        ))}
      </div>
    </div>
  );
}


