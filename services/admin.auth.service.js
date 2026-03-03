const jwt = require("jsonwebtoken");
const {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  JWT_SECRET,
} = require("../config/env");

exports.login = async ({ username, password }) => {
  if (
    username !== ADMIN_USERNAME ||
    password !== ADMIN_PASSWORD
  ) {
    throw new Error("Invalid admin credentials");
  }

  const token = jwt.sign(
    { role: "admin" },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return {
    token,
    role: "admin",
  };
};