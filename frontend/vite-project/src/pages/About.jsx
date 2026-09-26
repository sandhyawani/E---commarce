export default function About() {
  return (
    <div className="container py-5" style={{ maxWidth: "780px" }}>
      <h1 className="fw-bold mb-4">About Us</h1>
      <p className="lead text-muted mb-4">
        MyStore is a full-stack e-commerce platform built as a production-oriented MERN project.
      </p>
      <h5 className="fw-bold">What we are</h5>
      <p className="text-muted">
        We are an online storefront offering products across Electronics, Fashion, Kitchen, and Beauty categories.
        Our platform is built with reliability, security, and user experience as the primary goals.
      </p>
      <h5 className="fw-bold mt-4">What we built</h5>
      <ul className="text-muted">
        <li>JWT-based authentication with role-based access control (user / admin)</li>
        <li>Persistent cart stored in MongoDB — survives refresh, logout, and login</li>
        <li>Atomic inventory management — stock cannot go negative, even under concurrent orders</li>
        <li>Backend price validation — frontend price manipulation is ignored at checkout</li>
        <li>Full order lifecycle tracking from placement to delivery</li>
      </ul>
      <h5 className="fw-bold mt-4">Technology Stack</h5>
      <p className="text-muted">React, Vite, Bootstrap, Node.js, Express, MongoDB, Mongoose, JWT, bcrypt.</p>
    </div>
  );
}
