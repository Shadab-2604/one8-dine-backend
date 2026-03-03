// seed-tables.js — run once to populate tables collection
require('./config/env');
const connectDatabase = require('./config/database');
const Table = require('./models/Table.model');

const tables = [
  { tableNumber: 1, capacity: 2 },
  { tableNumber: 2, capacity: 2 },
  { tableNumber: 3, capacity: 4 },
  { tableNumber: 4, capacity: 4 },
  { tableNumber: 5, capacity: 4 },
  { tableNumber: 6, capacity: 6 },
  { tableNumber: 7, capacity: 6 },
  { tableNumber: 8, capacity: 8 },
  { tableNumber: 9, capacity: 10 },
  { tableNumber: 10, capacity: 10 },
];

(async () => {
  await connectDatabase();
  const existing = await Table.countDocuments();
  if (existing > 0) {
    console.log(`ℹ️  Tables already seeded (${existing} found). Skipping.`);
    process.exit(0);
  }
  await Table.insertMany(tables);
  console.log(`✅ Seeded ${tables.length} tables successfully.`);
  process.exit(0);
})();
