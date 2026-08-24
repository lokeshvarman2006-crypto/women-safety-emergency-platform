const express = require("express");

const router = express.Router();

const protectVolunteer = require("../middleware/volunteerMiddleware");

const {
  registerVolunteer,
  loginVolunteer,
  getVolunteerProfile,
  updateAvailability,
  getActiveSOS,
  acceptSOS,
  updateSOSStatus,
} = require("../controllers/volunteerController");

router.post("/register", registerVolunteer);

router.post("/login", loginVolunteer);

router.get("/profile", protectVolunteer, getVolunteerProfile);

router.put("/availability", protectVolunteer, updateAvailability);

router.get("/active-sos", protectVolunteer, getActiveSOS);

router.put("/accept-sos/:id", protectVolunteer, acceptSOS);

router.put(
  "/update-sos-status/:id",
  protectVolunteer,
  updateSOSStatus
);

module.exports = router;