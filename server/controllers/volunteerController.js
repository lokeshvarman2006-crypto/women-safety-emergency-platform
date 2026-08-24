const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Volunteer = require("../models/Volunteer");
const Sos = require("../models/Sos");

// =======================
// Register Volunteer
// =======================
const registerVolunteer = async (req, res) => {
  try {
    const { name, email, password, phone, city } = req.body;

    const existingVolunteer = await Volunteer.findOne({ email });

    if (existingVolunteer) {
      return res.status(400).json({
        message: "Volunteer already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const volunteer = new Volunteer({
      name,
      email,
      password: hashedPassword,
      phone,
      city,
    });

    await volunteer.save();

    res.status(201).json({
      message: "Volunteer registered successfully",
      volunteer: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        phone: volunteer.phone,
        city: volunteer.city,
        verified: volunteer.verified,
        available: volunteer.available,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// =======================
// Login Volunteer
// =======================
const loginVolunteer = async (req, res) => {
  try {
    const { email, password } = req.body;

    const volunteer = await Volunteer.findOne({ email });

    if (!volunteer) {
      return res.status(400).json({
        message: "Volunteer not found",
      });
    }

    const isMatch = await bcrypt.compare(password, volunteer.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      { id: volunteer._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Volunteer login successful",
      token,
      volunteer: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
        phone: volunteer.phone,
        city: volunteer.city,
        verified: volunteer.verified,
        available: volunteer.available,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// =======================
// Volunteer Profile
// =======================
const getVolunteerProfile = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.user._id).select("-password");

    if (!volunteer) {
      return res.status(404).json({
        message: "Volunteer not found",
      });
    }

    res.status(200).json({
      volunteer,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Update Availability
// =======================
const updateAvailability = async (req, res) => {
  try {
    const { available } = req.body;

    const volunteer = await Volunteer.findById(req.user._id);

    volunteer.available = available;

    await volunteer.save();

    res.status(200).json({
      message: "Availability updated successfully",
      volunteer: {
        id: volunteer._id,
        name: volunteer.name,
        available: volunteer.available,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// View Active SOS Alerts
// =======================
const getActiveSOS = async (req, res) => {
  try {
    const sosAlerts = await Sos.find({
      status: "Active",
    }).populate("user", "name phone");

    res.status(200).json({
      count: sosAlerts.length,
      sosAlerts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Accept SOS
// =======================
const acceptSOS = async (req, res) => {
  try {
    const sos = await Sos.findById(req.params.id);

    if (!sos) {
      return res.status(404).json({
        message: "SOS Alert not found",
      });
    }

    if (sos.status !== "Active") {
      return res.status(400).json({
        message: "SOS already accepted or resolved",
      });
    }

    sos.assignedVolunteer = req.user._id;
    sos.status = "Accepted";

    await sos.save();

    res.status(200).json({
      message: "SOS accepted successfully",
      sos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// =======================
// Update SOS Status
// =======================
const updateSOSStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const sos = await Sos.findById(req.params.id);

    if (!sos) {
      return res.status(404).json({
        message: "SOS Alert not found",
      });
    }

    if (
      !sos.assignedVolunteer ||
      sos.assignedVolunteer.toString() !== req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "You are not assigned to this SOS",
      });
    }

    sos.status = status;

    await sos.save();

    res.status(200).json({
      message: "SOS status updated successfully",
      sos,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  registerVolunteer,
  loginVolunteer,
  getVolunteerProfile,
  updateAvailability,
  getActiveSOS,
  acceptSOS,
  updateSOSStatus,
};