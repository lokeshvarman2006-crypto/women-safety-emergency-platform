import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import api from "../../api/api";

function VolunteerManagement() {

  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);

  // =========================
  // Fetch Volunteers
  // =========================

  const fetchVolunteers = async () => {

    try {

      const token = localStorage.getItem("adminToken");

      const res = await api.get(
        "/admin/volunteers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setVolunteers(res.data.volunteers);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Unable to load volunteers"
      );

    } finally {

      setLoading(false);

    }

  };

  // =========================
  // Verify Volunteer
  // =========================

  const verifyVolunteer = async (id) => {

    try {

      const token = localStorage.getItem("adminToken");

      const res = await api.put(
        `/admin/verify-volunteer/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      fetchVolunteers();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Verification failed"
      );

    }

  };

  // =========================
  // Delete Volunteer
  // =========================

  const deleteVolunteer = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this volunteer?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const token = localStorage.getItem("adminToken");

      const res = await api.delete(
        `/admin/volunteer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      fetchVolunteers();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Unable to delete volunteer"
      );

    }

  };

  // =========================
  // Load Volunteers
  // =========================

  useEffect(() => {

    fetchVolunteers();

  }, []);

  return (
    <>
      <Navbar />

      <section className="py-5 bg-light admin-management-page">

        <div className="container">

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2>
              Volunteer Management
            </h2>

            <button
              className="btn btn-dark"
              onClick={fetchVolunteers}
            >
              Refresh
            </button>

          </div>

          <div className="card shadow">

            <div className="card-body">

              {loading ? (

                <div className="text-center py-4">

                  <div
                    className="spinner-border text-danger"
                    role="status"
                  >
                  </div>

                  <p className="mt-2">
                    Loading volunteers...
                  </p>

                </div>

              ) : (

                <div className="table-responsive">

                  <table className="table table-bordered table-hover align-middle">

                    <thead className="table-danger">

                      <tr>

                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>City</th>
                        <th>Status</th>
                        <th>Actions</th>

                      </tr>

                    </thead>

                    <tbody>

                      {volunteers.length === 0 ? (

                        <tr>

                          <td
                            colSpan="7"
                            className="text-center py-4"
                          >
                            No Volunteers Found
                          </td>

                        </tr>

                      ) : (

                        volunteers.map((volunteer, index) => (

                          <tr key={volunteer._id}>

                            <td>
                              {index + 1}
                            </td>

                            <td>
                              {volunteer.name}
                            </td>

                            <td>
                              {volunteer.email}
                            </td>

                            <td>
                              {volunteer.phone || "-"}
                            </td>

                            <td>
                              {volunteer.city || "-"}
                            </td>

                            <td>

                              {volunteer.verified ? (

                                <span className="badge bg-success">
                                  Verified
                                </span>

                              ) : (

                                <span className="badge bg-warning text-dark">
                                  Pending
                                </span>

                              )}

                            </td>

                            <td>

                              {!volunteer.verified && (

                                <button
                                  className="btn btn-success btn-sm me-2"
                                  onClick={() =>
                                    verifyVolunteer(
                                      volunteer._id
                                    )
                                  }
                                >
                                  Verify
                                </button>

                              )}

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  deleteVolunteer(
                                    volunteer._id
                                  )
                                }
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

              )}

            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default VolunteerManagement;