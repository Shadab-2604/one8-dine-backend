const express = require("express");
const router = express.Router();

const {
  createOrder,
  getMyOrders,
} = require("../controllers/order.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

router.post("/", authMiddleware, validate(["items"]), createOrder);
router.get("/my", authMiddleware, getMyOrders);

module.exports = router;