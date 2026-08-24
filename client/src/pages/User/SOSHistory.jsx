import { useEffect, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import api from "../../api/api";

function SOSHistory() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await api.get("/sos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(res.data.sosAlerts);
    } catch (err) {
      console.log(
        err.response?.data?.message || "Unable to load SOS history"
      );
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />

      <section className="py-5 bg-light app-content-section">
        <div className="container">

          <h2 className="text-center mb-4">
            My SOS History
          </h2>

          <div className="card management-card">
            <div className="card-body">

              <table className="table table-bordered table-hover">

                <thead className="table-danger">
                  <tr>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Volunteer</th>
                    <th>Phone</th>
                    <th>Location</th>
                  </tr>
                </thead>

                <tbody>

                  {history.length === 0 ? (
                    <tr>
                      <td colSpan="5" className="text-center">
                        No SOS History Found
                      </td>
                    </tr>
                  ) : (
                    history.map((item) => (
                      <tr key={item._id}>

                        <td>
                          {new Date(
                            item.createdAt
                          ).toLocaleString()}
                        </td>

                        <td>
                          <span
                            className={`badge ${
                              item.status === "Resolved"
                                ? "bg-success"
                                : item.status === "Accepted"
                                ? "bg-primary"
                                : "bg-danger"
                            }`}
                          >
                            {item.status}
                          </span>
                        </td>

                        <td>
                          {item.assignedVolunteer
                            ? item.assignedVolunteer.name
                            : "Not Assigned"}
                        </td>

                        <td>
                          {item.assignedVolunteer
                            ? item.assignedVolunteer.phone
                            : "-"}
                        </td>

                        <td>
                          {item.latitude}, {item.longitude}
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

export default SOSHistory;