const orderService = require("../services/order.service");

exports.createOrder = async (req, res, next) => {
  try {
    const order = await orderService.create(req.user.id, req.body);
    res.status(201).json({
      success: true,
      order,
    });
  } catch (err) {
    next(err);
  }
};

exports.getMyOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getByUser(req.user.id);
    res.status(200).json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};