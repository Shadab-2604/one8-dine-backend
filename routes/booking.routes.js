const express = require("express");
const router = express.Router();

const {
  createBooking,
  getMyBookings,
  cancelBooking,
} = require("../controllers/booking.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

router.post("/", authMiddleware, validate(["date", "time", "guests"]), createBooking);
router.get("/my", authMiddleware, getMyBookings);
router.delete("/:id", authMiddleware, cancelBooking);

module.exports = router;