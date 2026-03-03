const orderService = require("../services/order.service");

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getAll();
    res.status(200).json({ success: true, orders });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    await orderService.updateStatus(req.params.id, req.body.status);
    res.status(200).json({
      success: true,
      message: "Order status updated",
    });
  } catch (err) {
    next(err);
  }
};