const Table = require("../models/Table.model");
const Booking = require("../models/Booking.model");
const Order = require("../models/Order.model");

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

  const orderedTables = await Order.find({
    date,
    time,
    status: { $ne: 'cancelled' },
  }).select('table');

  const bookedTableIds = bookedTables.map(
    (b) => b.table.toString()
  );

  const orderedTableIds = orderedTables.map(
    (o) => o.table.toString()
  );

  const unavailableTableIds = new Set([...bookedTableIds, ...orderedTableIds]);

  return tables.filter(
    (table) => !unavailableTableIds.has(table._id.toString())
  );
};