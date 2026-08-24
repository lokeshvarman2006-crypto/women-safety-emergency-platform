import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserCog } from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import api from "../../api/api";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/admin/login", formData);
      localStorage.removeItem("token");
      localStorage.removeItem("volunteerToken");
      localStorage.setItem("adminToken", res.data.token);
      toast.success("Admin Login successful");
      navigate("/admin/dashboard");
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />
      <section className="auth-page">
        <div className="container">
          <div className="auth-card card">
            <div className="auth-brand"><FaUserCog /></div>
            <h1 className="auth-title">Admin Login</h1>
            <p className="auth-subtitle">Authorized administrators can manage the SheShield platform.</p>
            <form onSubmit={handleSubmit}>
              
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  required
                />
              </div>
              <button className="btn btn-danger w-100 mt-2" type="submit">
                Sign In as Administrator
              </button>
            </form>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Login;
