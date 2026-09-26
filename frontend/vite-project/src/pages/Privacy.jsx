export default function Privacy() {
  return (
    <div className="container py-5" style={{ maxWidth: "780px" }}>
      <h1 className="fw-bold mb-2">Privacy Policy</h1>
      <p className="text-muted small mb-5">Last updated: September 2026</p>

      <h5 className="fw-bold">1. Data We Collect</h5>
      <p className="text-muted">
        When you create an account we store your name, mobile number, address, and a bcrypt-hashed password.
        We do not store plain-text passwords at any point.
      </p>

      <h5 className="fw-bold mt-4">2. How We Use Your Data</h5>
      <p className="text-muted">
        Your data is used solely to authenticate you, persist your cart, and process your orders.
        We do not sell or share your data with third parties.
      </p>

      <h5 className="fw-bold mt-4">3. Authentication Tokens</h5>
      <p className="text-muted">
        After login, a JSON Web Token (JWT) is stored in your browser's localStorage. This token expires after 7 days.
        You can log out at any time to remove it from your device.
      </p>

      <h5 className="fw-bold mt-4">4. Data Retention</h5>
      <p className="text-muted">
        Your account data, cart, and orders are stored in MongoDB Atlas. You may contact us to request
        deletion of your account and associated data.
      </p>

      <p className="text-muted small mt-5">
        This is a portfolio project. This policy is illustrative and is not legally binding.
      </p>
    </div>
  );
}
