import {
  FaBell,
  FaMapMarkedAlt,
  FaHandsHelping,
} from "react-icons/fa";

function Features() {
  const features = [
    {
      icon: <FaBell />,
      title: "One Click SOS",
      text: "Instantly send an emergency alert to nearby verified volunteers with a single click.",
      iconClass: "feature-danger",
    },
    {
      icon: <FaMapMarkedAlt />,
      title: "Live Location",
      text: "Share your real-time location during emergencies so responders can reach you faster.",
      iconClass: "feature-primary",
    },
    {
      icon: <FaHandsHelping />,
      title: "Verified Volunteers",
      text: "Receive quick assistance from trusted volunteers verified by the platform.",
      iconClass: "feature-success",
    },
  ];

  return (
    <section className="py-5 bg-white">
      <div className="container">

        <h2 className="text-center fw-bold mb-3">
          Our Features
        </h2>

        <p className="text-center text-muted mb-5">
          Designed to provide immediate assistance and improve women's safety.
        </p>

        <div className="row g-4">

          {features.map((feature, index) => (
            <div className="col-lg-4 col-md-6" key={index}>

              <div className="card shadow-sm border-0 h-100 text-center p-4 feature-card">

                <div className={`feature-icon ${feature.iconClass}`}>
                  {feature.icon}
                </div>

                <h4 className="fw-bold">
                  {feature.title}
                </h4>

                <p className="text-muted mb-0">
                  {feature.text}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Features;