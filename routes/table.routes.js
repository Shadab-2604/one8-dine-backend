const express = require("express");
const router = express.Router();

const {
  checkAvailability,
} = require("../controllers/table.controller");

router.get("/availability", checkAvailability);

module.exports = router;