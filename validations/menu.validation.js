module.exports.validateMenuItem = (data) => {
  const { name, price, category } = data;

  if (!name || price === undefined || !category) {
    throw new Error("Name, price and category are required");
  }

  if (price < 0) {
    throw new Error("Price cannot be negative");
  }

  const allowedCategories = [
    "appetizers",
    "mains",
    "desserts",
    "beverages",
  ];

  if (!allowedCategories.includes(category)) {
    throw new Error("Invalid menu category");
  }
};