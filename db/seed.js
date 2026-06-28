const initSqlJs = require('sql.js');
const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, 'store.db');

if (fs.existsSync(DB_PATH)) {
  fs.unlinkSync(DB_PATH);
}

function run(db, sql, params) {
  const stmt = db.prepare(sql);
  stmt.bind(params);
  stmt.step();
  stmt.free();
}

async function seed() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  db.exec(fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8'));

  const categories = [
    { name: 'Shirts', slug: 'shirts', image: 'https://picsum.photos/seed/shirts/600/400' },
    { name: 'Hoodies', slug: 'hoodies', image: 'https://picsum.photos/seed/hoodies/600/400' },
    { name: 'Pants', slug: 'pants', image: 'https://picsum.photos/seed/pants/600/400' },
    { name: 'Shoes', slug: 'shoes', image: 'https://picsum.photos/seed/shoes/600/400' },
    { name: 'Accessories', slug: 'accessories', image: 'https://picsum.photos/seed/accessories/600/400' },
  ];

  const subcategories = {
    shirts: ['White Shirts', 'Summer Shirts', 'Formal Shirts', 'Oversized Shirts', 'Printed Shirts'],
    hoodies: ['Pullover Hoodies', 'Zip-Up Hoodies', 'Cropped Hoodies', 'Oversized Hoodies', 'Graphic Hoodies'],
    pants: ['Cargo Pants', 'Joggers', 'Chinos', 'Denim Jeans', 'Trousers'],
    shoes: ['Sneakers', 'Running Shoes', 'Loafers', 'Boots', 'Slip-Ons'],
    accessories: ['Watches', 'Belts', 'Wallets', 'Sunglasses', 'Bags'],
  };

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];
  const shoeSizes = ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'];
  const colors = ['Black', 'White', 'Navy', 'Gray', 'Beige'];

  function randomSizes(catSlug) {
    if (catSlug === 'shoes') return JSON.stringify(shoeSizes);
    return JSON.stringify(sizes);
  }

  function randomColors() {
    const count = 2 + Math.floor(Math.random() * 4);
    const shuffled = [...colors].sort(() => Math.random() - 0.5);
    return JSON.stringify(shuffled.slice(0, count));
  }

  const categoryMap = {};
  for (const cat of categories) {
    run(db, 'INSERT INTO categories (name, slug, image) VALUES (?, ?, ?)', [cat.name, cat.slug, cat.image]);
    const row = db.exec('SELECT last_insert_rowid() as id');
    categoryMap[cat.slug] = row[0].values[0][0];
  }

  const templates = {
    'White Shirts': { price: 29.99, desc: 'Crisp white shirt crafted from premium cotton. A timeless essential for every wardrobe.' },
    'Summer Shirts': { price: 24.99, desc: 'Lightweight and breathable summer shirt perfect for warm days.' },
    'Formal Shirts': { price: 49.99, desc: 'Sharp formal shirt with a tailored fit for professional occasions.' },
    'Oversized Shirts': { price: 34.99, desc: 'Relaxed oversized fit shirt for a casual, contemporary look.' },
    'Printed Shirts': { price: 27.99, desc: 'Bold printed shirt to make a statement wherever you go.' },
    'Pullover Hoodies': { price: 54.99, desc: 'Classic pullover hoodie with a soft fleece interior for maximum comfort.' },
    'Zip-Up Hoodies': { price: 59.99, desc: 'Versatile zip-up hoodie with a sleek silhouette and cozy warmth.' },
    'Cropped Hoodies': { price: 44.99, desc: 'Trendy cropped hoodie that pairs perfectly with high-waisted bottoms.' },
    'Oversized Hoodies': { price: 64.99, desc: 'Extra oversized hoodie for the ultimate relaxed vibe.' },
    'Graphic Hoodies': { price: 49.99, desc: 'Unique graphic print hoodie to express your personal style.' },
    'Cargo Pants': { price: 44.99, desc: 'Utility-inspired cargo pants with multiple pockets and a modern fit.' },
    'Joggers': { price: 39.99, desc: 'Comfortable joggers with an elastic waistband for all-day wear.' },
    'Chinos': { price: 49.99, desc: 'Smart chinos that transition seamlessly from casual to semi-formal.' },
    'Denim Jeans': { price: 59.99, desc: 'Classic denim jeans with a comfortable stretch fit.' },
    'Trousers': { price: 54.99, desc: 'Tailored trousers with a clean, sharp finish for a polished look.' },
    'Sneakers': { price: 79.99, desc: 'Premium sneakers with responsive cushioning and a sleek design.' },
    'Running Shoes': { price: 89.99, desc: 'High-performance running shoes engineered for speed and comfort.' },
    'Loafers': { price: 69.99, desc: 'Classic loafers crafted from genuine leather for timeless sophistication.' },
    'Boots': { price: 99.99, desc: 'Durable boots designed for both style and rugged functionality.' },
    'Slip-Ons': { price: 59.99, desc: 'Easy slip-on shoes with a minimalist aesthetic and cushioned insole.' },
    'Watches': { price: 39.99, desc: 'Elegant timepiece with a premium strap and precise quartz movement.' },
    'Belts': { price: 24.99, desc: 'Genuine leather belt with a sleek metal buckle.' },
    'Wallets': { price: 29.99, desc: 'Slim wallet crafted from full-grain leather with RFID protection.' },
    'Sunglasses': { price: 34.99, desc: 'Polarized sunglasses with UV400 protection and a stylish frame.' },
    'Bags': { price: 49.99, desc: 'Spacious canvas bag with multiple compartments for everyday carry.' },
  };

  const labels = ['Classic', 'Premium', 'Essential', 'Signature'];

  let productIndex = 0;
  for (const [catSlug, subList] of Object.entries(subcategories)) {
    for (const subName of subList) {
      const subSlug = subName.toLowerCase().replace(/\s+/g, '-');
      run(db, 'INSERT INTO subcategories (name, slug, category_id) VALUES (?, ?, ?)', [subName, subSlug, categoryMap[catSlug]]);
      const subRow = db.exec('SELECT last_insert_rowid() as id');
      const subId = subRow[0].values[0][0];

      const template = templates[subName] || { price: 39.99, desc: 'Premium quality product.' };

      for (let i = 0; i < 4; i++) {
        productIndex++;
        const pName = `${subName} ${labels[i]}`;
        const pSlug = `${subSlug}-${labels[i].toLowerCase()}`;
        const image = `https://picsum.photos/seed/product${productIndex}/600/700`;
        run(db,
          'INSERT INTO products (subcategory_id, name, slug, description, price, image, sizes, colors) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [subId, pName, pSlug, template.desc, +(template.price + i * 5).toFixed(2), image, randomSizes(catSlug), randomColors()]
        );
      }
    }
  }

  const data = db.export();
  const buffer = Buffer.from(data);
  fs.writeFileSync(DB_PATH, buffer);

  console.log('Database seeded successfully!');
  const catCount = db.exec('SELECT COUNT(*) as c FROM categories')[0].values[0][0];
  const subCount = db.exec('SELECT COUNT(*) as c FROM subcategories')[0].values[0][0];
  const prodCount = db.exec('SELECT COUNT(*) as c FROM products')[0].values[0][0];
  console.log(`Categories: ${catCount}, Subcategories: ${subCount}, Products: ${prodCount}`);
}

seed().catch(console.error);
