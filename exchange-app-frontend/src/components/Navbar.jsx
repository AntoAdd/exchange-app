import { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Notifications from "./Notifications";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary position-fixed top-0 start-0 end-0" style={{zIndex: 1000}}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/all-offers">
          Exchange App
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav flex-row align-items-center justify-content-between w-100 gap-3">
            <li className="nav-item">
              <Link className="nav-link active" to="/all-offers">
                Offers
              </Link>
            </li>
            <div className="d-flex align-items-center gap-2">
              <li className="nav-item position-relative">
                <Notifications />
              </li>
              <li className="nav-item dropdown position-relative">
                <a
                  className="nav-link dropdown-toggle"
                  href="/personal"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  My exchange
                </a>
                <ul className="dropdown-menu dropdown-menu-end position-absolute">
                  <li className="dropdown-header">
                    {localStorage.getItem("user")}'s account
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/items/get">
                      Items
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/trades">
                      Trades
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button
                      onClick={() => handleLogout()}
                      className="dropdown-item"
                    >
                      <i class="bi bi-box-arrow-right fw-semibold me-2"></i>
                      Sign out
                    </button>
                  </li>
                </ul>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
