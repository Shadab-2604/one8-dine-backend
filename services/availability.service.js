const Table = require("../models/Table.model");
const Booking = require("../models/Booking.model");

exports.check = async ({ date, time, guests }) => {
  // only treat undefined as missing; coerce guests to number
  if (typeof date === 'undefined' || typeof time === 'undefined' || typeof guests === 'undefined') {
    const err = new Error('Missing availability parameters');
    err.statusCode = 400;
    throw err;
  }

  const guestCount = Number(guests);
  if (Number.isNaN(guestCount) || guestCount <= 0) {
    const err = new Error('Invalid guests parameter');
    err.statusCode = 400;
    throw err;
  }

  const tables = await Table.find({
    capacity: { $gte: guestCount },
    isActive: true,
  });

  const bookedTables = await Booking.find({
    date,
    time,
    status: { $ne: 'cancelled' },
  }).select('table');

  const bookedTableIds = bookedTables.map(
    (b) => b.table.toString()
  );

  return tables.filter(
    (table) => !bookedTableIds.includes(table._id.toString())
  );
};