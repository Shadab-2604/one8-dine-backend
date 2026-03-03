const adminAuthService = require("../services/admin.auth.service");

exports.adminLogin = async (req, res, next) => {
  try {
    const result = await adminAuthService.login(req.body);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

exports.adminMe = async (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
};

exports.adminLogout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Admin logged out",
  });
};