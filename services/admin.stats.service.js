const User = require("../models/User.model");
const Booking = require("../models/Booking.model");
const Order = require("../models/Order.model");

exports.getStats = async () => {
  const [totalUsers, totalBookings, orders] = await Promise.all([
    User.countDocuments(),
    Booking.countDocuments(),
    Order.find(),
  ]);

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return {
    totalUsers,
    totalBookings,
    totalOrders: orders.length,
    totalRevenue,
  };
};