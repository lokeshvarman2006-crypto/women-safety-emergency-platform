const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const sosRoutes = require("./routes/sosRoutes");
const volunteerRoutes = require("./routes/volunteerRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Women Safety Platform Backend Running");
});

// User Routes
app.use("/api/users", userRoutes);

app.use("/api/contacts", contactRoutes);

app.use("/api/sos", sosRoutes);

app.use("/api/volunteers", volunteerRoutes);

app.use("/api/admin", adminRoutes);

module.exports = app;