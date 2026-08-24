const mongoose = require("mongoose");

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      default: "",
    },

    city: {
      type: String,
      default: "",
    },

    verified: {
      type: Boolean,
      default: false,
    },

    available: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Volunteer", volunteerSchema);