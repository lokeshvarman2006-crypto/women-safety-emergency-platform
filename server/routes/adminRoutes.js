const express = require("express");

const router = express.Router();

const protectAdmin = require("../middleware/adminMiddleware");
const {
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
} = require("../controllers/adminController");
// =======================
// Admin Routes
// =======================

// Register Admin
router.post("/register", registerAdmin);

// Login Admin
router.post("/login", loginAdmin);

// Get All Users
router.get("/users", protectAdmin, getAllUsers);

// Get All Volunteers
router.get("/volunteers", protectAdmin, getAllVolunteers);

// Verify Volunteer
router.put("/verify-volunteer/:id", protectAdmin, verifyVolunteer);

// Get All SOS Alerts
router.get("/sos", protectAdmin, getAllSOS);

// Dashboard Statistics
router.get("/dashboard", protectAdmin, getDashboardStats);

// Delete User
router.delete("/user/:id", protectAdmin, deleteUser);

// Delete Volunteer
router.delete("/volunteer/:id", protectAdmin, deleteVolunteer);

// Delete SOS
router.delete("/sos/:id", protectAdmin, deleteSOS);

module.exports = router;