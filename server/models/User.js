const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
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

    age: {
      type: Number,
      default: null,
    },

    gender: {
      type: String,
      default: "",
    },

    bloodGroup: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    medicalCondition: {
      type: String,
      default: "",
    },

    emergencyNote: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);