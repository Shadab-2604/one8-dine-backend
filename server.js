// server.js

// 1️⃣ Load & validate environment variables (FAIL FAST)
require("./config/env");

const app = require("./app");
const connectDatabase = require("./config/database");
const { PORT } = require("./config/env");

/* =======================
   START SERVER
======================= */

const startServer = async () => {
  try {
    // 2️⃣ Connect to MongoDB
    await connectDatabase();

    // 3️⃣ Start HTTP server
    app.listen(PORT, () => {
      console.log(`🚀 ONE8 DINE Backend running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Server startup failed:", error.message);
    process.exit(1);
  }
};

startServer();