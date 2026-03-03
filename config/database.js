// config/database.js
const mongoose = require("mongoose");
const { MONGODB_URI } = require("./env");

const connectDatabase = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      autoIndex: true,
    });

    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed");
    console.error(error.message);
    process.exit(1); // DO NOT RUN APP WITHOUT DB
  }
};

module.exports = connectDatabase;