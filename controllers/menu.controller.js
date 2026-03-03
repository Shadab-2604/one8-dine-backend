const menuService = require("../services/menu.service");

exports.getAllMenuItems = async (req, res, next) => {
  try {
    const items = await menuService.getAll(req.query);
    res.status(200).json({ success: true, items });
  } catch (err) {
    next(err);
  }
};

exports.getMenuItemById = async (req, res, next) => {
  try {
    const item = await menuService.getById(req.params.id);
    res.status(200).json({ success: true, item });
  } catch (err) {
    next(err);
  }
};