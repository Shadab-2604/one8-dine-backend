const express = require("express");
const router = express.Router();

const {
  getAllMenuItems,
  getMenuItemById,
} = require("../controllers/menu.controller");

router.get("/", getAllMenuItems);
router.get("/:id", getMenuItemById);

module.exports = router;