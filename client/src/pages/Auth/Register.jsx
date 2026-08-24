import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUserPlus, FaHandsHelping } from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "../../styles/register.css";

import api from "../../api/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: "",
    gender: "",
    bloodGroup: "",
    address: "",
    medicalCondition: "",
    emergencyNote: "",
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
      await api.post("/users/register", formData);

      toast.success("Registration Successful");

      navigate("/login");
    } catch (err) {
      console.log("Registration Error:", err);

      if (err.response) {
        console.log("Status:", err.response.status);
        console.log("Data:", err.response.data);

        toast.error(
          err.response.data.message || "Registration failed"
        );
      } else {
        toast.error(err.message || "Registration failed");
      }
    }
  };

  return (
    <>
      <Navbar />

      <section className="auth-page">
        <div className="container">

          {/* Registration Header */}
          <div className="text-center mb-4">
            <h1 className="fw-bold">
              Create Your SheShield Account
            </h1>

            <p className="text-muted">
              Register as a user or join SheShield as a volunteer.
            </p>
          </div>

          {/* Role Selection */}
          <div className="row justify-content-center g-4 mb-5">

            {/* User Registration */}
            <div className="col-lg-5 col-md-6">
              <div className="register-role-card active">

                <div className="register-role-icon">
                  <FaUserPlus />
                </div>

                <h3>User Registration</h3>

                <p>
                  Create a personal account to access SOS assistance,
                  emergency contacts, location sharing and safety history.
                </p>

                <span className="register-role-status">
                  Current registration
                </span>

              </div>
            </div>

            {/* Volunteer Registration */}
            <div className="col-lg-5 col-md-6">
              <div className="register-role-card">

                <div className="register-role-icon volunteer">
                  <FaHandsHelping />
                </div>

                <h3>Volunteer Registration</h3>

                <p>
                  Join the SheShield volunteer network and help respond
                  to emergency assistance requests.
                </p>

                <Link
                  to="/volunteer/register"
                  className="btn btn-primary w-100"
                >
                  Register as Volunteer
                </Link>

              </div>
            </div>

          </div>

          {/* User Registration Form */}
          <div className="row justify-content-center">

            <div className="col-lg-6">

              <div className="auth-card wide card">

                <div className="auth-brand">
                  <FaUserPlus />
                </div>

                <h2 className="auth-title">
                  User Registration
                </h2>

                <form onSubmit={handleSubmit}>

                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Enter Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      placeholder="Enter Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label>Age</label>
                    <input
                      type="number"
                      className="form-control"
                      name="age"
                      placeholder="Enter Age"
                      value={formData.age}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Gender</label>
                    <select
                      className="form-control"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label>Blood Group</label>
                    <input
                      type="text"
                      className="form-control"
                      name="bloodGroup"
                      placeholder="Enter Blood Group"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Address</label>
                    <textarea
                      className="form-control"
                      name="address"
                      placeholder="Enter Address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label>Medical Condition</label>
                    <input
                      type="text"
                      className="form-control"
                      name="medicalCondition"
                      placeholder="Enter Medical Condition"
                      value={formData.medicalCondition}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-4">
                    <label>Emergency Note</label>
                    <textarea
                      className="form-control"
                      name="emergencyNote"
                      placeholder="Enter Emergency Note"
                      value={formData.emergencyNote}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    className="btn btn-danger w-100"
                    type="submit"
                  >
                    Create User Account
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

export default Register;
