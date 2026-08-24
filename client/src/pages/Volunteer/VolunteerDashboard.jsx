import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FaSyncAlt,
  FaBell,
  FaShieldAlt,
  FaMapMarkerAlt,
  FaUser,
  FaCar,
  FaCheckCircle,
} from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import api from "../../api/api";
import "../../styles/volunteer.css";

function VolunteerDashboard() {
  const [sosAlerts, setSOSAlerts] = useState([]);
  const [mySOS, setMySOS] = useState([]);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // =========================
  // Fetch Active SOS
  // =========================
  const fetchSOS = async () => {
    try {
      const token = localStorage.getItem("volunteerToken");

      const res = await api.get("/sos/active/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSOSAlerts(res.data.sosAlerts || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to load SOS Alerts"
      );
    }
  };

  // =========================
  // Fetch My Assigned SOS
  // =========================
  const fetchMySOS = async () => {
    try {
      const token = localStorage.getItem("volunteerToken");

      const res = await api.get("/sos/volunteer/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMySOS(res.data.sosAlerts || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to load assigned SOS"
      );
    }
  };

  // =========================
  // Fetch Everything
  // =========================
  const fetchAllData = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      await Promise.all([
        fetchSOS(),
        fetchMySOS(),
      ]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // =========================
  // Accept SOS
  // =========================
  const acceptSOS = async (id) => {
    try {
      const token = localStorage.getItem("volunteerToken");

      const res = await api.put(
        `/sos/accept/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      // Reload data from database
      await fetchAllData();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to accept SOS"
      );
    }
  };

  // =========================
  // Update SOS Status
  // =========================
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("volunteerToken");

      const res = await api.put(
        `/sos/volunteer/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      // Reload from database
      await fetchAllData();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to update status"
      );
    }
  };

  // =========================
  // Open Google Maps
  // =========================
  const openMap = (latitude, longitude) => {
    if (
      latitude === undefined ||
      latitude === null ||
      longitude === undefined ||
      longitude === null
    ) {
      toast.error("SOS location is not available");
      return;
    }

    window.open(
      `https://www.google.com/maps?q=${latitude},${longitude}`,
      "_blank"
    );
  };

  // =========================
  // Initial Load
  // =========================
  useEffect(() => {
    fetchAllData();
  }, []);

  // =========================
  // Statistics
  // =========================
  const activeCount = sosAlerts.length;

  const acceptedCount = mySOS.filter(
    (sos) => sos.status === "Accepted"
  ).length;

  const onTheWayCount = mySOS.filter(
    (sos) => sos.status === "On the Way"
  ).length;

  const resolvedCount = mySOS.filter(
    (sos) => sos.status === "Resolved"
  ).length;

  return (
    <>
      <Navbar />

      <section className="py-5 bg-light min-vh-100 volunteer-dashboard">
        <div className="container">

          {/* ================= Header ================= */}

          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">

            <div>
              <h2 className="fw-bold mb-1">
                Volunteer Dashboard
              </h2>

              <p className="text-muted mb-0">
                Monitor and respond to emergency SOS alerts
              </p>
            </div>

            <button
              className="btn btn-outline-danger mt-3 mt-md-0"
              onClick={() => fetchAllData(true)}
              disabled={refreshing}
            >
              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </button>

          </div>

          {/* ================= Statistics ================= */}

          <div className="row mb-4">

            {/* Active */}

            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <p className="text-muted mb-1">
                    Active SOS
                  </p>

                  <h2 className="fw-bold text-danger mb-0">
                    {activeCount}
                  </h2>
                </div>
              </div>
            </div>

            {/* Accepted */}

            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <p className="text-muted mb-1">
                    Accepted
                  </p>

                  <h2 className="fw-bold text-primary mb-0">
                    {acceptedCount}
                  </h2>
                </div>
              </div>
            </div>

            {/* On The Way */}

            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <p className="text-muted mb-1">
                    On the Way
                  </p>

                  <h2 className="fw-bold text-warning mb-0">
                    {onTheWayCount}
                  </h2>
                </div>
              </div>
            </div>

            {/* Resolved */}

            <div className="col-md-3 mb-3">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <p className="text-muted mb-1">
                    Resolved
                  </p>

                  <h2 className="fw-bold text-success mb-0">
                    {resolvedCount}
                  </h2>
                </div>
              </div>
            </div>

          </div>

          {/* ================================================= */}
          {/* ACTIVE SOS */}
          {/* ================================================= */}

          <div className="card shadow border-0 mb-4">
            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <h5 className="fw-bold mb-0">
                  <><FaBell className="me-2" />Emergency SOS Alerts</>
                </h5>

                <span className="badge bg-danger">
                  {activeCount} Active
                </span>

              </div>

              {loading ? (

                <div className="text-center py-5">

                  <div
                    className="spinner-border text-danger"
                    role="status"
                  >
                    <span className="visually-hidden">
                      Loading...
                    </span>
                  </div>

                  <p className="text-muted mt-3">
                    Loading SOS alerts...
                  </p>

                </div>

              ) : sosAlerts.length === 0 ? (

                <div className="text-center py-5">

                  <div style={{ fontSize: "50px" }}>
                    <FaShieldAlt className="volunteer-empty-icon" />
                  </div>

                  <h5 className="mt-3">
                    No Active SOS Alerts
                  </h5>

                  <p className="text-muted">
                    There are currently no emergency requests.
                  </p>

                </div>

              ) : (

                <div className="table-responsive">

                  <table className="table table-hover align-middle">

                    <thead className="table-light">

                      <tr>
                        <th>User</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>

                    </thead>

                    <tbody>

                      {sosAlerts.map((sos) => (

                        <tr key={sos._id}>

                          <td>
                            <strong>
                              {sos.user?.name || "Unknown"}
                            </strong>
                          </td>

                          <td>
                            {sos.user?.phone || "-"}
                          </td>

                          <td>

                            <button
                              className="btn btn-info btn-sm"
                              onClick={() =>
                                openMap(
                                  sos.latitude,
                                  sos.longitude
                                )
                              }
                            >
                              <><FaMapMarkerAlt className="me-1" />View Map</>
                            </button>

                            <div className="small text-muted mt-1">
                              {sos.latitude},{" "}
                              {sos.longitude}
                            </div>

                          </td>

                          <td>

                            <span className="badge bg-danger">
                              Active
                            </span>

                          </td>

                          <td>

                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() =>
                                acceptSOS(sos._id)
                              }
                            >
                              Accept
                            </button>

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>
          </div>

          {/* ================================================= */}
          {/* MY ASSIGNED SOS */}
          {/* ================================================= */}

          <div className="card shadow border-0">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <h5 className="fw-bold mb-0">
                  <><FaUser className="me-2" />My Assigned SOS</>
                </h5>

                <span className="badge bg-primary">
                  {mySOS.length}
                </span>

              </div>

              {mySOS.length === 0 ? (

                <div className="text-center py-5">

                  <div style={{ fontSize: "50px" }}>
                    <FaShieldAlt className="volunteer-empty-icon" />
                  </div>

                  <h5 className="mt-3">
                    No Assigned SOS
                  </h5>

                  <p className="text-muted">
                    SOS requests accepted by you will appear here.
                  </p>

                </div>

              ) : (

                <div className="table-responsive">

                  <table className="table table-hover align-middle">

                    <thead className="table-light">

                      <tr>
                        <th>User</th>
                        <th>Phone</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>

                    </thead>

                    <tbody>

                      {mySOS.map((sos) => (

                        <tr key={sos._id}>

                          <td>
                            <strong>
                              {sos.user?.name || "Unknown"}
                            </strong>
                          </td>

                          <td>
                            {sos.user?.phone || "-"}
                          </td>

                          <td>

                            <button
                              className="btn btn-info btn-sm"
                              onClick={() =>
                                openMap(
                                  sos.latitude,
                                  sos.longitude
                                )
                              }
                            >
                              <><FaMapMarkerAlt className="me-1" />View Map</>
                            </button>

                            <div className="small text-muted mt-1">
                              {sos.latitude},{" "}
                              {sos.longitude}
                            </div>

                          </td>

                          <td>

                            <span
                              className={`badge ${
                                sos.status === "Resolved"
                                  ? "bg-success"
                                  : sos.status === "On the Way"
                                  ? "bg-warning text-dark"
                                  : "bg-primary"
                              }`}
                            >
                              {sos.status}
                            </span>

                          </td>

                          <td>

                            {sos.status === "Accepted" && (
                              <button
                                className="btn btn-warning btn-sm"
                                onClick={() =>
                                  updateStatus(
                                    sos._id,
                                    "On the Way"
                                  )
                                }
                              >
                                <><FaCar className="me-1" />On the Way</>
                              </button>
                            )}

                            {sos.status === "On the Way" && (
                              <button
                                className="btn btn-success btn-sm"
                                onClick={() =>
                                  updateStatus(
                                    sos._id,
                                    "Resolved"
                                  )
                                }
                              >
                                <><FaCheckCircle className="me-1" />Resolve</>
                              </button>
                            )}

                            {sos.status === "Resolved" && (
                              <span className="text-success fw-bold">
                                <><FaCheckCircle className="me-1" />Completed</>
                              </span>
                            )}

                          </td>

                        </tr>

                      ))}

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

export default VolunteerDashboard;