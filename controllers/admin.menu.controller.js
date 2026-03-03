const menuService = require("../services/menu.service");

exports.createMenuItem = async (req, res, next) => {
  try {
    await menuService.create(req.body);
    res.status(201).json({
      success: true,
      message: "Menu item created",
    });
  } catch (err) {
    next(err);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    await menuService.update(req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: "Menu item updated",
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteMenuItem = async (req, res, next) => {
  try {
    await menuService.remove(req.params.id);
    res.status(200).json({
      success: true,
      message: "Menu item deleted",
    });
  } catch (err) {
    next(err);
  }
};