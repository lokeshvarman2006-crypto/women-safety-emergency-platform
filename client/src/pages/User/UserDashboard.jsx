import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  FaBell,
  FaMapMarkerAlt,
  FaUser,
  FaPhoneAlt,
  FaNotesMedical,
  FaAddressBook,
  FaHistory,
  FaShieldAlt,
  FaCheckCircle,
  FaCar,
} from "react-icons/fa";

import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "../../styles/userdashboard.css";
import api from "../../api/api";

function UserDashboard() {
  const navigate = useNavigate();

  const [currentSOS, setCurrentSOS] = useState(null);
  const [loadingSOS, setLoadingSOS] = useState(true);
  const [activatingSOS, setActivatingSOS] = useState(false);

  // =========================
  // Fetch Current SOS
  // =========================

  const fetchCurrentSOS = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoadingSOS(false);
        return;
      }

      const res = await api.get("/sos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const alerts = res.data.sosAlerts || [];

      setCurrentSOS(alerts.length > 0 ? alerts[0] : null);
    } catch (err) {
      console.error("Unable to fetch SOS status:", err);
    } finally {
      setLoadingSOS(false);
    }
  };

  // =========================
  // Activate SOS
  // =========================

  const handleSOS = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("Please login before activating SOS");
        navigate("/login");
        return;
      }

      if (!navigator.geolocation) {
        toast.error(
          "Location services are not supported by your browser"
        );
        return;
      }

      setActivatingSOS(true);

      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          resolve,
          reject,
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      });

      const { latitude, longitude } = position.coords;

      const res = await api.post(
        "/sos",
        {
          latitude,
          longitude,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(
        res.data.message || "SOS activated successfully"
      );

      setCurrentSOS(res.data.sos);

      await fetchCurrentSOS();
    } catch (err) {
      if (err.code === 1) {
        toast.error(
          "Location permission was denied. Please allow location access and try again."
        );
      } else if (err.code === 2) {
        toast.error(
          "Unable to determine your current location."
        );
      } else if (err.code === 3) {
        toast.error(
          "Location request timed out. Please try again."
        );
      } else {
        toast.error(
          err.response?.data?.message || "Unable to activate SOS"
        );
      }
    } finally {
      setActivatingSOS(false);
    }
  };

  // =========================
  // Status Styling
  // =========================

  const getStatusClass = (status) => {
    switch (status) {
      case "Resolved":
        return "bg-success";

      case "On the Way":
        return "bg-warning text-dark";

      case "Accepted":
        return "bg-primary";

      default:
        return "bg-danger";
    }
  };

  // =========================
  // Status Message
  // =========================

  const statusMessage = {
    Active:
      "Your emergency request is active and waiting for a volunteer to accept it.",

    Accepted:
      "A volunteer has accepted your emergency request.",

    "On the Way":
      "Your assigned volunteer is on the way. Please remain in a safe location.",

    Resolved:
      "Your emergency request has been resolved.",
  };

  // =========================
  // Open Map
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
  // View Current Location
  // =========================

  const viewMyLocation = () => {
    if (!navigator.geolocation) {
      toast.error(
        "Location services are not supported by your browser"
      );
      return;
    }

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        window.open(
          `https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`,
          "_blank"
        );
      },
      () => {
        toast.error(
          "Unable to access your current location"
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };

  // =========================
  // Initial Load
  // =========================

  useEffect(() => {
    fetchCurrentSOS();

    const interval = setInterval(
      fetchCurrentSOS,
      5000
    );

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Navbar />

      <section className="dashboard-section">
        <div className="container">

          {/* =========================
              PAGE HEADER
          ========================= */}

          <div className="page-heading text-center">

            <h1 className="dashboard-title">
              Welcome to SheShield
            </h1>

            <p className="dashboard-subtitle">
              Your personal safety assistance dashboard
            </p>

          </div>

          {/* =========================
              CURRENT SOS STATUS
          ========================= */}

          {!loadingSOS && currentSOS && (
            <div className="dashboard-status-card mb-4">

              <div className="status-card-header">

                <div className="section-title">

                  <span className="section-icon danger">
                    <FaBell />
                  </span>

                  <div>
                    <h3>
                      Current SOS Status
                    </h3>

                    <p>
                      Live status of your latest emergency request
                    </p>
                  </div>

                </div>

                <span
                  className={`badge fs-6 ${getStatusClass(
                    currentSOS.status
                  )}`}
                >
                  {currentSOS.status}
                </span>

              </div>

              {/* Status Message */}

              <div className="status-message">

                {currentSOS.status === "Resolved" ? (
                  <FaCheckCircle className="text-success" />
                ) : currentSOS.status === "On the Way" ? (
                  <FaCar className="text-warning" />
                ) : (
                  <FaBell
                    className={
                      currentSOS.status === "Active"
                        ? "text-danger"
                        : "text-primary"
                    }
                  />
                )}

                <span>
                  {statusMessage[currentSOS.status] ||
                    "Your emergency request is currently being processed."}
                </span>

              </div>

              {/* Volunteer Information */}

              {currentSOS.assignedVolunteer ? (

                <div className="row g-4 mt-1">

                  <div className="col-md-4">

                    <div className="info-block">

                      <span className="info-icon">
                        <FaUser />
                      </span>

                      <div>

                        <small>
                          Assigned Volunteer
                        </small>

                        <strong>
                          {currentSOS.assignedVolunteer.name ||
                            "Volunteer"}
                        </strong>

                      </div>

                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="info-block">

                      <span className="info-icon">
                        <FaPhoneAlt />
                      </span>

                      <div>

                        <small>
                          Contact
                        </small>

                        <strong>
                          {currentSOS.assignedVolunteer.phone ||
                            "Not available"}
                        </strong>

                      </div>

                    </div>

                  </div>

                  <div className="col-md-4">

                    <div className="info-block">

                      <span className="info-icon">
                        <FaMapMarkerAlt />
                      </span>

                      <div>

                        <small>
                          SOS Location
                        </small>

                        <strong>
                          {currentSOS.latitude},{" "}
                          {currentSOS.longitude}
                        </strong>

                      </div>

                    </div>

                  </div>

                </div>

              ) : (

                <div className="unassigned-note">

                  <FaUser />

                  <span>
                    No volunteer has been assigned yet.
                  </span>

                </div>

              )}

              {/* Map Button */}

              <button
                className="btn btn-outline-primary mt-4"
                onClick={() =>
                  openMap(
                    currentSOS.latitude,
                    currentSOS.longitude
                  )
                }
              >
                <FaMapMarkerAlt className="me-2" />

                View SOS Location
              </button>

            </div>
          )}

          {/* =========================
              DASHBOARD CARDS
          ========================= */}

          <div className="row g-4">

            {/* Emergency SOS */}

            <div className="col-lg-4 col-md-6">

              <div className="dashboard-card emergency">

                <div className="dashboard-card-icon danger">
                  <FaBell />
                </div>

                <h3>
                  Emergency SOS
                </h3>

                <p>
                  Send an emergency alert with your current location
                  to the SheShield response network.
                </p>

                <button
                  className="btn btn-danger"
                  onClick={handleSOS}
                  disabled={activatingSOS}
                >
                  <FaBell className="me-2" />

                  {activatingSOS
                    ? "Activating..."
                    : "Activate SOS"}
                </button>

              </div>

            </div>

            {/* Live Location */}

            <div className="col-lg-4 col-md-6">

              <div className="dashboard-card">

                <div className="dashboard-card-icon primary">
                  <FaMapMarkerAlt />
                </div>

                <h3>
                  Live Location
                </h3>

                <p>
                  View your current location and use it to help
                  responders reach you faster.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={viewMyLocation}
                >
                  <FaMapMarkerAlt className="me-2" />

                  View My Location
                </button>

              </div>

            </div>

            {/* Profile */}

            <div className="col-lg-4 col-md-6">

              <div className="dashboard-card">

                <div className="dashboard-card-icon dark">
                  <FaUser />
                </div>

                <h3>
                  My Profile
                </h3>

                <p>
                  View and manage your personal information
                  and safety details.
                </p>

                <button
                  className="btn btn-dark"
                  onClick={() =>
                    navigate("/profile")
                  }
                >
                  View Profile
                </button>

              </div>

            </div>

            {/* Medical Information */}

            <div className="col-lg-6">

              <div className="dashboard-card">

                <div className="dashboard-card-icon purple">
                  <FaNotesMedical />
                </div>

                <h3>
                  Medical Information
                </h3>

                <div className="detail-row">

                  <span>
                    Blood Group
                  </span>

                  <strong>
                    Not Added
                  </strong>

                </div>

                <div className="detail-row">

                  <span>
                    Medical Condition
                  </span>

                  <strong>
                    Not Added
                  </strong>

                </div>

                <button
                  className="btn btn-outline-secondary mt-3"
                  onClick={() =>
                    navigate("/profile")
                  }
                >
                  Update Information
                </button>

              </div>

            </div>

            {/* Emergency Contacts */}

            <div className="col-lg-6">

              <div className="dashboard-card">

                <div className="dashboard-card-icon green">
                  <FaAddressBook />
                </div>

                <h3>
                  Emergency Contacts
                </h3>

                <p>
                  Manage trusted contacts who can support you
                  during emergency situations.
                </p>

                <button
                  className="btn btn-success"
                  onClick={() =>
                    navigate("/contacts")
                  }
                >
                  Manage Contacts
                </button>

              </div>

            </div>

            {/* SOS History */}

            <div className="col-lg-6">

              <div className="dashboard-card">

                <div className="dashboard-card-icon blue">
                  <FaHistory />
                </div>

                <h3>
                  SOS History
                </h3>

                <p>
                  Review previous emergency requests,
                  statuses and assigned volunteers.
                </p>

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    navigate("/sos-history")
                  }
                >
                  View History
                </button>

              </div>

            </div>

            {/* Safety Centre */}

            <div className="col-lg-6">

              <div className="dashboard-card">

                <div className="dashboard-card-icon navy">
                  <FaShieldAlt />
                </div>

                <h3>
                  Safety Centre
                </h3>

                <p>
                  Keep your profile and emergency information
                  updated for faster assistance.
                </p>

                <button
                  className="btn btn-outline-dark"
                  onClick={() =>
                    navigate("/profile")
                  }
                >
                  Review Safety Details
                </button>

              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default UserDashboard;