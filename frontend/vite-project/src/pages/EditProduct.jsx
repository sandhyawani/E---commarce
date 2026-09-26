import { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import api from "../api";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    desc: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        setData(res.data);
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/api/products/${id}`, data);
      alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (err) {
      alert("Failed to update product");
    }
  };

  return (
    <div className="container py-5">
      <div className="d-flex align-items-center mb-4">
        <Link to="/admin/products" className="btn btn-outline-secondary btn-sm me-3">
          ← Back
        </Link>
        <h2 className="fw-bold mb-0">Edit Product</h2>
      </div>

      <div className="row g-4">
        <div className="col-lg-8">
          <form onSubmit={handleSubmit} className="card border-0 shadow-sm p-4">
            <div className="row g-3">
              <div className="col-12">
                <label className="form-label fw-semibold">Product Name</label>
                <input
                  className="form-control bg-light"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="e.g. Premium Leather Jacket"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Category</label>
                <input
                  className="form-control bg-light"
                  name="category"
                  value={data.category}
                  onChange={handleChange}
                  placeholder="Fashion"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Price (₹)</label>
                <input
                  type="number"
                  className="form-control bg-light"
                  name="price"
                  value={data.price}
                  onChange={handleChange}
                  placeholder="0.00"
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Image URL</label>
                <input
                  className="form-control bg-light"
                  name="image"
                  value={data.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">desc</label>
                <textarea
                  className="form-control bg-light"
                  name="desc"
                  rows="4"
                  value={data.desc}
                  onChange={handleChange}
                  placeholder="Describe the product features..."
                />
              </div>

              <div className="col-12 pt-2">
                <button className="btn btn-primary btn-lg w-100 shadow-sm">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm overflow-hidden h-100 text-center p-4 bg-light border-dashed">
            <h6 className="text-muted text-uppercase small fw-bold mb-3">Live Preview</h6>
            <div className="mb-3 rounded overflow-hidden shadow-sm bg-white" style={{ minHeight: "200px" }}>
              {data.image ? (
                <img 
                  src={data.image} 
                  alt="Preview" 
                  className="img-fluid" 
                  style={{ maxHeight: "300px", objectFit: "contain" }}
                  onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=Invalid+Image+URL"; }}
                />
              ) : (
                <div className="py-5 text-muted small">No image URL provided</div>
              )}
            </div>
            <h5 className="fw-bold mb-1">{data.name || "Product Title"}</h5>
            <p className="text-primary fw-bold fs-5">₹{Number(data.price).toLocaleString()}</p>
            <p className="text-muted small px-2">
              {data.desc ? (data.desc.substring(0, 100) + "...") : "Product desc will appear here."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}