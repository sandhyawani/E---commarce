export default function Terms() {
  return (
    <div className="container py-5" style={{ maxWidth: "780px" }}>
      <h1 className="fw-bold mb-2">Terms of Service</h1>
      <p className="text-muted small mb-5">Last updated: September 2026</p>

      <h5 className="fw-bold">1. Use of the Platform</h5>
      <p className="text-muted">
        By accessing MyStore, you agree to use the platform for lawful purposes only.
        You must not attempt to circumvent authentication, manipulate pricing, or access other users' data.
      </p>

      <h5 className="fw-bold mt-4">2. Accounts</h5>
      <p className="text-muted">
        You are responsible for maintaining the confidentiality of your account credentials.
        Admin accounts are created directly by the platform operator and cannot be self-assigned via signup.
      </p>

      <h5 className="fw-bold mt-4">3. Orders and Payments</h5>
      <p className="text-muted">
        All prices are set and verified on the server. Placing an order is subject to stock availability at the
        time of checkout. The platform reserves the right to cancel an order if stock is no longer available.
      </p>

      <h5 className="fw-bold mt-4">4. Limitation of Liability</h5>
      <p className="text-muted">
        This is a portfolio/demonstration project. The operator provides no warranty of uptime,
        data retention, or financial liability.
      </p>

      <p className="text-muted small mt-5">
        This document is illustrative and is not a legally binding agreement.
      </p>
    </div>
  );
}
