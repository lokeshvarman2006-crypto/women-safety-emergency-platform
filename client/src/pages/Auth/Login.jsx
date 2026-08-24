import { Link } from "react-router-dom";
import { FaUser, FaHandsHelping, FaUserShield } from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "../../styles/login.css";

function Login() {
  return (
    <>
      <Navbar />

      <section className="login-selection-section">
        <div className="container">

          <div className="text-center mb-5">

            <h1 className="fw-bold">
              Sign in to SheShield
            </h1>

            <p className="text-muted mt-2">
              Choose your account type to continue
            </p>

          </div>

          <div className="row justify-content-center g-4">

            {/* User Login */}
            <div className="col-lg-4 col-md-6">

              <div className="login-role-card">

                <div className="login-role-icon user-icon">
                  <FaUser />
                </div>

                <h3>User</h3>

                <p>
                  Access your dashboard, activate SOS alerts,
                  manage your profile and view emergency history.
                </p>

                <Link
                  to="/login/user"
                  className="btn btn-danger w-100"
                >
                  User Login
                </Link>

              </div>

            </div>

            {/* Volunteer Login */}
            <div className="col-lg-4 col-md-6">

              <div className="login-role-card">

                <div className="login-role-icon volunteer-icon">
                  <FaHandsHelping />
                </div>

                <h3>Volunteer</h3>

                <p>
                  View emergency requests, accept SOS alerts
                  and assist users in need.
                </p>

                <Link
                  to="/volunteer/login"
                  className="btn btn-primary w-100"
                >
                  Volunteer Login
                </Link>

              </div>

            </div>

            {/* Admin Login */}
            <div className="col-lg-4 col-md-6">

              <div className="login-role-card">

                <div className="login-role-icon admin-icon">
                  <FaUserShield />
                </div>

                <h3>Administrator</h3>

                <p>
                  Manage users, volunteers and emergency
                  assistance requests.
                </p>

                <Link
                  to="/admin/login"
                  className="btn btn-dark w-100"
                >
                  Admin Login
                </Link>

              </div>

            </div>

          </div>

          <div className="text-center mt-5">

            <p className="text-muted mb-2">
              Don't have a user account?
            </p>

            <Link
              to="/register"
              className="fw-semibold text-decoration-none"
            >
              Create an account
            </Link>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default Login;