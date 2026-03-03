// app.js

const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const menuRoutes = require("./routes/menu.routes");
const bookingRoutes = require("./routes/booking.routes");
const tableRoutes = require("./routes/table.routes");
const orderRoutes = require("./routes/order.routes");

const adminAuthRoutes = require("./routes/admin.auth.routes");
const rateLimit = require("express-rate-limit");
const adminMenuRoutes = require("./routes/admin.menu.routes");
const adminBookingRoutes = require("./routes/admin.booking.routes");
const adminOrderRoutes = require("./routes/admin.order.routes");
const adminUserRoutes = require("./routes/admin.user.routes");
const adminStatsRoutes = require("./routes/admin.stats.routes");

const errorMiddleware = require("./middleware/error.middleware");

const app = express();

/* =======================
   GLOBAL MIDDLEWARES
======================= */

app.use(
  cors({
    origin: "*", // allow all origins (safe for dev/testing)
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Parse JSON bodies
app.use(express.json({ limit: "10mb" }));

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

/* =======================
   HEALTH CHECK
======================= */

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

/* =======================
   USER ROUTES
======================= */

// rate limit auth endpoints to mitigate brute-force attacks
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 100 });
app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/orders", orderRoutes);

/* =======================
   ADMIN ROUTES
======================= */

// apply a lighter rate limit for admin auth
const adminAuthLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 50 });
app.use("/api/admin/auth", adminAuthLimiter, adminAuthRoutes);
app.use("/api/admin/menu", adminMenuRoutes);
app.use("/api/admin/bookings", adminBookingRoutes);
app.use("/api/admin/orders", adminOrderRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/admin/stats", adminStatsRoutes);

/* =======================
   404 HANDLER
======================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =======================
   ERROR HANDLER (LAST)
======================= */

app.use(errorMiddleware);

module.exports = app;