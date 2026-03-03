const express = require("express");
const router = express.Router();

const {
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/admin.booking.controller");

const adminMiddleware = require("../middleware/admin.middleware");

router.get("/", adminMiddleware, getAllBookings);
router.put("/:id/status", adminMiddleware, updateBookingStatus);

module.exports = router;