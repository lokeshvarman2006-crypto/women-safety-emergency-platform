const Sos = require("../models/Sos");

// =======================
// Create SOS Alert - User
// =======================
const createSOS = async (req, res) => {
  try {
    const { latitude, longitude } = req.body;

    if (latitude === undefined || longitude === undefined) {
      return res.status(400).json({
        message: "Latitude and longitude are required",
      });
    }

    const sos = await Sos.create({
      user: req.user._id,
      latitude,
      longitude,
      status: "Active",
    });

    res.status(201).json({
      message: "SOS Alert Created Successfully",
      sos,
    });
  } catch (error) {
    console.error("Create SOS Error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// =======================
// Get My SOS Alerts - User
// =======================
const getSOSAlerts = async (req, res) => {
  try {
    const sosAlerts = await Sos.find({
      user: req.user._id,
    })
      .populate("assignedVolunteer", "name phone email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: sosAlerts.length,
      sosAlerts,
    });
  } catch (error) {
    console.error("Get SOS Error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// =======================
// Update SOS Status - User
// =======================
const updateSOSStatus = async (req, res) => {
  try {
    const sos = await Sos.findById(req.params.id);

    if (!sos) {
      return res.status(404).json({
        message: "SOS Alert not found",
      });
    }

    // SOS must belong to logged-in user
    if (sos.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "Not authorized",
      });
    }

    const allowedStatuses = [
      "Active",
      "Accepted",
      "On the Way",
      "Resolved",
    ];

    if (!allowedStatuses.includes(req.body.status)) {
      return res.status(400).json({
        message: "Invalid SOS status",
      });
    }

    sos.status = req.body.status;

    await sos.save();

    res.status(200).json({
      message: "SOS status updated successfully",
      sos,
    });
  } catch (error) {
    console.error("Update SOS Status Error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// =======================
// Get All Active SOS - Volunteer
// =======================
const getAllActiveSOS = async (req, res) => {
  try {
    const sosAlerts = await Sos.find({
      status: "Active",
    })
      .populate("user", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: sosAlerts.length,
      sosAlerts,
    });
  } catch (error) {
    console.error("Get Active SOS Error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// =======================
// Get My Assigned SOS - Volunteer
// =======================
const getMyAssignedSOS = async (req, res) => {
  try {
    const sosAlerts = await Sos.find({
      assignedVolunteer: req.user._id,
    })
      .populate("user", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: sosAlerts.length,
      sosAlerts,
    });
  } catch (error) {
    console.error("Get My Assigned SOS Error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// =======================
// Volunteer Accept SOS
// =======================
const acceptSOS = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: "Volunteer authentication failed",
      });
    }

    const sos = await Sos.findById(req.params.id);

    if (!sos) {
      return res.status(404).json({
        message: "SOS not found",
      });
    }

    // SOS must still be active
    if (sos.status !== "Active") {
      return res.status(400).json({
        message: `SOS is already ${sos.status}`,
      });
    }

    // Prevent multiple volunteers from accepting
    if (sos.assignedVolunteer) {
      return res.status(400).json({
        message: "This SOS is already assigned to a volunteer",
      });
    }

    sos.status = "Accepted";
    sos.assignedVolunteer = req.user._id;

    await sos.save();

    res.status(200).json({
      message: "SOS Accepted Successfully",
      sos,
    });
  } catch (error) {
    console.error("Accept SOS Error:", error);

    res.status(500).json({
      message: "Server Error while accepting SOS",
      error: error.message,
    });
  }
};


// =======================
// Volunteer Update SOS Status
// =======================
const volunteerUpdateSOS = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        message: "Volunteer authentication failed",
      });
    }

    const sos = await Sos.findById(req.params.id);

    if (!sos) {
      return res.status(404).json({
        message: "SOS not found",
      });
    }

    // SOS must be assigned
    if (!sos.assignedVolunteer) {
      return res.status(403).json({
        message: "This SOS has not been assigned to a volunteer",
      });
    }

    // Only assigned volunteer can update
    if (
      sos.assignedVolunteer.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "You are not assigned to this SOS",
      });
    }

    const newStatus = req.body.status;

    // Accepted → On the Way
    if (newStatus === "On the Way") {
      if (sos.status !== "Accepted") {
        return res.status(400).json({
          message:
            `SOS must be Accepted before changing to On the Way. Current status: ${sos.status}`,
        });
      }

      sos.status = "On the Way";
    }

    // On the Way → Resolved
    else if (newStatus === "Resolved") {
      if (sos.status !== "On the Way") {
        return res.status(400).json({
          message:
            `SOS must be On the Way before resolving it. Current status: ${sos.status}`,
        });
      }

      sos.status = "Resolved";
    }

    // Invalid status
    else {
      return res.status(400).json({
        message: "Invalid SOS status",
      });
    }

    await sos.save();

    res.status(200).json({
      message: `SOS status updated to ${sos.status}`,
      sos,
    });
  } catch (error) {
    console.error("Volunteer Update SOS Error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};


// =======================
// Export Controllers
// =======================
module.exports = {
  createSOS,
  getSOSAlerts,
  updateSOSStatus,
  getAllActiveSOS,
  getMyAssignedSOS,
  acceptSOS,
  volunteerUpdateSOS,
};