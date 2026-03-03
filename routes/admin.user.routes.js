const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getUserById,
  deleteUser,
} = require("../controllers/admin.user.controller");

const adminMiddleware = require("../middleware/admin.middleware");

router.get("/", adminMiddleware, getAllUsers);
router.get("/:id", adminMiddleware, getUserById);
router.delete("/:id", adminMiddleware, deleteUser);

module.exports = router;