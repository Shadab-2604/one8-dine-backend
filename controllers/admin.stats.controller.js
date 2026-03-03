const statsService = require("../services/admin.stats.service");

exports.getDashboardStats = async (req, res, next) => {
  try {
    const stats = await statsService.getStats();
    res.status(200).json({
      success: true,
      stats,
    });
  } catch (err) {
    next(err);
  }
};