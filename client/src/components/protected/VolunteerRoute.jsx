import { Navigate } from "react-router-dom";

function VolunteerRoute({ children }) {

  const token = localStorage.getItem("volunteerToken");

  if (!token) {
    return <Navigate to="/volunteer/login" replace />;
  }

  return children;
}

export default VolunteerRoute;