const jwt = require("jsonwebtoken");
const Volunteer = require("../models/Volunteer");

const protectVolunteer = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await Volunteer.findById(decoded.id).select("-password");

      next();

    } catch (error) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }
  }

  if (!token) {
    return res.status(401).json({
      message: "No token",
    });
  }
};

module.exports = protectVolunteer;