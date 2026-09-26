export default function Returns() {
  return (
    <div className="container py-5" style={{ maxWidth: "780px" }}>
      <h1 className="fw-bold mb-4">Returns Policy</h1>
      <p className="lead text-muted mb-4">We want you to be happy with your purchase.</p>

      <h5 className="fw-bold">Return Window</h5>
      <p className="text-muted">
        You may request a return within 7 days of the delivery date. Items must be unused and in their original packaging.
      </p>

      <h5 className="fw-bold mt-4">How to Request a Return</h5>
      <ol className="text-muted">
        <li className="mb-2">Go to <strong>My Orders</strong> and find the relevant order.</li>
        <li className="mb-2">Note your Order ID and the product(s) you wish to return.</li>
        <li className="mb-2">Contact us via the <strong>Contact</strong> page with your Order ID and reason for return.</li>
        <li>We will respond within 2 business days with return instructions.</li>
      </ol>

      <h5 className="fw-bold mt-4">Non-Returnable Items</h5>
      <p className="text-muted">Opened beauty products and perishable goods cannot be returned for hygiene reasons.</p>

      <p className="text-muted small mt-5">
        This is a portfolio project. This policy is illustrative and is not legally binding.
      </p>
    </div>
  );
}
