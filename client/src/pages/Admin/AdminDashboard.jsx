import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FaSyncAlt,
  FaBell,
  FaUsers,
  FaUserShield,
  FaCheckCircle,
  FaExclamationCircle,
  FaUser,
} from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import api from "../../api/api";
import "../../styles/admin.css";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVolunteers: 0,
    totalSOS: 0,
    activeSOS: 0,
    resolvedSOS: 0,
  });

  const [volunteers, setVolunteers] = useState([]);
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  // =======================
  // Get Admin Token
  // =======================

  const getToken = () => {
    return localStorage.getItem("adminToken");
  };

  // =======================
  // Dashboard Statistics
  // =======================

  const fetchDashboard = async () => {
    try {
      const token = getToken();

      const res = await api.get("/admin/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStats({
        totalUsers: res.data.totalUsers || 0,
        totalVolunteers: res.data.totalVolunteers || 0,
        totalSOS: res.data.totalSOS || 0,
        activeSOS: res.data.activeSOS || 0,
        resolvedSOS: res.data.resolvedSOS || 0,
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to load dashboard"
      );
    }
  };

  // =======================
  // Fetch Volunteers
  // =======================

  const fetchVolunteers = async () => {
    try {
      const token = getToken();

      const res = await api.get("/admin/volunteers", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setVolunteers(res.data.volunteers || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to load volunteers"
      );
    }
  };

  // =======================
  // Fetch Users
  // =======================

  const fetchUsers = async () => {
    try {
      const token = getToken();

      const res = await api.get("/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data.users || []);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Unable to load users"
      );
    }
  };

  // =======================
  // Refresh Everything
  // =======================

  const refreshDashboard = async () => {
    setLoading(true);

    await Promise.all([
      fetchDashboard(),
      fetchVolunteers(),
      fetchUsers(),
    ]);

    setLoading(false);
  };

  // =======================
  // Verify Volunteer
  // =======================

  const verifyVolunteer = async (id) => {
    try {
      const token = getToken();

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

      await Promise.all([
        fetchVolunteers(),
        fetchDashboard(),
      ]);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Verification Failed"
      );
    }
  };

  // =======================
  // Delete Volunteer
  // =======================

  const deleteVolunteer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this volunteer?"
    );

    if (!confirmDelete) return;

    try {
      const token = getToken();

      const res = await api.delete(
        `/admin/volunteer/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      await Promise.all([
        fetchVolunteers(),
        fetchDashboard(),
      ]);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  // =======================
  // Delete User
  // =======================

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );

    if (!confirmDelete) return;

    try {
      const token = getToken();

      const res = await api.delete(
        `/admin/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      await Promise.all([
        fetchUsers(),
        fetchDashboard(),
      ]);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  // =======================
  // Initial Load
  // =======================

  useEffect(() => {
    refreshDashboard();
  }, []);

  return (
    <>
      <Navbar />

      <section className="py-5 bg-light">
        <div className="container">

          {/* =======================
              Header
          ======================= */}

          <div className="d-flex justify-content-between align-items-center mb-4">

            <div>
              <h2 className="fw-bold mb-1">
                Admin Dashboard
              </h2>

              <p className="text-muted mb-0">
                Manage users, volunteers and emergency alerts
              </p>
            </div>

            <button
              className="btn btn-outline-dark"
              onClick={refreshDashboard}
            >
              <><FaSyncAlt className="me-2" />Refresh</>
            </button>

          </div>

          {/* =======================
              Quick Actions
          ======================= */}

          <div className="row g-3 mb-4">

            <div className="col-md-4">

              <button
                className="btn btn-danger w-100 p-3"
                onClick={() =>
                  navigate("/admin/sos")
                }
              >
                <><FaBell className="me-2" />Manage SOS Alerts</>
              </button>

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-success w-100 p-3"
                onClick={() =>
                  navigate("/admin/volunteers")
                }
              >
                <><FaUserShield className="me-2" />Manage Volunteers</>
              </button>

            </div>

            <div className="col-md-4">

              <button
                className="btn btn-primary w-100 p-3"
                onClick={fetchUsers}
              >
                <><FaUsers className="me-2" />Refresh Users</>
              </button>

            </div>

          </div>

          {/* =======================
              Statistics
          ======================= */}

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

              <p className="mt-2 text-muted">
                Loading dashboard...
              </p>
            </div>

          ) : (

            <div className="row g-4">

              {/* Users */}

              <div className="col-lg-4 col-md-6">

                <div className="card shadow border-0 h-100">

                  <div className="card-body text-center p-4">

                    <div className="fs-1">
                      <FaUser className="admin-stat-icon" />
                    </div>

                    <h6 className="text-muted">
                      Total Users
                    </h6>

                    <h2 className="fw-bold">
                      {stats.totalUsers}
                    </h2>

                  </div>

                </div>

              </div>

              {/* Volunteers */}

              <div className="col-lg-4 col-md-6">

                <div className="card shadow border-0 h-100">

                  <div className="card-body text-center p-4">

                    <div className="fs-1">
                      <FaUserShield className="admin-stat-icon" />
                    </div>

                    <h6 className="text-muted">
                      Total Volunteers
                    </h6>

                    <h2 className="fw-bold">
                      {stats.totalVolunteers}
                    </h2>

                  </div>

                </div>

              </div>

              {/* Total SOS */}

              <div className="col-lg-4 col-md-6">

                <div className="card shadow border-0 h-100">

                  <div className="card-body text-center p-4">

                    <div className="fs-1">
                      <FaBell className="admin-stat-icon" />
                    </div>

                    <h6 className="text-muted">
                      Total SOS
                    </h6>

                    <h2 className="fw-bold text-danger">
                      {stats.totalSOS}
                    </h2>

                  </div>

                </div>

              </div>

              {/* Active SOS */}

              <div className="col-lg-6 col-md-6">

                <div className="card shadow border-0 h-100">

                  <div className="card-body text-center p-4">

                    <div className="fs-1">
                      <FaExclamationCircle className="admin-stat-icon danger" />
                    </div>

                    <h6 className="text-muted">
                      Active SOS
                    </h6>

                    <h2 className="fw-bold text-danger">
                      {stats.activeSOS}
                    </h2>

                    <button
                      className="btn btn-danger btn-sm mt-2"
                      onClick={() =>
                        navigate("/admin/sos")
                      }
                    >
                      View Active SOS
                    </button>

                  </div>

                </div>

              </div>

              {/* Resolved SOS */}

              <div className="col-lg-6 col-md-6">

                <div className="card shadow border-0 h-100">

                  <div className="card-body text-center p-4">

                    <div className="fs-1">
                      <FaCheckCircle className="admin-stat-icon success" />
                    </div>

                    <h6 className="text-muted">
                      Resolved SOS
                    </h6>

                    <h2 className="fw-bold text-success">
                      {stats.resolvedSOS}
                    </h2>

                  </div>

                </div>

              </div>

            </div>

          )}

          {/* =======================
              Volunteer Management
          ======================= */}

          <div className="card shadow border-0 mt-5">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <h4 className="mb-0">
                  <><FaUserShield className="me-2" />Volunteer Management</>
                </h4>

                <button
                  className="btn btn-outline-success btn-sm"
                  onClick={() =>
                    navigate("/admin/volunteers")
                  }
                >
                  Open Full Management
                </button>

              </div>

              <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle">

                  <thead className="table-dark">

                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>City</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>

                  </thead>

                  <tbody>

                    {volunteers.length === 0 ? (

                      <tr>
                        <td
                          colSpan="5"
                          className="text-center text-muted py-4"
                        >
                          No Volunteers Found
                        </td>
                      </tr>

                    ) : (

                      volunteers.map((volunteer) => (

                        <tr key={volunteer._id}>

                          <td>
                            {volunteer.name}
                          </td>

                          <td>
                            {volunteer.email}
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

            </div>

          </div>

          {/* =======================
              User Management
          ======================= */}

          <div className="card shadow border-0 mt-4">

            <div className="card-body">

              <div className="d-flex justify-content-between align-items-center mb-3">

                <h4 className="mb-0">
                  <><FaUsers className="me-2" />User Management</>
                </h4>

                <span className="badge bg-primary">
                  {users.length} Users
                </span>

              </div>

              <div className="table-responsive">

                <table className="table table-bordered table-hover align-middle">

                  <thead className="table-primary">

                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>

                  </thead>

                  <tbody>

                    {users.length === 0 ? (

                      <tr>

                        <td
                          colSpan="4"
                          className="text-center text-muted py-4"
                        >
                          No Users Found
                        </td>

                      </tr>

                    ) : (

                      users.map((user) => (

                        <tr key={user._id}>

                          <td>
                            {user.name}
                          </td>

                          <td>
                            {user.email}
                          </td>

                          <td>
                            {user.phone || "-"}
                          </td>

                          <td>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() =>
                                deleteUser(
                                  user._id
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

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default AdminDashboard;