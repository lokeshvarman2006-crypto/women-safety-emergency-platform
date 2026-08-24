
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaShieldAlt,
  FaHome,
  FaTachometerAlt,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import "../../styles/navbar.css";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const userToken = localStorage.getItem("token");
  const volunteerToken = localStorage.getItem("volunteerToken");
  const adminToken = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  const isActive = (path) =>
    location.pathname === path ? "active" : "";

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container">
        <Link className="navbar-brand logo" to="/">
          <span className="logo-mark">
            <FaShieldAlt />
          </span>
          <span>SHE SHIELD</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li className="nav-item">
              <Link className={`nav-link custom-link ${isActive("/")}`} to="/">
                <FaHome className="nav-icon" />
                Home
              </Link>
            </li>

            {userToken && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link custom-link ${isActive("/user/dashboard")}`}
                    to="/user/dashboard"
                  >
                    <FaTachometerAlt className="nav-icon" />
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link custom-link ${isActive("/profile")}`}
                    to="/profile"
                  >
                    <FaUser className="nav-icon" />
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-logout" onClick={handleLogout}>
                    <FaSignOutAlt className="nav-icon" />
                    Logout
                  </button>
                </li>
              </>
            )}

            {volunteerToken && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link custom-link ${isActive("/volunteer/dashboard")}`}
                    to="/volunteer/dashboard"
                  >
                    <FaTachometerAlt className="nav-icon" />
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-logout" onClick={handleLogout}>
                    <FaSignOutAlt className="nav-icon" />
                    Logout
                  </button>
                </li>
              </>
            )}

            {adminToken && (
              <>
                <li className="nav-item">
                  <Link
                    className={`nav-link custom-link ${isActive("/admin/dashboard")}`}
                    to="/admin/dashboard"
                  >
                    <FaTachometerAlt className="nav-icon" />
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link custom-link ${isActive("/admin/sos")}`}
                    to="/admin/sos"
                  >
                    SOS Management
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link custom-link ${isActive("/admin/volunteers")}`}
                    to="/admin/volunteers"
                  >
                    Volunteers
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-logout" onClick={handleLogout}>
                    <FaSignOutAlt className="nav-icon" />
                    Logout
                  </button>
                </li>
              </>
            )}

            {!userToken && !volunteerToken && !adminToken && (
              <>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/login">
                    <FaSignInAlt className="nav-icon" />
                    User Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/volunteer/login">
                    Volunteer Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link custom-link" to="/admin/login">
                    Admin Login
                  </Link>
                </li>
                <li className="nav-item ms-lg-2">
                  <Link className="nav-register" to="/register">
                    <FaUserPlus className="nav-icon" />
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
