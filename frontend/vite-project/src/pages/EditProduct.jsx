import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
    stock: "",
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        setData(res.data);
      } catch (err) {
        alert("Error loading product");
      }
    };
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.category || !data.price || data.stock === undefined) {
      alert("Please fill Name, Category, Price, and Stock");
      return;
    }

    try {
      const res = await api.put(`/api/products/${id}`, {
        ...data,
        price: Number(data.price),
        stock: Number(data.stock),
      });
      alert(res.data.message);
      navigate("/admin/products"); 
    } catch (err) {
      alert(err.response?.data?.message || "Error updating product");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card border-0 shadow-lg overflow-hidden">
            <div className="bg-warning p-4 text-dark text-center">
              <h3 className="mb-0 fw-bold">Edit Product</h3>
              <p className="small mb-0 opacity-75">Update details for this item</p>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold">Product Name</label>
                    <input
                      type="text"
                      className="form-control form-control-lg bg-light"
                      value={data.name}
                      onChange={(e) => setData({ ...data, name: e.target.value })}
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Category</label>
                    <select
                      className="form-select bg-light"
                      value={data.category}
                      onChange={(e) => setData({ ...data, category: e.target.value })}
                    >
                      <option value="">Choose...</option>
                      <option value="electronics">Electronics</option>
                      <option value="fashion">Fashion</option>
                      <option value="kitchen">Kitchen</option>
                      <option value="beauty">Beauty</option>
                    </select>
                  </div>

                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Price (?)</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white">?</span>
                      <input
                        type="number"
                        className="form-control bg-light"
                        value={data.price}
                        onChange={(e) => setData({ ...data, price: e.target.value })}
                      />
                    </div>
                  </div>
                  
                  <div className="col-md-3">
                    <label className="form-label fw-semibold">Stock</label>
                    <input
                      type="number"
                      className="form-control bg-light"
                      value={data.stock}
                      onChange={(e) => setData({ ...data, stock: e.target.value })}
                    />
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Image URL</label>
                    <input
                      type="text"
                      className="form-control bg-light"
                      value={data.image}
                      onChange={(e) => setData({ ...data, image: e.target.value })}
                    />
                    {data.image && (
                      <div className="mt-2 text-center border rounded p-2 bg-light">
                        <p className="small text-muted mb-1">Preview:</p>
                        <img
                          src={data.image}
                          alt="Preview"
                          style={{ maxHeight: "150px", objectFit: "contain" }}
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold">Description</label>
                    <textarea
                      className="form-control bg-light"
                      rows="3"
                      value={data.desc || data.description} 
                      onChange={(e) => setData({ ...data, desc: e.target.value })}
                    />
                  </div>

                  <div className="col-12 mt-4 d-flex gap-2">
                    <button
                      type="button"
                      className="btn btn-light w-50"
                      onClick={() => navigate("/admin/products")}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-warning w-50 shadow-sm fw-bold">
                      <i className="bi bi-save me-2"></i> Update Product
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
