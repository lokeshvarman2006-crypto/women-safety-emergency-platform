import { FaShieldAlt, FaBell, FaArrowRight } from "react-icons/fa";
import "../../styles/home.css";

function Hero() {
  return (
    <section
      className="text-white"
      style={{
        background: "linear-gradient(135deg, #162033, #243653)",
        minHeight: "calc(100vh - 76px)",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row align-items-center">

          <div className="col-lg-6">
<h1 className="display-3 fw-bold hero-title">
  Your Safety
</h1>

<h2 className="display-5 fw-bold mb-4 hero-title">
  Our Responsibility
</h2>

            <p className="lead mb-4">
              The Women Safety & Emergency Assistance Platform provides
              instant SOS alerts, live location sharing, verified volunteer
              support, and faster emergency response when every second matters.
            </p>

            <div className="d-flex gap-3 flex-wrap">

              <button className="btn btn-light btn-lg">
                <FaBell className="me-2" />
                Send SOS
              </button>

              <button className="btn btn-outline-light btn-lg">
                Learn More
                <FaArrowRight className="ms-2" />
              </button>

            </div>

          </div>

          <div className="col-lg-6 text-center mt-5 mt-lg-0">

            <FaShieldAlt
              size={260}
              className="opacity-100"
            />

          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;