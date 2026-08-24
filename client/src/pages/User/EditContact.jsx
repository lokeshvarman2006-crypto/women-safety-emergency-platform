import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import api from "../../api/api";

function EditContact() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    relationship: "",
    phone: "",
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await api.get("/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const contact = res.data.contacts.find(
        (c) => c._id === id
      );

      if (contact) {
        setFormData({
          name: contact.name,
          relationship: contact.relationship,
          phone: contact.phone,
        });
      }

    } catch (err) {
      console.log(err);
    }
  };

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

      await api.put(
        `/contacts/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Contact Updated Successfully");

      navigate("/contacts");

    } catch (err) {
      console.log(err);
      alert("Unable to update contact");
    }
  };

  return (
    <>
      <Navbar />

      <section className="py-5 bg-light app-content-section">

        <div className="container">

          <div className="row justify-content-center">

            <div className="col-md-6">

              <div className="card management-card">

                <div className="card-body">

                  <h2 className="text-center mb-4">
                    Edit Contact
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
                        required
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
                        required
                      />
                    </div>

                    <button
                      className="btn btn-danger w-100"
                      type="submit"
                    >
                      Update Contact
                    </button>

                  </form>

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

export default EditContact;