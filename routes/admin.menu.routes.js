const express = require("express");
const router = express.Router();

const {
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../controllers/admin.menu.controller");

const adminMiddleware = require("../middleware/admin.middleware");
const validate = require("../middleware/validate.middleware");

router.post("/", adminMiddleware, validate(["name", "price", "category"]), createMenuItem);
router.put("/:id", adminMiddleware, validate(["name", "price", "category"]), updateMenuItem);
router.delete("/:id", adminMiddleware, deleteMenuItem);

module.exports = router;