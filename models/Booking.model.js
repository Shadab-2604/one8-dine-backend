const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    table: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Table",
      required: true,
    },

    date: {
      type: String, // YYYY-MM-DD
      required: true,
    },

    time: {
      type: String, // HH:mm (24h)
      required: true,
    },

    guests: {
      type: Number,
      required: true,
      min: 1,
    },

    specialRequest: {
      type: String,
      trim: true,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

/**
 * Prevent double booking of same table
 * at same date & time
 */
bookingSchema.index({ table: 1, date: 1, time: 1 }, { unique: true });

module.exports = mongoose.model("Booking", bookingSchema);