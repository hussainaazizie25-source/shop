function CartItem(item) {
  return `
    <div class="flex items-center gap-4 py-4 border-b border-[#EAECF0] animate-fade-in" data-product="${item.productId}" data-size="${item.size}" data-color="${item.color}">
      <img src="${item.image}" alt="${item.name}" class="w-20 h-20 md:w-24 md:h-24 object-cover rounded-xl">
      <div class="flex-1 min-w-0">
        <h4 class="font-semibold text-[#233D4D] text-sm md:text-base truncate">${item.name}</h4>
        <p class="text-xs md:text-sm text-gray-500 mt-0.5">Size: ${item.size} / Color: ${item.color}</p>
        <p class="text-[#FE7F2D] font-bold text-sm md:text-base mt-1">$${item.price.toFixed(2)}</p>
      </div>
      <div class="flex items-center gap-2">
        <div class="flex items-center border border-[#EAECF0] rounded-lg overflow-hidden">
          <button onclick="Store.updateQuantity(${item.productId}, '${item.size}', '${item.color}', ${item.quantity - 1}); renderPage()" class="px-2.5 py-1.5 text-sm hover:bg-[#F5F5F5] transition-colors" ${item.quantity <= 1 ? 'disabled' : ''}>−</button>
          <span class="px-3 py-1.5 text-sm font-medium min-w-[2rem] text-center">${item.quantity}</span>
          <button onclick="Store.updateQuantity(${item.productId}, '${item.size}', '${item.color}', ${item.quantity + 1}); renderPage()" class="px-2.5 py-1.5 text-sm hover:bg-[#F5F5F5] transition-colors">+</button>
        </div>
        <p class="font-bold text-[#233D4D] text-sm md:text-base min-w-[4rem] text-right">$${(item.price * item.quantity).toFixed(2)}</p>
        <button onclick="Store.removeItem(${item.productId}, '${item.size}', '${item.color}'); renderPage()" class="p-2 text-gray-400 hover:text-[#FF0000] transition-colors">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
        </button>
      </div>
    </div>
  `;
}
