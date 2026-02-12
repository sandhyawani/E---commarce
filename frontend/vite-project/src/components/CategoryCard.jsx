import { useNavigate } from "react-router-dom";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 mb-4">
      <div 
        className="card h-100 border-0 shadow-sm rounded-4 category-card text-center p-3"
        style={{ transition: "all 0.3s ease" }}
      >
        <div
          className="mx-auto mt-2 d-flex align-items-center justify-content-center rounded-circle bg-light"
          style={{ 
            height: "120px", 
            width: "120px", 
            overflow: "hidden",
            border: "1px solid #eee"
          }}
        >
          <img
            src={category.image}
            alt={category.name}
            className="img-fluid"
            style={{
              maxHeight: "100%",
              maxWidth: "100%",
              objectFit: "contain",
            }}
          />
        </div>

        <div className="card-body d-flex flex-column justify-content-between">
          <h6 
            className="text-capitalize fw-bold text-dark mt-2 mb-3" 
            style={{ minHeight: "20px" }}
          >
            {category.name}
          </h6>
          
          <button
            className="btn btn-outline-primary btn-sm rounded-pill px-3 fw-semibold w-100"
            onClick={() => navigate(`/category/${category.slug}`)}
          >
            View Products
          </button>
        </div>
      </div>

      <style>{`
        .category-card:hover {
          transform: translateY(-5px);
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
}
