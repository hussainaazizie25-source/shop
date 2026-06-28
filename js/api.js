const API = {
  async get(path) {
    const res = await fetch(`/api${path}`);
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  },
  async post(path, body) {
    const res = await fetch(`/api${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (!res.ok) throw new Error(`API error: ${res.status}`);
    return res.json();
  },
  getCategories() {
    return this.get('/categories');
  },
  getSubcategories(categoryId) {
    return this.get(`/categories/${categoryId}/subcategories`);
  },
  getSubcategory(id) {
    return this.get(`/categories/subcategory/${id}`);
  },
  getProducts(subcategoryId) {
    return this.get(`/products/subcategory/${subcategoryId}`);
  },
  getProduct(productId) {
    return this.get(`/products/${productId}`);
  },
  placeOrder(items, total) {
    return this.post('/orders', { items, total });
  },
};
