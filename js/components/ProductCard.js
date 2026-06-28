function ProductCard(product) {
  const sizes = JSON.parse(product.sizes || '[]');
  const colors = JSON.parse(product.colors || '[]');
  return `
    <div class="card-hover bg-white rounded-2xl overflow-hidden shadow-sm animate-scale-in flex flex-col">
      <a href="#product/${product.id}" class="block aspect-[4/5] overflow-hidden bg-[#F5F5F5]">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-110" loading="lazy">
      </a>
      <div class="p-4 md:p-5 flex flex-col flex-1">
        <a href="#product/${product.id}" class="text-[#233D4D] font-semibold text-sm md:text-base leading-snug hover:text-[#FE7F2D] transition-colors mb-1">${product.name}</a>
        <p class="text-[#FE7F2D] font-bold text-lg md:text-xl mb-3">$${product.price.toFixed(2)}</p>
        <div class="mt-auto">
          <button onclick="event.preventDefault(); addToCartFromCard(${product.id}, '${product.name}', ${product.price}, '${product.image}', '${sizes[0] || 'M'}', '${colors[0] || 'Black'}')"
            class="w-full bg-[#233D4D] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#FE7F2D] transition-all duration-300 active:scale-95">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  `;
}

function addToCartFromCard(id, name, price, image, size, color) {
  const product = { id, name, price, image };
  Store.addItem(product, size, color, 1);
  const btn = event.target;
  const original = btn.textContent;
  btn.textContent = 'Added!';
  btn.style.background = '#215E61';
  setTimeout(() => {
    btn.textContent = original;
    btn.style.background = '';
  }, 1200);
}
