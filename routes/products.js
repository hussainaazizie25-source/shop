const express = require('express');
const router = express.Router();

router.get('/subcategory/:id', (req, res) => {
  const { id } = req.params;
  const products = req.db.all('SELECT * FROM products WHERE subcategory_id = ?', [id]);
  res.json(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const product = req.db.get('SELECT * FROM products WHERE id = ?', [id]);
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

module.exports = router;
