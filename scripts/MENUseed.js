// scripts/MENUseed.js
// Run from the backend root: node scripts/MENUseed.js

require('../config/env');
const connectDatabase = require('../config/database');
const MenuItem = require('../models/MenuItem.model');

const menuItems = [
  // ─── APPETIZERS (1–25) ───────────────────────────────────────────────────
  { name: 'Truffle Burrata',        description: 'Creamy burrata with shaved black truffle and aged balsamic', price: 21.99, category: 'appetizers' },
  { name: 'Seared Scallops',        description: 'Pan-seared scallops with lemon beurre blanc',                 price: 24.99, category: 'appetizers' },
  { name: 'Lobster Bisque',         description: 'Rich lobster soup with cognac cream',                         price: 19.99, category: 'appetizers' },
  { name: 'Foie Gras Torchón',      description: 'Duck liver terrine with fig compote',                         price: 29.99, category: 'appetizers' },
  { name: 'Tuna Tartare',           description: 'Yellowfin tuna with avocado mousse',                          price: 23.99, category: 'appetizers' },
  { name: 'Caviar Blinis',          description: 'Oscietra caviar with crème fraîche',                          price: 39.99, category: 'appetizers' },
  { name: 'Truffle Arancini',       description: 'Crispy risotto balls with parmesan foam',                     price: 17.99, category: 'appetizers' },
  { name: 'Calamari Fritti',        description: 'Crispy calamari with saffron aioli',                          price: 18.99, category: 'appetizers' },
  { name: 'Beef Carpaccio',         description: 'Thin sliced beef with capers and arugula',                    price: 22.99, category: 'appetizers' },
  { name: 'Bruschetta Trio',        description: 'Tomato basil, truffle mushroom, whipped ricotta',             price: 16.99, category: 'appetizers' },
  { name: 'Stuffed Portobello',     description: 'Spinach and goat cheese filling',                             price: 18.49, category: 'appetizers' },
  { name: 'Oysters Rockefeller',    description: 'Baked oysters with herb butter',                              price: 27.99, category: 'appetizers' },
  { name: 'Prawn Cocktail Royale',  description: 'Jumbo prawns with cocktail sauce',                            price: 25.99, category: 'appetizers' },
  { name: 'Smoked Salmon Roulade',  description: 'Salmon wrapped around dill cream',                            price: 19.49, category: 'appetizers' },
  { name: 'Tempura Asparagus',      description: 'Crispy asparagus with miso dip',                              price: 15.99, category: 'appetizers' },
  { name: 'Duck Spring Rolls',      description: 'Crispy rolls with hoisin glaze',                              price: 18.99, category: 'appetizers' },
  { name: 'Burrata Caprese',        description: 'Heirloom tomatoes with fresh burrata',                        price: 20.99, category: 'appetizers' },
  { name: 'Grilled Octopus',        description: 'Charred octopus with olive tapenade',                         price: 26.99, category: 'appetizers' },
  { name: 'Lamb Kofta Bites',       description: 'Spiced lamb with mint yogurt',                                price: 19.99, category: 'appetizers' },
  { name: 'Crab Cakes',             description: 'Blue crab cakes with remoulade',                              price: 24.49, category: 'appetizers' },
  { name: 'Mushroom Velouté',       description: 'Creamy wild mushroom soup',                                   price: 17.49, category: 'appetizers' },
  { name: 'Cheese Platter',         description: 'Artisan cheese selection',                                    price: 28.99, category: 'appetizers' },
  { name: 'Prosciutto & Melon',     description: 'Aged prosciutto with cantaloupe',                             price: 18.49, category: 'appetizers' },
  { name: 'Shrimp Ceviche',         description: 'Citrus-marinated shrimp',                                     price: 20.99, category: 'appetizers' },
  { name: 'Avocado Tartine',        description: 'Toasted sourdough with microgreens',                          price: 15.49, category: 'appetizers' },

  // ─── MAINS (26–65) ───────────────────────────────────────────────────────
  { name: 'Wagyu Beef Steak',       description: 'Premium A5 wagyu with truffle butter',                        price: 78.99, category: 'mains' },
  { name: 'Filet Mignon',           description: 'Tender beef with red wine jus',                               price: 56.99, category: 'mains' },
  { name: 'Ribeye Steak',           description: '12oz prime ribeye grilled to perfection',                     price: 52.99, category: 'mains' },
  { name: 'Rack of Lamb',           description: 'Herb-crusted lamb with mint glaze',                           price: 48.99, category: 'mains' },
  { name: 'Lobster Thermidor',      description: 'Lobster in creamy cognac sauce',                              price: 64.99, category: 'mains' },
  { name: 'Grilled Salmon',         description: 'Atlantic salmon with lemon herb butter',                      price: 38.99, category: 'mains' },
  { name: 'Duck Confit',            description: 'Slow-cooked duck leg with orange glaze',                      price: 42.99, category: 'mains' },
  { name: 'Chicken Supreme',        description: 'Free-range chicken with truffle mash',                        price: 34.99, category: 'mains' },
  { name: 'Sea Bass Fillet',        description: 'Pan-seared bass with saffron sauce',                          price: 41.99, category: 'mains' },
  { name: 'Beef Wellington',        description: 'Tenderloin wrapped in puff pastry',                           price: 69.99, category: 'mains' },
  { name: 'Truffle Risotto',        description: 'Creamy risotto with shaved truffle',                          price: 36.99, category: 'mains' },
  { name: 'Prawn Linguine',         description: 'Garlic butter prawns with pasta',                             price: 39.99, category: 'mains' },
  { name: 'Mushroom Ravioli',       description: 'Handmade ravioli with sage butter',                           price: 29.99, category: 'mains' },
  { name: 'Veal Chop',              description: 'Grilled veal with rosemary jus',                              price: 54.99, category: 'mains' },
  { name: 'T-Bone Steak',           description: 'Premium cut grilled steak',                                   price: 59.99, category: 'mains' },
  { name: 'BBQ Short Ribs',         description: 'Slow-braised beef ribs',                                      price: 44.99, category: 'mains' },
  { name: 'Stuffed Chicken Breast', description: 'Spinach and feta stuffing',                                   price: 33.99, category: 'mains' },
  { name: 'Seafood Paella',         description: 'Saffron rice with seafood medley',                            price: 47.99, category: 'mains' },
  { name: 'Lamb Shank',             description: 'Braised lamb with garlic mash',                               price: 45.99, category: 'mains' },
  { name: 'Vegetable Wellington',   description: 'Roasted vegetables in pastry',                                price: 28.99, category: 'mains' },
  { name: 'King Crab Legs',         description: 'Steamed crab with butter sauce',                              price: 72.99, category: 'mains' },
  { name: 'Pesto Gnocchi',          description: 'Potato gnocchi with basil pesto',                             price: 26.99, category: 'mains' },
  { name: 'Spaghetti Carbonara',    description: 'Classic Italian carbonara',                                   price: 27.99, category: 'mains' },
  { name: 'Chicken Alfredo',        description: 'Creamy parmesan sauce',                                       price: 31.99, category: 'mains' },
  { name: 'Herb Crusted Cod',       description: 'Oven-baked cod fillet',                                       price: 35.99, category: 'mains' },
  { name: 'Grilled Swordfish',      description: 'Char-grilled with caper sauce',                               price: 44.49, category: 'mains' },
  { name: 'Stuffed Bell Peppers',   description: 'Quinoa and vegetable stuffing',                               price: 24.99, category: 'mains' },
  { name: 'Peking Duck',            description: 'Crispy duck with pancakes',                                   price: 58.99, category: 'mains' },
  { name: 'Butter Chicken Royale',  description: 'Creamy tomato curry',                                         price: 29.99, category: 'mains' },
  { name: 'Paneer Tikka Masala',    description: 'Grilled paneer in rich gravy',                                price: 27.99, category: 'mains' },
  { name: 'Margherita Pizza',       description: 'Wood-fired classic',                                          price: 19.99, category: 'mains' },
  { name: 'Truffle Pizza',          description: 'White sauce, mushrooms, truffle oil',                         price: 24.99, category: 'mains' },
  { name: 'BBQ Chicken Pizza',      description: 'Smoky barbecue flavor',                                       price: 22.99, category: 'mains' },
  { name: 'Seafood Platter',        description: 'Lobster, prawns, scallops',                                   price: 79.99, category: 'mains' },
  { name: 'Chicken Biryani',        description: 'Aromatic basmati rice',                                       price: 24.99, category: 'mains' },
  { name: 'Mutton Biryani',         description: 'Slow-cooked spiced rice',                                     price: 28.99, category: 'mains' },
  { name: 'Lasagna Bolognese',      description: 'Layered pasta with meat sauce',                               price: 26.99, category: 'mains' },
  { name: 'Grilled Tofu Steak',     description: 'Marinated tofu with veggies',                                 price: 23.99, category: 'mains' },
  { name: 'Shrimp Alfredo',         description: 'Creamy pasta with shrimp',                                    price: 34.99, category: 'mains' },
  { name: 'Chateaubriand',          description: 'Premium tenderloin for two',                                  price: 89.99, category: 'mains' },

  // ─── DESSERTS (66–85) ────────────────────────────────────────────────────
  { name: 'Chocolate Fondant',         description: 'Molten chocolate cake',                  price: 14.99, category: 'desserts' },
  { name: 'Tiramisu',                  description: 'Classic espresso dessert',               price: 13.99, category: 'desserts' },
  { name: 'Crème Brûlée',              description: 'Vanilla custard caramelized top',        price: 12.99, category: 'desserts' },
  { name: 'Cheesecake Supreme',        description: 'Baked New York cheesecake',              price: 13.49, category: 'desserts' },
  { name: 'Macaron Selection',         description: 'Assorted French macarons',               price: 15.99, category: 'desserts' },
  { name: 'Panna Cotta',               description: 'Creamy vanilla dessert',                 price: 12.49, category: 'desserts' },
  { name: 'Fruit Tart',                description: 'Seasonal fruits on pastry cream',        price: 14.49, category: 'desserts' },
  { name: 'Chocolate Mousse',          description: 'Dark chocolate mousse',                  price: 13.99, category: 'desserts' },
  { name: 'Red Velvet Cake',           description: 'Cream cheese frosting',                  price: 12.99, category: 'desserts' },
  { name: 'Opera Cake',                description: 'Coffee chocolate layered cake',          price: 15.49, category: 'desserts' },
  { name: 'Banoffee Pie',              description: 'Banana caramel delight',                 price: 13.49, category: 'desserts' },
  { name: 'Lemon Tart',                description: 'Zesty lemon curd tart',                  price: 12.99, category: 'desserts' },
  { name: 'Ice Cream Trio',            description: 'Three gourmet scoops',                   price: 11.99, category: 'desserts' },
  { name: 'Affogato',                  description: 'Espresso over vanilla ice cream',        price: 10.99, category: 'desserts' },
  { name: 'Churros Deluxe',            description: 'Cinnamon churros with dip',              price: 11.49, category: 'desserts' },
  { name: 'Baklava',                   description: 'Honey and nut pastry',                   price: 12.99, category: 'desserts' },
  { name: 'Sticky Toffee Pudding',     description: 'Warm pudding with sauce',                price: 14.99, category: 'desserts' },
  { name: 'Soufflé',                   description: 'Freshly baked chocolate soufflé',        price: 16.99, category: 'desserts' },
  { name: 'Carrot Cake',               description: 'Walnut cream frosting',                  price: 12.49, category: 'desserts' },
  { name: 'Molten White Chocolate Cake', description: 'With raspberry coulis',               price: 15.99, category: 'desserts' },

  // ─── BEVERAGES (86–100) ──────────────────────────────────────────────────
  { name: 'Espresso',           description: 'Double shot premium roast',       price:  5.99, category: 'beverages' },
  { name: 'Cappuccino',         description: 'Frothy Italian classic',           price:  6.99, category: 'beverages' },
  { name: 'Latte',              description: 'Smooth espresso with milk',        price:  6.49, category: 'beverages' },
  { name: 'Iced Coffee',        description: 'Chilled artisan brew',             price:  6.99, category: 'beverages' },
  { name: 'Matcha Latte',       description: 'Premium Japanese matcha',          price:  7.49, category: 'beverages' },
  { name: 'House Wine',         description: 'Glass of red or white wine',       price: 12.99, category: 'beverages' },
  { name: 'Champagne Brut',     description: 'Premium sparkling wine',           price: 18.99, category: 'beverages' },
  { name: 'Craft Cocktails',    description: 'Signature cocktail',               price: 16.99, category: 'beverages' },
  { name: 'Mojito Royale',      description: 'Mint lime rum cocktail',           price: 15.99, category: 'beverages' },
  { name: 'Old Fashioned',      description: 'Bourbon classic',                  price: 17.49, category: 'beverages' },
  { name: 'Sparkling Water',    description: 'Imported mineral water',           price:  6.99, category: 'beverages' },
  { name: 'Fresh Orange Juice', description: 'Cold pressed',                     price:  8.49, category: 'beverages' },
  { name: 'Berry Smoothie',     description: 'Mixed berries blend',              price:  9.99, category: 'beverages' },
  { name: 'Green Detox Juice',  description: 'Spinach apple blend',              price:  9.49, category: 'beverages' },
  { name: 'Mocktail Sunset',    description: 'Citrus tropical blend',            price: 10.99, category: 'beverages' },
];

(async () => {
  await connectDatabase();

  const existing = await MenuItem.countDocuments();
  if (existing > 0) {
    console.log(`ℹ️  Menu already seeded (${existing} items found). Skipping.`);
    console.log('   To re-seed, drop the menuitems collection first.');
    process.exit(0);
  }

  const result = await MenuItem.insertMany(menuItems);
  console.log(`✅ Seeded ${result.length} menu items successfully.`);
  console.log(`   Appetizers : ${menuItems.filter(i => i.category === 'appetizers').length}`);
  console.log(`   Mains      : ${menuItems.filter(i => i.category === 'mains').length}`);
  console.log(`   Desserts   : ${menuItems.filter(i => i.category === 'desserts').length}`);
  console.log(`   Beverages  : ${menuItems.filter(i => i.category === 'beverages').length}`);
  process.exit(0);
})();
