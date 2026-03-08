const Order = require("../models/Order.model");
const MenuItem = require("../models/MenuItem.model");
const availabilityService = require("./availability.service");

exports.create = async (userId, { tableId, date, time, guests, items }) => {
  // Check availability
  const availableTables = await availabilityService.check({ date, time, guests });
  const isAvailable = availableTables.some(table => table._id.toString() === tableId);
  if (!isAvailable) {
    throw new Error("Table not available for the selected date and time");
  }

  let total = 0;
  const orderItems = [];

  for (const item of items) {
    const menuItem = await MenuItem.findById(item.menuItemId);
    if (!menuItem) throw new Error("Invalid menu item");

    total += menuItem.price * item.quantity;

    orderItems.push({
      menuItem: menuItem._id,
      quantity: item.quantity,
      price: menuItem.price,
    });
  }

  return Order.create({
    user: userId,
    table: tableId,
    date,
    time,
    guests,
    items: orderItems,
    totalAmount: total,
  });
};

exports.getByUser = async (userId) => {
  return Order.find({ user: userId }).populate("items.menuItem").populate("table");
};

exports.getAll = async () => {
  return Order.find()
    .populate("user")
    .populate("items.menuItem")
    .populate("table");
};

exports.updateStatus = async (id, status) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Order not found");

  order.status = status;
  await order.save();
};