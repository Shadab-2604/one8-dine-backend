const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getMe,
  logout,
} = require("../controllers/auth.controller");

const authMiddleware = require("../middleware/auth.middleware");
const validate = require("../middleware/validate.middleware");

router.post("/signup", validate(["name", "email", "password"]), signup);
router.post("/login", validate(["email", "password"]), login);
router.get("/me", authMiddleware, getMe);
router.post("/logout", authMiddleware, logout);

module.exports = router;