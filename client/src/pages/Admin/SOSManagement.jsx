import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import api from "../../api/api";

function SOSManagement() {

  const [sosAlerts, setSosAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  // =======================
  // Fetch SOS Alerts
  // =======================

  const fetchSOS = async () => {

    try {

      const token = localStorage.getItem("adminToken");

      const res = await api.get(
        "/admin/sos",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSosAlerts(res.data.sosAlerts || []);

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Unable to load SOS Alerts"
      );

    } finally {

      setLoading(false);

    }

  };

  // =======================
  // Delete SOS
  // =======================

  const deleteSOS = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this SOS alert?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const token = localStorage.getItem("adminToken");

      const res = await api.delete(
        `/admin/sos/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      fetchSOS();

    } catch (err) {

      toast.error(
        err.response?.data?.message ||
        "Delete Failed"
      );

    }

  };

  // =======================
  // Open Location
  // =======================

  const openLocation = (latitude, longitude) => {

    if (!latitude || !longitude) {
      toast.error("Location not available");
      return;
    }

    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      "_blank"
    );

  };

  // =======================
  // Status Badge
  // =======================

  const getStatusBadge = (status) => {

    if (status === "Resolved") {

      return "bg-success";

    }

    if (status === "On the Way") {

      return "bg-warning text-dark";

    }

    if (status === "Accepted") {

      return "bg-primary";

    }

    return "bg-danger";

  };

  // =======================
  // Format Date
  // =======================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    return new Date(date).toLocaleString();

  };

  // =======================
  // Load SOS
  // =======================

  useEffect(() => {

    fetchSOS();

  }, []);

  return (
    <>
      <Navbar />

      <section className="py-5 bg-light admin-management-page">

        <div className="container">

          {/* Header */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <h2>
              SOS Management
            </h2>

            <button
              className="btn btn-dark"
              onClick={fetchSOS}
            >
              Refresh
            </button>

          </div>

          {/* Main Card */}

          <div className="card shadow">

            <div className="card-body">

              {loading ? (

                <div className="text-center py-5">

                  <div
                    className="spinner-border text-danger"
                    role="status"
                  >
                  </div>

                  <p className="mt-2">
                    Loading SOS Alerts...
                  </p>

                </div>

              ) : (

                <div className="table-responsive">

                  <table className="table table-bordered table-hover align-middle">

                    <thead className="table-danger">

                      <tr>

                        <th>#</th>

                        <th>User</th>

                        <th>Phone</th>

                        <th>Volunteer</th>

                        <th>Status</th>

                        <th>Location</th>

                        <th>Created</th>

                        <th>Actions</th>

                      </tr>

                    </thead>

                    <tbody>

                      {sosAlerts.length === 0 ? (

                        <tr>

                          <td
                            colSpan="8"
                            className="text-center py-4"
                          >
                            No SOS Alerts
                          </td>

                        </tr>

                      ) : (

                        sosAlerts.map((sos, index) => (

                          <tr key={sos._id}>

                            {/* Number */}

                            <td>
                              {index + 1}
                            </td>

                            {/* User */}

                            <td>

                              {sos.user?.name || "Unknown"}

                            </td>

                            {/* Phone */}

                            <td>

                              {sos.user?.phone || "-"}

                            </td>

                            {/* Volunteer */}

                            <td>

                              {sos.assignedVolunteer?.name || (
                                <span className="text-muted">
                                  Not Assigned
                                </span>
                              )}

                            </td>

                            {/* Status */}

                            <td>

                              <span
                                className={`badge ${getStatusBadge(
                                  sos.status
                                )}`}
                              >
                                {sos.status}
                              </span>

                            </td>

                            {/* Location */}

                            <td>

                              <div>
                                <small>
                                  Lat: {sos.latitude}
                                </small>
                              </div>

                              <div>
                                <small>
                                  Lng: {sos.longitude}
                                </small>
                              </div>

                              <button
                                className="btn btn-primary btn-sm mt-2"
                                onClick={() =>
                                  openLocation(
                                    sos.latitude,
                                    sos.longitude
                                  )
                                }
                              >
                                View Map
                              </button>

                            </td>

                            {/* Created */}

                            <td>

                              {formatDate(
                                sos.createdAt
                              )}

                            </td>

                            {/* Actions */}

                            <td>

                              <button
                                className="btn btn-danger btn-sm"
                                onClick={() =>
                                  deleteSOS(sos._id)
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

export default SOSManagement; 