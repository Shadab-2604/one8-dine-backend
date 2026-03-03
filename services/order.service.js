const Order = require("../models/Order.model");
const MenuItem = require("../models/MenuItem.model");

exports.create = async (userId, { items }) => {
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
    items: orderItems,
    totalAmount: total,
  });
};

exports.getByUser = async (userId) => {
  return Order.find({ user: userId }).populate("items.menuItem");
};

exports.getAll = async () => {
  return Order.find()
    .populate("user")
    .populate("items.menuItem");
};

exports.updateStatus = async (id, status) => {
  const order = await Order.findById(id);
  if (!order) throw new Error("Order not found");

  order.status = status;
  await order.save();
};