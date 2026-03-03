const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const Booking = require("../models/Booking.model");
const Order = require("../models/Order.model");
const { JWT_SECRET } = require("../config/env");

exports.signup = async ({ name, email, password, phone }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    phone,
  });

  const token = jwt.sign({ id: user._id, role: "user" }, JWT_SECRET, { expiresIn: "7d" });

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

exports.login = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user._id, role: "user" },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };
};

exports.getAllUsers = async (query) => {
  // return users along with a bookingsCount field to help admin filters
  const users = await User.aggregate([
    {
      $lookup: {
        from: "bookings",
        localField: "_id",
        foreignField: "user",
        as: "bookings",
      },
    },
    {
      $addFields: { bookingsCount: { $size: "$bookings" } },
    },
    { $project: { bookings: 0, password: 0 } },
  ]);
  return users;
};

exports.getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

exports.deleteUser = async (id) => {
  // also remove any bookings or orders associated with the user
  await Booking.deleteMany({ user: id });
  await Order.deleteMany({ user: id });
  await User.findByIdAndDelete(id);
};