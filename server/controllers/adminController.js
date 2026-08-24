const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");
const User = require("../models/User");
const Volunteer = require("../models/Volunteer");
const Sos = require("../models/Sos");

// =======================
// Register Admin
// =======================
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await admin.save();

    res.status(201).json({
      message: "Admin registered successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
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
// Login Admin
// =======================
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({
        message: "Admin not found",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
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
// Get All Users
// =======================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json({
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// =======================
// Get All Volunteers
// =======================
const getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find().select("-password");

    res.status(200).json({
      count: volunteers.length,
      volunteers,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// =======================
// Verify Volunteer
// =======================
const verifyVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({
        message: "Volunteer not found",
      });
    }

    volunteer.verified = true;

    await volunteer.save();

    res.status(200).json({
      message: "Volunteer verified successfully",
      volunteer: {
        id: volunteer._id,
        name: volunteer.name,
        verified: volunteer.verified,
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
// Get All SOS Alerts
// =======================
const getAllSOS = async (req, res) => {
  try {
    const sosAlerts = await Sos.find()
      .populate("user", "name phone")
      .populate("assignedVolunteer", "name phone");

    res.status(200).json({
      count: sosAlerts.length,
      sosAlerts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
// =======================
// Admin Dashboard Statistics
// =======================
const getDashboardStats = async (req, res) => {
  try {
    // User Statistics
    const totalUsers = await User.countDocuments();

    // Volunteer Statistics
    const totalVolunteers = await Volunteer.countDocuments();
    const verifiedVolunteers = await Volunteer.countDocuments({
      verified: true,
    });
    const availableVolunteers = await Volunteer.countDocuments({
      available: true,
    });

    // SOS Statistics
    const totalSOS = await Sos.countDocuments();

    const activeSOS = await Sos.countDocuments({
      status: "Active",
    });

    const acceptedSOS = await Sos.countDocuments({
      status: "Accepted",
    });

    const onTheWaySOS = await Sos.countDocuments({
      status: "On the Way",
    });

    const resolvedSOS = await Sos.countDocuments({
      status: "Resolved",
    });

    res.status(200).json({
      totalUsers,
      totalVolunteers,
      verifiedVolunteers,
      availableVolunteers,
      totalSOS,
      activeSOS,
      acceptedSOS,
      onTheWaySOS,
      resolvedSOS,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
// =======================
// Delete User
// =======================
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.status(200).json({
      message: "User deleted successfully",
      deletedUser: {
        id: user._id,
        name: user.name,
        email: user.email,
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
// Delete Volunteer
// =======================
const deleteVolunteer = async (req, res) => {
  try {
    const volunteer = await Volunteer.findById(req.params.id);

    if (!volunteer) {
      return res.status(404).json({
        message: "Volunteer not found",
      });
    }

    await volunteer.deleteOne();

    res.status(200).json({
      message: "Volunteer deleted successfully",
      deletedVolunteer: {
        id: volunteer._id,
        name: volunteer.name,
        email: volunteer.email,
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
// Delete SOS Alert
// =======================
const deleteSOS = async (req, res) => {
  try {
    const sos = await Sos.findById(req.params.id);

    if (!sos) {
      return res.status(404).json({
        message: "SOS Alert not found",
      });
    }

    await sos.deleteOne();

    res.status(200).json({
      message: "SOS Alert deleted successfully",
      deletedSOS: {
        id: sos._id,
        status: sos.status,
        latitude: sos.latitude,
        longitude: sos.longitude,
      },
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  getAllUsers,
  getAllVolunteers,
  verifyVolunteer,
  getAllSOS,
  getDashboardStats,
  deleteUser,
  deleteVolunteer,
  deleteSOS,
};