const MenuItem = require("../models/MenuItem.model");

exports.getAll = async (query) => {
  const filter = {};
  if (query.category && query.category !== "all") {
    filter.category = query.category;
  }
  return MenuItem.find(filter);
};

exports.getById = async (id) => {
  const item = await MenuItem.findById(id);
  if (!item) throw new Error("Menu item not found");
  return item;
};

exports.create = async (data) => {
  return MenuItem.create(data);
};

exports.update = async (id, data) => {
  const item = await MenuItem.findByIdAndUpdate(id, data, { new: true });
  if (!item) throw new Error("Menu item not found");
  return item;
};

exports.remove = async (id) => {
  await MenuItem.findByIdAndDelete(id);
};