const Store = {
  getCart() {
    try {
      return JSON.parse(localStorage.getItem('cart')) || [];
    } catch {
      return [];
    }
  },
  saveCart(items) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.notify();
  },
  addItem(product, size, color, quantity = 1) {
    const cart = this.getCart();
    const existing = cart.find(i => i.productId === product.id && i.size === size && i.color === color);
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size,
        color,
        quantity,
      });
    }
    this.saveCart(cart);
    this.bumpBadge();
  },
  removeItem(productId, size, color) {
    const cart = this.getCart().filter(i => !(i.productId === productId && i.size === size && i.color === color));
    this.saveCart(cart);
  },
  updateQuantity(productId, size, color, quantity) {
    const cart = this.getCart();
    const item = cart.find(i => i.productId === productId && i.size === size && i.color === color);
    if (item) {
      item.quantity = Math.max(1, quantity);
    }
    this.saveCart(cart);
  },
  getTotal() {
    return this.getCart().reduce((sum, i) => sum + i.price * i.quantity, 0);
  },
  getCount() {
    return this.getCart().reduce((sum, i) => sum + i.quantity, 0);
  },
  clear() {
    localStorage.removeItem('cart');
    this.notify();
  },
  listeners: [],
  onChange(fn) {
    this.listeners.push(fn);
  },
  notify() {
    this.listeners.forEach(fn => fn(this.getCart()));
  },
  bumpBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
      badge.textContent = this.getCount();
      badge.classList.remove('bump');
      void badge.offsetWidth;
      badge.classList.add('bump');
    }
  },
};
