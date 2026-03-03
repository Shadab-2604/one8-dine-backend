module.exports.validateOrder = (data) => {
  const { items } = data;

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