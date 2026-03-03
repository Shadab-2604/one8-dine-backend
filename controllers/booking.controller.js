const bookingService = require("../services/booking.service");

exports.createBooking = async (req, res, next) => {
  try {
    const booking = await bookingService.create(req.user.id, req.body);
    res.status(201).json({
      success: true,
      booking,
    });
  } catch (err) {
    // if service set statusCode, forward to error middleware
    next(err);
  }
};

exports.getMyBookings = async (req, res, next) => {
  try {
    const bookings = await bookingService.getByUser(req.user.id);
    res.status(200).json({ success: true, bookings });
  } catch (err) {
    next(err);
  }
};

exports.cancelBooking = async (req, res, next) => {
  try {
    await bookingService.cancel(req.user.id, req.params.id);
    res.status(200).json({
      success: true,
      message: "Booking cancelled",
    });
  } catch (err) {
    next(err);
  }
};