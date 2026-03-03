const Booking = require("../models/Booking.model");
const availabilityService = require("./availability.service");

/* =========================
   CREATE BOOKING
========================= */

exports.create = async (userId, data) => {
  if (!userId) {
    const err = new Error("Unauthorized user");
    err.statusCode = 401;
    throw err;
  }

  if (!data.date || !data.time || !data.guests) {
    const err = new Error("Missing required booking fields");
    err.statusCode = 400;
    throw err;
  }

  const guests = Number(data.guests);
  if (isNaN(guests) || guests <= 0) {
    const err = new Error("Invalid guest count");
    err.statusCode = 400;
    throw err;
  }

  // Normalize date (YYYY-MM-DD only)
  const bookingDate = data.date;
  const bookingTime = data.time;

  /* =========================
     CHECK TABLE AVAILABILITY
  ========================== */

  const availableTables = await availabilityService.check({
    date: bookingDate,
    time: bookingTime,
    guests,
  });

  if (!availableTables || availableTables.length === 0) {
    const err = new Error("No tables available for selected time");
    err.statusCode = 400;
    throw err;
  }

  /* =========================
     CREATE BOOKING
  ========================== */

  try {
    const booking = await Booking.create({
      user: userId,
      table: availableTables[0]._id, // assign first available
      date: bookingDate,
      time: bookingTime,
      guests,
      specialRequest: data.specialRequest || "",
      status: "pending",
    });

    return booking;

  } catch (error) {
    // Unique index protection (date + time + table)
    if (error && error.code === 11000) {
      const err = new Error("Selected table already booked");
      err.statusCode = 409;
      throw err;
    }

    console.error("Booking Creation Error:", error);
    throw error;
  }
};

/* =========================
   GET BOOKINGS BY USER
========================= */

exports.getByUser = async (userId) => {
  return Booking.find({ user: userId })
    .populate("table")
    .sort({ createdAt: -1 });
};

/* =========================
   GET ALL BOOKINGS (ADMIN)
========================= */

exports.getAll = async () => {
  return Booking.find()
    .populate("user")
    .populate("table")
    .sort({ createdAt: -1 });
};

/* =========================
   UPDATE BOOKING STATUS
========================= */

exports.updateStatus = async (id, status) => {
  const booking = await Booking.findById(id);

  if (!booking) {
    const err = new Error("Booking not found");
    err.statusCode = 404;
    throw err;
  }

  booking.status = status;
  await booking.save();

  return booking;
};

/* =========================
   CANCEL BOOKING
========================= */

exports.cancel = async (userId, bookingId) => {
  const booking = await Booking.findOne({
    _id: bookingId,
    user: userId,
  });

  if (!booking) {
    const err = new Error("Booking not found");
    err.statusCode = 404;
    throw err;
  }

  booking.status = "cancelled";
  await booking.save();

  return booking;
};