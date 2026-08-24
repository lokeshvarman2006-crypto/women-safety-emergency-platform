import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "../../styles/Profile.css";
import api from "../../api/api";

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />

      <section className="profile-section">

        <div className="container">

          <div className="profile-card">

            <h2>My Profile</h2>

            <div className="profile-item">
              <strong>Name:</strong> {user.name}
            </div>

            <div className="profile-item">
              <strong>Email:</strong> {user.email}
            </div>

            <div className="profile-item">
              <strong>Phone:</strong> {user.phone}
            </div>

            <div className="profile-item">
              <strong>Age:</strong> {user.age}
            </div>

            <div className="profile-item">
              <strong>Gender:</strong> {user.gender}
            </div>

            <div className="profile-item">
              <strong>Blood Group:</strong> {user.bloodGroup}
            </div>

            <div className="profile-item">
              <strong>Address:</strong> {user.address}
            </div>

            <div className="profile-item">
              <strong>Medical Condition:</strong> {user.medicalCondition}
            </div>

            <div className="profile-item">
              <strong>Emergency Note:</strong> {user.emergencyNote}
            </div>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Profile;