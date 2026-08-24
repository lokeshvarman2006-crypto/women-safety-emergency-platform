import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import api from "../../api/api";

function AddContact() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
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

      const token = localStorage.getItem("token");

      await api.post(
        "/contacts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Contact Added Successfully");

      navigate("/contacts");

    } catch (err) {

      toast.error(
        err.response?.data?.message || "Failed to Add Contact"
      );

    }

  };

  return (
    <>
      <Navbar />

      <section className="py-5 bg-light app-content-section">

        <div className="container">

          <div className="row justify-content-center">

            <div className="col-lg-6">

              <div className="auth-card card">

                <h2 className="text-center mb-4">
                  Add Emergency Contact
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
                    />

                  </div>

                  <div className="mb-3">

                    <label>Relationship</label>

                    <input
                      type="text"
                      className="form-control"
                      name="relationship"
                      value={formData.relationship}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="mb-4">

                    <label>Phone</label>

                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />

                  </div>

                  <button
                    className="btn btn-danger w-100"
                    type="submit"
                  >
                    Save Contact
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

export default AddContact;