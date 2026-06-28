const express = require('express');
const path = require('path');
const cors = require('cors');
const { init } = require('./db/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

async function start() {
  const db = await init();

  app.use((req, res, next) => {
    req.db = db;
    next();
  });

  app.use('/api/categories', require('./routes/categories'));
  app.use('/api/products', require('./routes/products'));
  app.use('/api/orders', require('./routes/orders'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
  });

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
}

start().catch(console.error);
