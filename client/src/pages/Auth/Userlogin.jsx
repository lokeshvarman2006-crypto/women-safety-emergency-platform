import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "../../styles/login.css";

import api from "../../api/api";

function UserLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and password");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/users/login", formData);

      /*
       * Clear other role sessions.
       * A user should not remain logged in as
       * volunteer or administrator.
       */
      localStorage.removeItem("volunteerToken");
      localStorage.removeItem("adminToken");
      localStorage.removeItem("volunteerId");

      // Store user authentication token
      localStorage.setItem("token", res.data.token);

      // Store user information if backend sends it
      if (res.data.user) {
        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );
      }

      toast.success("Login successful");

      navigate("/user/dashboard");

    } catch (err) {
      console.error("User Login Error:", err);

      toast.error(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section
        className="login-selection-section py-5"
        style={{
          minHeight: "75vh",
          background: "#f5f7fa",
          display: "flex",
          alignItems: "center",
        }}
      >
        <div className="container">

          <div className="row justify-content-center">

            <div className="col-lg-5 col-md-7 col-sm-10">

              <div
                className="card border-0 shadow-sm"
                style={{
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >

                {/* Header */}

                <div
                  className="text-center text-white p-4"
                  style={{
                    background:
                      "linear-gradient(135deg, #34495e, #2c3e50)",
                  }}
                >

                  <h2 className="fw-bold mb-2">
                    User Login
                  </h2>

                  <p className="mb-0 opacity-75">
                    Sign in to access your SheShield account
                  </p>

                </div>

                {/* Form */}

                <div className="card-body p-4 p-md-5">

                  <form onSubmit={handleSubmit}>

                    {/* Email */}

                    <div className="mb-4">

                      <label
                        htmlFor="email"
                        className="form-label fw-semibold"
                      >
                        Email Address
                      </label>

                      <input
                        id="email"
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        autoComplete="email"
                        required
                      />

                    </div>

                    {/* Password */}

                    <div className="mb-4">

                      <label
                        htmlFor="password"
                        className="form-label fw-semibold"
                      >
                        Password
                      </label>

                      <input
                        id="password"
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        autoComplete="current-password"
                        required
                      />

                    </div>

                    {/* Login button */}

                    <button
                      type="submit"
                      className="btn w-100 py-2 fw-semibold"
                      disabled={loading}
                      style={{
                        background: "#34495e",
                        color: "#ffffff",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    >
                      {loading ? "Signing in..." : "Sign In"}
                    </button>

                  </form>

                  {/* Register */}

                  <div className="text-center mt-4">

                    <p className="text-muted mb-2">
                      Don't have a user account?
                    </p>

                    <Link
                      to="/register"
                      className="text-decoration-none fw-semibold"
                      style={{
                        color: "#34495e",
                      }}
                    >
                      Create an account
                    </Link>

                  </div>

                  {/* Back */}

                  <div className="text-center mt-3">

                    <Link
                      to="/login"
                      className="text-decoration-none text-muted"
                    >
                      Back to Login Selection
                    </Link>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default UserLogin;