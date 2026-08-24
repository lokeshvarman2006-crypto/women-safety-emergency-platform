const express = require("express");

const router = express.Router();

const {
  registerUser,
  loginUser,
  updateUserProfile,
  getEmergencyHistory,
} = require("../controllers/userController");
const protect = require("../middleware/authMiddleware");

router.post("/register", registerUser);

router.post("/login", loginUser);
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user,
  });
});
router.put("/profile", protect, updateUserProfile);
router.get("/emergency-history", protect, getEmergencyHistory);

module.exports = router;