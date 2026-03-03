const availabilityService = require("../services/availability.service");

exports.checkAvailability = async (req, res, next) => {
  try {
    const availableTables = await availabilityService.check(req.query);
    res.status(200).json({
      success: true,
      availableTables,
    });
  } catch (err) {
    next(err);
  }
};