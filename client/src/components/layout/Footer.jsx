
import {
  FaShieldAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "../../styles/footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <h3 className="footer-logo">
              <span className="footer-mark"><FaShieldAlt /></span>
              SheShield
            </h3>
            <p className="footer-description">
              Women Safety & Emergency Assistance Platform focused on
              faster emergency response, location sharing and trusted
              volunteer support.
            </p>
          </div>

          <div className="col-sm-6 col-lg-3">
            <h5 className="footer-heading">Platform</h5>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/login">User Login</Link></li>
              <li><Link to="/volunteer/login">Volunteer Login</Link></li>
              <li><Link to="/admin/login">Admin Login</Link></li>
            </ul>
          </div>

          <div className="col-sm-6 col-lg-4">
            <h5 className="footer-heading">Support</h5>
            <p><FaPhoneAlt /> +91 98765 43210</p>
            <p><FaEnvelope /> support@sheshield.com</p>
            <div className="social-icons" aria-label="Social links">
              <span><FaFacebook /></span>
              <span><FaInstagram /></span>
              <span><FaLinkedin /></span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 SheShield</span>
          <span>Women Safety & Emergency Assistance Platform</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
