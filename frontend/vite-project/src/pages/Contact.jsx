export default function Contact() {
  return (
    <div className="container py-5" style={{ maxWidth: "680px" }}>
      <h1 className="fw-bold mb-2">Contact Us</h1>
      <p className="text-muted mb-5">
        Have a question about an order, a product, or the platform? Use the details below.
      </p>

      <div className="card border-0 shadow-sm p-4 mb-4" style={{ borderRadius: "var(--border-radius)" }}>
        <h5 className="fw-bold mb-3">Get in Touch</h5>
        <div className="d-flex align-items-start gap-3 mb-3">
          <i className="bi bi-envelope fs-4 text-primary mt-1"></i>
          <div>
            <div className="fw-semibold">Email</div>
            <span className="text-muted">support@mystore.example</span>
          </div>
        </div>
        <div className="d-flex align-items-start gap-3">
          <i className="bi bi-clock fs-4 text-primary mt-1"></i>
          <div>
            <div className="fw-semibold">Response Time</div>
            <span className="text-muted">We respond within 1–2 business days.</span>
          </div>
        </div>
      </div>

      <p className="text-muted small">
        This is a portfolio project. The contact details above are placeholder examples.
      </p>
    </div>
  );
}
