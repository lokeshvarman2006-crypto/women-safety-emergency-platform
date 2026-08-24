const mongoose = require("mongoose");
const dns = require("dns");

const connectDB = async () => {
  const uri = process.env.MONGO_URI || process.env.MONGO_URI_FALLBACK || "mongodb://127.0.0.1:27017/women-safety-platform";

  if (!process.env.MONGO_URI && !process.env.MONGO_URI_FALLBACK) {
    console.warn("⚠️ No MONGO_URI configured. Falling back to localhost MongoDB.");
  }

  try {
    const dnsServers = process.env.MONGO_DNS_SERVERS
      ? process.env.MONGO_DNS_SERVERS.split(",").map((server) => server.trim())
      : ["8.8.8.8", "1.1.1.1"];

    if (dnsServers.length) {
      dns.setServers(dnsServers);
      console.log(`🔧 Using DNS servers: ${dnsServers.join(", ")}`);
    }

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected Successfully");
    return true;
  } catch (error) {
    console.warn("⚠️ MongoDB connection failed. Continuing without a database connection.");
    console.warn(error.message || error);
    return false;
  }
};

module.exports = connectDB;