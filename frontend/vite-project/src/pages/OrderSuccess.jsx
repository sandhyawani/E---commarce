import { useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const navigate = useNavigate();

  const orderNumber = Math.floor(Math.random() * 900000) + 100000;

  return (
    <div className="container vh-100 d-flex justify-content-center align-items-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card shadow-lg border-0 rounded-4 overflow-hidden">
          <div className="bg-success" style={{ height: "6px" }}></div>
          
          <div className="card-body p-5 text-center">
            <div className="mb-4">
              <div className="bg-success-subtle d-inline-block p-4 rounded-circle animate-bounce">
                <i className="bi bi-bag-check-fill text-success" style={{ fontSize: "3.5rem" }}></i>
              </div>
            </div>

            <h2 className="fw-extrabold text-dark mb-2">Woohoo! Order Placed.</h2>
            <p className="text-muted mb-4">
              Thank you for shopping with us. We've received your order and are getting it ready for shipment.
            </p>
            <div className="bg-light rounded-4 p-3 mb-4 d-flex justify-content-around align-items-center border">
              <div className="text-start">
                <span className="small text-muted d-block text-uppercase fw-bold ls-1">Order Number</span>
                <span className="fw-bold text-dark">#MS-{orderNumber}</span>
              </div>
              <div className="vr opacity-25"></div>
              <div className="text-start">
                <span className="small text-muted d-block text-uppercase fw-bold ls-1">Status</span>
                <span className="badge bg-success-subtle text-success rounded-pill px-3">Processing</span>
              </div>
            </div>

            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center mt-2">
              <button
                className="btn btn-primary rounded-pill px-5 py-2 fw-bold shadow-sm"
                onClick={() => navigate("/categories")}
              >
                Continue Shopping
              </button>
              <button
                className="btn btn-outline-dark rounded-pill px-5 py-2 fw-bold"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
            
            <p className="mt-4 small text-muted">
              A confirmation email has been sent to your registered ID.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .fw-extrabold { font-weight: 800; }
        .ls-1 { letter-spacing: 1px; font-size: 0.7rem; }
        .animate-bounce {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
          40% {transform: translateY(-10px);}
          60% {transform: translateY(-5px);}
        }
      `}</style>
    </div>
  );
}