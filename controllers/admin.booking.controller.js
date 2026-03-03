const bookingService = require("../services/booking.service");

exports.getAllBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getAll();
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
};

exports.updateBookingStatus = async (req, res, next) => {
  try {
    await bookingService.updateStatus(req.params.id, req.body.status);
    res.status(200).json({
      success: true,
      message: "Booking status updated",
    });
  } catch (err) {
    next(err);
  }
};