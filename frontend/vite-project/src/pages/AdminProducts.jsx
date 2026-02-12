import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      alert("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold text-dark mb-1">Product Inventory</h2>
          <p className="text-muted small">Manage your store's catalog and stock</p>
        </div>
        <button 
          className="btn btn-primary d-flex align-items-center gap-2 shadow-sm"
          onClick={() => navigate("/add-product")} >
          <span>+ Add New Product</span>
        </button>
      </div>
      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="bg-light">
              <tr>
                <th className="ps-4 py-3 text-uppercase fs-xs text-muted">Preview</th>
                <th className="py-3 text-uppercase fs-xs text-muted">Product Info</th>
                <th className="py-3 text-uppercase fs-xs text-muted">Category</th>
                <th className="py-3 text-uppercase fs-xs text-muted">Price</th>
                <th className="pe-4 py-3 text-end text-uppercase fs-xs text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p._id}>
                    <td className="ps-4">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="rounded border shadow-sm"
                        style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        onError={(e) => (e.target.src = "https://via.placeholder.com/50")}
                      />
                    </td>
                    <td>
                      <div className="fw-bold text-dark">{p.name}</div>
                      <div className="text-muted extra-small">ID: {p._id.slice(-6).toUpperCase()}</div>
                    </td>
                    <td>
                      <span className="badge rounded-pill bg-light text-dark border text-capitalize">
                        {p.category}
                      </span>
                    </td>
                    <td>
                      <span className="fw-semibold text-primary">₹{p.price.toLocaleString()}</span>
                    </td>
                    <td className="pe-4 text-end">
                      <div className="btn-group shadow-sm">
                        <button
                          className="btn btn-white btn-sm border"
                          title="Edit Product"
                          onClick={() => navigate(`/edit-product/${p._id}`)}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-white btn-sm border text-danger"
                          title="Delete Product"
                          onClick={() => handleDelete(p._id)}
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-5">
                    <div className="text-muted">
                      <p className="mb-0">No products available in the inventory.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}