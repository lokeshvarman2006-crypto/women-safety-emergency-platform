const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const protectVolunteer = require("../middleware/volunteerAuthMiddleware");

const {
  createSOS,
  getSOSAlerts,
  updateSOSStatus,
  getAllActiveSOS,
  acceptSOS,
  volunteerUpdateSOS,
  getMyAssignedSOS,
} = require("../controllers/sosController");

// =======================
// USER ROUTES
// =======================

// Create SOS
router.post("/", protect, createSOS);

// Get logged-in user's SOS history
router.get("/", protect, getSOSAlerts);

// Update own SOS status
router.put("/:id", protect, updateSOSStatus);


// =======================
// VOLUNTEER ROUTES
// =======================

// Get all active SOS alerts
router.get(
  "/active/all",
  protectVolunteer,
  getAllActiveSOS
);

// Get SOS alerts assigned to logged-in volunteer
router.get(
  "/volunteer/my",
  protectVolunteer,
  getMyAssignedSOS
);

// Accept SOS
router.put(
  "/accept/:id",
  protectVolunteer,
  acceptSOS
);

// Update assigned SOS status
router.put(
  "/volunteer/:id",
  protectVolunteer,
  volunteerUpdateSOS
);

module.exports = router;