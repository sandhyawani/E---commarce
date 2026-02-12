import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const locationData = {
  India: {
    Maharashtra: ["Pune", "Mumbai", "Nagpur", "Nashik", "Thane"],
    Gujarat: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubli", "Mangalore"],
  },
  USA: {
    California: ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose"],
    Texas: ["Dallas", "Austin", "Houston", "San Antonio", "Fort Worth"],
    Florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "Tallahassee"],
  },
  Canada: {
    Ontario: ["Toronto", "Ottawa", "Hamilton", "Kitchener"],
    Alberta: ["Calgary", "Edmonton", "Red Deer", "Lethbridge"],
    Quebec: ["Montreal", "Quebec City", "Laval", "Gatineau"],
  },
  Australia: {
    NSW: ["Sydney", "Newcastle", "Wollongong"],
    Victoria: ["Melbourne", "Geelong", "Ballarat"],
    Queensland: ["Brisbane", "Gold Coast", "Cairns"],
  },
  Germany: {
    Berlin: ["Berlin City"],
    Bavaria: ["Munich", "Nuremberg", "Augsburg"],
    Hessen: ["Frankfurt", "Wiesbaden", "Darmstadt"],
  },
};

export default function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    buildingFlat: "",
    street: "",
    pincode: "",
    country: "India",
    state: "",
    city: "",
    mobile: "",
    password: "",
  });

  const states = Object.keys(locationData[form.country]);
  const cities = form.state ? locationData[form.country][form.state] : [];

  const validatePassword = (password) => /^[a-zA-Z0-9]{8,}$/.test(password);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "country") {
      setForm({ ...form, country: value, state: "", city: "" });
      return;
    }

    if (name === "state") {
      setForm({ ...form, state: value, city: "" });
      return;
    }

    if (name === "mobile") {
      const onlyDigits = value.replace(/\D/g, "");
      if (onlyDigits.length > 10) return;
      setForm({ ...form, mobile: onlyDigits });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.firstName || !form.lastName) {
      alert("Firstname and Lastname required");
      return;
    }

    if (!validatePassword(form.password)) {
      alert("Password must be alphanumeric and minimum 8 characters");
      return;
    }

    if (form.mobile.length !== 10) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    if (!form.state || !form.city) {
      alert("Please select State and City");
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", form);
      alert(`Signup Success Your UserId is: ${res.data.userId}`);
      navigate("/", { state: { userId: res.data.userId } });
    } catch (err) {
      alert("Signup failed ");
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-xl-7">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            <div className="bg-success py-4 text-center text-white">
              <h3 className="fw-bold mb-0">Create Your Account</h3>
              <p className="small opacity-75 mb-0">Join our community today</p>
            </div>

            <div className="card-body p-4 p-md-5">
              <form onSubmit={handleSubmit}>
                <h6 className="text-uppercase text-muted fw-bold mb-3" style={{ letterSpacing: "1px", fontSize: "0.8rem" }}>
                  Personal Information
                </h6>
                <div className="row g-3 mb-4">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">First Name</label>
                    <input name="firstName" className="form-control bg-light" value={form.firstName} onChange={handleChange} placeholder="John" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Last Name</label>
                    <input name="lastName" className="form-control bg-light" value={form.lastName} onChange={handleChange} placeholder="Doe" />
                  </div>
                </div>
                <h6 className="text-uppercase text-muted fw-bold mb-3" style={{ letterSpacing: "1px", fontSize: "0.8rem" }}>
                  Shipping Address
                </h6>
                <div className="row g-3 mb-4">
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Full Address</label>
                    <input name="address" className="form-control bg-light" value={form.address} onChange={handleChange} placeholder="House no, Area, Landmark" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Building / Flat</label>
                    <input name="buildingFlat" className="form-control bg-light" value={form.buildingFlat} onChange={handleChange} placeholder="Apt 4B" />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Street</label>
                    <input name="street" className="form-control bg-light" value={form.street} onChange={handleChange} placeholder="Main St" />
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold">Country</label>
                    <select name="country" className="form-select bg-light" value={form.country} onChange={handleChange}>
                      {Object.keys(locationData).map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold">State</label>
                    <select name="state" className="form-select bg-light" value={form.state} onChange={handleChange}>
                      <option value="">Select State</option>
                      {states.map((st) => <option key={st} value={st}>{st}</option>)}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label small fw-semibold">City</label>
                    <select name="city" className="form-select bg-light" value={form.city} onChange={handleChange} disabled={!form.state}>
                      <option value="">Select City</option>
                      {cities.map((ct) => <option key={ct} value={ct}>{ct}</option>)}
                    </select>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Pin Code</label>
                    <input name="pincode" className="form-control bg-light" value={form.pincode} onChange={handleChange} placeholder="6-digit code" />
                  </div>
                </div>
                <h6 className="text-uppercase text-muted fw-bold mb-3" style={{ letterSpacing: "1px", fontSize: "0.8rem" }}>
                  Account Security
                </h6>
                <div className="row g-3 mb-5">
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Mobile Number</label>
                    <div className="input-group">
                      <span className="input-group-text bg-white border-end-0">📱</span>
                      <input name="mobile" className="form-control bg-light border-start-0 ps-0" value={form.mobile} onChange={handleChange} placeholder="10-digit number" />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small fw-semibold">Password</label>
                    <input name="password" type="password" className="form-control bg-light" value={form.password} onChange={handleChange} placeholder="Min 8 chars" />
                  </div>
                </div>

                <button className="btn btn-success btn-lg w-100 fw-bold shadow-sm py-3 mb-3 rounded-pill">
                  Register Account
                </button>

                <p className="text-center text-muted mb-0">
                  Already have an account? <Link to="/" className="text-success fw-bold text-decoration-none">Log in</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}