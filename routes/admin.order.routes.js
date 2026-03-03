const express = require("express");
const router = express.Router();

const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/admin.order.controller");

const adminMiddleware = require("../middleware/admin.middleware");

router.get("/", adminMiddleware, getAllOrders);
router.put("/:id/status", adminMiddleware, updateOrderStatus);

module.exports = router;