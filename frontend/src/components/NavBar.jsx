import { useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar navbar-dark navbar-expand-lg">
      <div className="container">
        <button
          className="navbar-toggler collapsed"
          type="button"
          data-toggle="collapse"
          data-target="#navbarDarkExampleCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="navbar-collapse collapse"
          id="navbarDarkExampleCollapse"
        >
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <button
                className="btn btn-link nav-link"
                onClick={() => navigate("/")}
              >
                Home
              </button>
              <button
                className="btn btn-link nav-link"
                onClick={() => navigate("/fondos")}
              >
                Fondos
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
