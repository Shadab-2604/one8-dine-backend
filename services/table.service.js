const Table = require("../models/Table.model");

exports.getAll = async () => {
  return Table.find({ isActive: true });
};

exports.create = async (data) => {
  return Table.create(data);
};