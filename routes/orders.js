const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { items, total } = req.body;
  if (!items || !total) {
    return res.status(400).json({ error: 'Items and total are required' });
  }
  req.db.run('INSERT INTO orders (items, total) VALUES (?, ?)', [JSON.stringify(items), total]);
  const row = req.db.get('SELECT last_insert_rowid() as id');
  res.status(201).json({ id: row.id, message: 'Order placed successfully' });
});

module.exports = router;
