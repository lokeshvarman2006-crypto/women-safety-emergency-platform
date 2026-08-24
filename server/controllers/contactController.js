const Contact = require("../models/Contact");

// =======================
// Add Contact
// =======================
const addContact = async (req, res) => {
  try {
    const { name, phone, relationship } = req.body;

    const contact = new Contact({
      user: req.user._id,
      name,
      phone,
      relationship,
    });

    await contact.save();

    res.status(201).json({
      message: "Contact added successfully",
      contact,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// =======================
// Get My Contacts
// =======================
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({
      user: req.user._id,
    });

    res.status(200).json({
      count: contacts.length,
      contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
// =======================
// Update Contact
// =======================
const updateContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    // Make sure the contact belongs to the logged-in user
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Contact updated successfully",
      contact: updatedContact,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
// =======================
// Delete Contact
// =======================
const deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    // Make sure the contact belongs to the logged-in user
    if (contact.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Contact.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Contact deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};
module.exports = {
  addContact,
  getContacts,
  updateContact,
  deleteContact,
};