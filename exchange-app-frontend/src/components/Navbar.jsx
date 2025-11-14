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
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/all-offers">
          Exchange App
        </Link>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to="/all-offers">
                Offers
              </Link>
            </li>
          </ul>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <Notifications />
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/personal"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                My exchange
              </a>
              <ul className="dropdown-menu dropdown-menu-end">
                <li className="dropdown-header">{localStorage.getItem("user")}'s account</li>
                <li>
                  <Link className="dropdown-item" to="/items/get">
                    Items
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/my-trades">
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
                    Sign out
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
