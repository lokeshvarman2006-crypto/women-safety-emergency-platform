import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/api";

function Contacts() {

  const navigate = useNavigate();

  const [contacts, setContacts] = useState([]);

  // Fetch Contacts
  const fetchContacts = async () => {
    try {

      const token = localStorage.getItem("token");

      const res = await api.get("/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(res.data.contacts);

    } catch (err) {
      console.log(err);
    }
  };

  // Delete Contact
  const deleteContact = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (!confirmDelete) return;

    try {

      const token = localStorage.getItem("token");

      await api.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Contact Deleted Successfully");

      // Refresh Contact List
      fetchContacts();

    } catch (err) {
      console.log(err);
      alert("Unable to delete contact");
    }

  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <Navbar />

      <section className="py-5 bg-light app-content-section">

        <div className="container">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2>Emergency Contacts</h2>

            <button
              className="btn btn-danger"
              onClick={() => navigate("/add-contact")}
            >
              + Add Contact
            </button>

          </div>

          <div className="card management-card">

            <div className="card-body">

              <table className="table table-bordered">

                <thead className="table-danger">

                  <tr>
                    <th>Name</th>
                    <th>Relationship</th>
                    <th>Phone</th>
                    <th>Actions</th>
                  </tr>

                </thead>

                <tbody>

                  {contacts.length === 0 ? (

                    <tr>

                      <td colSpan="4" className="text-center">
                        No Contacts Added
                      </td>

                    </tr>

                  ) : (

                    contacts.map((contact) => (

                      <tr key={contact._id}>

                        <td>{contact.name}</td>

                        <td>{contact.relationship}</td>

                        <td>{contact.phone}</td>

                        <td>
<button
  className="btn btn-warning btn-sm me-2"
  onClick={() => navigate(`/edit-contact/${contact._id}`)}
>
  Edit
</button>

                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteContact(contact._id)}
                          >
                            Delete
                          </button>

                        </td>

                      </tr>

                    ))

                  )}

                </tbody>

              </table>

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Contacts;