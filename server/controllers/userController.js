const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const Sos = require("../models/Sos");

// =======================
// Register User
// =======================
const registerUser = async (req, res) => {
  console.log("Mongoose readyState:", mongoose.connection.readyState);

  try {
    const {
      name,
      email,
      password,
      phone,
      age,
      gender,
      bloodGroup,
      address,
      medicalCondition,
      emergencyNote,
    } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create User
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      age,
      gender,
      bloodGroup,
      address,
      medicalCondition,
      emergencyNote,
    });

    // Save User
    await newUser.save();

    // Response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (error) {
    console.error("Registration Error:", error);

    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// =======================
// Login User
// =======================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check User
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    // Generate Token
    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(200).json({
      message: "Login Successful",
      token,
      user: {
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
// Update User Profile
// =======================
const updateUserProfile = async (req, res) => {
  try {

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.phone = req.body.phone || user.phone;
    user.age = req.body.age || user.age;
    user.gender = req.body.gender || user.gender;
    user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
    user.address = req.body.address || user.address;
    user.medicalCondition =
      req.body.medicalCondition || user.medicalCondition;
    user.emergencyNote =
      req.body.emergencyNote || user.emergencyNote;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

// =======================
// Get Emergency History
// =======================
const getEmergencyHistory = async (req, res) => {
  try {

    const history = await Sos.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: history.length,
      history,
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  updateUserProfile,
  getEmergencyHistory,
};