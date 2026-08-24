import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserShield } from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import api from "../../api/api";

function VolunteerRegister() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    city: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await api.post(
        "/volunteers/register",
        formData
      );

      toast.success("Volunteer Registered Successfully");

      navigate("/volunteer/login");

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Registration Failed"
      );

    }

  };

  return (
    <>
      <Navbar />

      <section className="auth-page">

        <div className="container">

          <div className="row justify-content-center">

            <div className="col-lg-6">

              <div className="auth-card wide card">

                <div className="auth-brand"><FaUserShield /></div>
                <h2 className="auth-title">
                  Volunteer Registration
                </h2>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter Name"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter Email"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter Password"
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Enter Phone Number"
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Enter City"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-danger w-100"
                  >
                    Register as Volunteer
                  </button>

                </form>

              </div>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default VolunteerRegister;