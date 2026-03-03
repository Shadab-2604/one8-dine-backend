const authService = require("../services/auth.service");

exports.signup = async (req, res, next) => {
  try {
    const result = await authService.signup(req.body); // { token, user }
    res.status(201).json({
      success: true,
      message: "Account created successfully",
      token: result.token,
      user: result.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const result = await authService.login(req.body);
    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.logout = async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};