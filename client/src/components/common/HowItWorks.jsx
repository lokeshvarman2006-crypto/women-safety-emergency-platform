import {
  FaUserPlus,
  FaBell,
  FaHandsHelping,
} from "react-icons/fa";

import "../../styles/home.css";

function HowItWorks() {
  const steps = [
    {
      icon: <FaUserPlus />,
      title: "Create Account",
      text: "Register yourself and complete your personal safety profile.",
    },
    {
      icon: <FaBell />,
      title: "Trigger SOS",
      text: "Press the SOS button to instantly notify nearby responders.",
    },
    {
      icon: <FaHandsHelping />,
      title: "Receive Help",
      text: "Verified volunteers accept your request and reach your location.",
    },
  ];

  return (
    <section className="how-section">
      <div className="container">

        <h2 className="text-center fw-bold mb-3">
          How It Works
        </h2>

        <p className="text-center text-muted mb-5">
          Getting help during emergencies is simple and fast.
        </p>

        <div className="row">

          {steps.map((step, index) => (
            <div className="col-lg-4 mb-4" key={index}>

              <div className="step-card">

                <div className="step-icon">
                  {step.icon}
                </div>

                <h4 className="fw-bold">
                  {step.title}
                </h4>

                <p>
                  {step.text}
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default HowItWorks;