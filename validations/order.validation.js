module.exports.validateOrder = (data) => {
  const { tableId, date, time, guests, items } = data;

  if (!tableId) {
    throw new Error("Table selection is required");
  }

  if (!date || !time) {
    throw new Error("Date and time are required");
  }

  if (!guests || guests < 1) {
    throw new Error("Number of guests must be at least 1");
  }

  if (!Array.isArray(items) || items.length === 0) {
    throw new Error("Order items are required");
  }

  items.forEach((item) => {
    if (!item.menuItemId || !item.quantity) {
      throw new Error("Each item must have menuItemId and quantity");
    }

    if (item.quantity < 1) {
      throw new Error("Item quantity must be at least 1");
    }
  });
};