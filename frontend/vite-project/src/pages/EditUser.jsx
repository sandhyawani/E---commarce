import React, { useEffect, useState } from "react";
import api from "../api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    buildingFlat: "",
    street: "",
    pincode: "",
    country: "",
    state: "",
    city: "",
    mobile: "",
  });

  const fetchUser = async () => {
    const res = await api.get(`/api/users/${id}`);
    setForm(res.data);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "mobile") {
      const onlyDigits = value.replace(/\D/g, "");
      if (onlyDigits.length > 10) return;
      setForm({ ...form, mobile: onlyDigits });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (form.mobile.length !== 10) {
      alert("Mobile must be exactly 10 digits");
      return;
    }

    await api.put(`/api/users/${id}`, form);

    alert("User updated ");
    navigate("/users");
  };

  return (
    <div className="container mt-4">
      <h3>Edit User</h3>

      <form onSubmit={handleUpdate} className="mt-3">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">First Name</label>
            <input
              className="form-control"
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Last Name</label>
            <input
              className="form-control"
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            className="form-control"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Building / Flat</label>
            <input
              className="form-control"
              name="buildingFlat"
              value={form.buildingFlat}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Street</label>
            <input
              className="form-control"
              name="street"
              value={form.street}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Pincode</label>
            <input
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Country</label>
            <input
              className="form-control"
              name="country"
              value={form.country}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">State</label>
            <input
              className="form-control"
              name="state"
              value={form.state}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">City</label>
            <input
              className="form-control"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Mobile</label>
            <input
              className="form-control"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
            />
          </div>
        </div>

        <button className="btn btn-success">Update</button>

        <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => navigate("/users")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}