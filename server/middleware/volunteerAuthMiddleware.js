const jwt = require("jsonwebtoken");
const Volunteer = require("../models/Volunteer");

const protectVolunteer = async (req, res, next) => {
  let token;

  // Check Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // No token
  if (!token) {
    return res.status(401).json({
      message: "No volunteer token",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded volunteer token:", decoded);

    // Find volunteer
    const volunteer = await Volunteer.findById(decoded.id).select("-password");

    if (!volunteer) {
      return res.status(401).json({
        message: "Volunteer not found",
      });
    }

    // Attach volunteer to request
    req.user = volunteer;

    next();
  } catch (error) {
    console.error("Volunteer authentication error:", error.message);

    return res.status(401).json({
      message: "Volunteer authentication failed",
    });
  }
};

module.exports = protectVolunteer;