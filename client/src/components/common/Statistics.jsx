import {
  FaUsers,
  FaUserCheck,
  FaBell,
  FaHeart,
} from "react-icons/fa";

import "../../styles/home.css";

function Statistics() {
  const statistics = [
    {
      icon: <FaUsers />,
      value: "500+",
      label: "Registered Users",
      color: "text-primary",
    },
    {
      icon: <FaUserCheck />,
      value: "120+",
      label: "Verified Volunteers",
      color: "text-success",
    },
    {
      icon: <FaBell />,
      value: "350+",
      label: "Emergency Alerts",
      color: "text-danger",
    },
    {
      icon: <FaHeart />,
      value: "95%",
      label: "Successful Assistance",
      color: "text-warning",
    },
  ];

  return (
    <section className="statistics-section">
      <div className="container">

        <h2 className="text-center fw-bold mb-3">
          Platform Statistics
        </h2>

        <p className="text-center text-muted mb-5">
          Building a safer and more connected community.
        </p>

        <div className="row">

          {statistics.map((stat, index) => (
            <div
              className="col-lg-3 col-md-6 mb-4"
              key={index}
            >

              <div className="stats-card">

                <div className={`stats-icon ${stat.color}`}>
                  {stat.icon}
                </div>

                <h2>
                  {stat.value}
                </h2>

                <p>
                  {stat.label}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Statistics;