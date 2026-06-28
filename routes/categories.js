const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  const categories = req.db.all('SELECT * FROM categories');
  res.json(categories);
});

router.get('/:id/subcategories', (req, res) => {
  const { id } = req.params;
  const subcategories = req.db.all('SELECT * FROM subcategories WHERE category_id = ?', [id]);
  res.json(subcategories);
});

router.get('/subcategory/:id', (req, res) => {
  const { id } = req.params;
  const sub = req.db.get('SELECT * FROM subcategories WHERE id = ?', [id]);
  if (!sub) return res.status(404).json({ error: 'Subcategory not found' });
  res.json(sub);
});

module.exports = router;
