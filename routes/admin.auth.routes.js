const express = require("express");
const router = express.Router();

const {
  adminLogin,
  adminLogout,
  adminMe,
} = require("../controllers/admin.auth.controller");

const adminMiddleware = require("../middleware/admin.middleware");

router.post("/login", adminLogin);
router.post("/logout", adminMiddleware, adminLogout);
router.get("/me", adminMiddleware, adminMe);

module.exports = router;