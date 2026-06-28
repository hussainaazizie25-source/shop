async function ProductDetailPage(productId) {
  const product = await API.getProduct(productId);
  if (!product) return '<div class="container py-20 text-center text-gray-500">Product not found.</div>';
  const sizes = JSON.parse(product.sizes || '[]');
  const colors = JSON.parse(product.colors || '[]');
  return `
    <section class="container py-8 md:py-16">
      <a href="javascript:history.back()" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#FE7F2D] transition-colors mb-6 animate-fade-in">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
        Back
      </a>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
        <div class="aspect-[5/6] rounded-2xl overflow-hidden bg-[#F5F5F5] animate-scale-in">
          <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover">
        </div>
        <div class="animate-fade-in">
          <h1 class="text-2xl md:text-4xl font-bold text-[#233D4D] leading-tight mb-3">${product.name}</h1>
          <p class="text-3xl md:text-4xl font-bold text-[#FE7F2D] mb-5">$${product.price.toFixed(2)}</p>
          <p class="text-gray-500 leading-relaxed mb-6">${product.description}</p>
          <div class="mb-5">
            <label class="block text-sm font-semibold text-[#233D4D] mb-2">Size</label>
            <div class="flex flex-wrap gap-2" id="sizeOptions">
              ${sizes.map((s, i) => `
                <button onclick="selectSize(this)" class="size-btn px-4 py-2.5 text-sm font-medium rounded-xl border-2 transition-all ${i === 0 ? 'border-[#FE7F2D] bg-[#FE7F2D]/10 text-[#FE7F2D] selected' : 'border-[#EAECF0] text-gray-600 hover:border-[#233D4D]'}" data-size="${s}">${s}</button>
              `).join('')}
            </div>
          </div>
          <div class="mb-6">
            <label class="block text-sm font-semibold text-[#233D4D] mb-2">Color</label>
            <div class="flex flex-wrap gap-2" id="colorOptions">
              ${colors.map((c, i) => `
                <button onclick="selectColor(this)" class="color-btn px-4 py-2.5 text-sm font-medium rounded-xl border-2 transition-all ${i === 0 ? 'border-[#FE7F2D] bg-[#FE7F2D]/10 text-[#FE7F2D] selected' : 'border-[#EAECF0] text-gray-600 hover:border-[#233D4D]'}" data-color="${c}">${c}</button>
              `).join('')}
            </div>
          </div>
          <div class="flex items-center gap-4 mb-8">
            <div class="flex items-center border border-[#EAECF0] rounded-xl overflow-hidden">
              <button onclick="changeQty(-1)" class="px-4 py-2.5 text-lg hover:bg-[#F5F5F5] transition-colors">−</button>
              <span id="qty" class="px-5 py-2.5 text-lg font-semibold min-w-[3rem] text-center">1</span>
              <button onclick="changeQty(1)" class="px-4 py-2.5 text-lg hover:bg-[#F5F5F5] transition-colors">+</button>
            </div>
          </div>
          <button onclick="addToCartDetail(${product.id}, '${product.name.replace(/'/g, "\\'")}', ${product.price}, '${product.image}')"
            class="btn-primary w-full md:w-auto bg-[#FE7F2D] text-white font-bold px-10 py-3.5 rounded-xl text-base md:text-lg hover:bg-[#e06e20] transition-all">
            Add to Cart — $${product.price.toFixed(2)}
          </button>
        </div>
      </div>
    </section>
    ${Footer()}
  `;
}
