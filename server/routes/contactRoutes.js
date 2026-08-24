const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// Add Contact
router.post("/", protect, addContact);

// Get All Contacts
router.get("/", protect, getContacts);

// Update Contact
router.put("/:id", protect, updateContact);

// Delete Contact
router.delete("/:id", protect, deleteContact);

module.exports = router;