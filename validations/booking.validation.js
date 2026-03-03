module.exports.validateBooking = (data) => {
  const { date, time, guests } = data;

  if (!date || !time || !guests) {
    throw new Error("Date, time and guests are required");
  }

  if (guests < 1) {
    throw new Error("Guests must be at least 1");
  }

  // Basic format checks (frontend already handles picker)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Invalid date format (YYYY-MM-DD)");
  }

  if (!/^\d{2}:\d{2}$/.test(time)) {
    throw new Error("Invalid time format (HH:mm)");
  }
};