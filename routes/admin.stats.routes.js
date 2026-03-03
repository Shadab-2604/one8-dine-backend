const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
} = require("../controllers/admin.stats.controller");

const adminMiddleware = require("../middleware/admin.middleware");

router.get("/", adminMiddleware, getDashboardStats);

module.exports = router;