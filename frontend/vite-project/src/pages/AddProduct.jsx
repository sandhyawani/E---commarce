import React, { useState } from "react";
import axios from "axios";

export default function AddProduct() {
  const [data, setData] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    desc: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.name || !data.category || !data.price) {
      alert("Please fill Name, Category and Price");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/products/add", {
        name: data.name,
        category: data.category,
        price: Number(data.price),
        image: data.image,
        description: data.desc,
      });
      alert(res.data.message); setData({
        name: "", category: "", price: "", image: "", desc: "",
      });
    } catch (err) {
      alert(err.response?.data?.message || "Product not saved");
    }
  };
  return (<div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <div className="card border-0 shadow-lg overflow-hidden">
          <div className="bg-primary p-4 text-white text-center">
            <h3 className="mb-0 fw-bold">Add New Product</h3>
            <p className="small mb-0 opacity-75">Fill in the details to list a new item</p> </div>
          <div className="card-body p-4">  <form onSubmit={handleSubmit}>
            <div className="row g-3"> <div className="col-12">
              <label className="form-label fw-semibold">Product Name</label>
              <input type="text" className="form-control form-control-lg bg-light" placeholder="e.g. Wireless Headphones"
                value={data.name} onChange={(e) => setData({ ...data, name: e.target.value })} />  </div>
              <div className="col-md-6"><label className="form-label fw-semibold">Category</label>
                <select className="form-select bg-light" value={data.category} onChange={(e) => setData({ ...data, category: e.target.value })} >
                  <option value="">Choose...</option>
                  <option value="electronics">Electronics</option>
                  <option value="fashion">Fashion</option>
                  <option value="kitchen">Kitchen</option>
                  <option value="beauty">Beauty</option> </select>  </div>
              <div className="col-md-6"> <label className="form-label fw-semibold">Price (₹)</label>
                <div className="input-group"><span className="input-group-text bg-white">₹</span>
                  <input type="number" className="form-control bg-light" placeholder="0.00" value={data.price}
                    onChange={(e) => setData({ ...data, price: e.target.value })} />  </div> </div>
              <div className="col-12"> <label className="form-label fw-semibold">Image URL</label>
                <input type="text" className="form-control bg-light" placeholder="https://example.com/image.jpg" value={data.image}
                  onChange={(e) => setData({ ...data, image: e.target.value })} />
                {data.image && (<div className="mt-2 text-center border rounded p-2 bg-light">
                  <p className="small text-muted mb-1">Preview:</p> <img
                    src={data.image} alt="Preview" style={{ maxHeight: "150px", objectFit: "contain" }} onError={(e) => { e.target.style.display = 'none'; }} />
                </div>)}  </div>
              <div className="col-12"> <label className="form-label fw-semibold">Description</label>
                <textarea className="form-control bg-light" rows="3" placeholder="Tell customers more about this product..."
                  value={data.desc} onChange={(e) => setData({ ...data, desc: e.target.value })} /> </div>
              <div className="col-12 mt-4">
                <button type="submit" className="btn btn-primary btn-lg w-100 shadow-sm">
                  <i className="bi bi-plus-circle me-2"></i> Save Product </button>
              </div>  </div> </form> </div> </div>  </div> </div> </div>);
}