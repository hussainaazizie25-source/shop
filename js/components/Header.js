function Header() {
  const count = Store.getCount();
  return `
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container flex items-center justify-between h-16 md:h-20">
        <div class="flex items-center gap-2 cursor-pointer" onclick="navigate('#home')">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <rect width="36" height="36" rx="8" fill="#233D4D"/>
            <path d="M10 26V14l8-6 8 6v12h-5v-8h-6v8H10z" fill="#FE7F2D"/>
          </svg>
          <span class="text-[#233D4D] font-bold text-xl tracking-tight hidden sm:block">FASHION<span class="text-[#FE7F2D]">STORE</span></span>
        </div>
        <div class="hidden md:flex items-center flex-1 max-w-md mx-6">
          <div class="relative w-full">
            <input type="text" placeholder="Search products..." class="w-full bg-[#F5F5F5] rounded-full py-2.5 pl-10 pr-4 text-sm border-0 focus:ring-2 focus:ring-[#FE7F2D] transition-shadow" id="searchInput">
            <svg class="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#233D4D]" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
          </div>
        </div>
        <nav class="flex items-center gap-1 md:gap-4">
          <a href="#categories" class="hidden md:inline-flex px-4 py-2 text-sm font-medium text-[#233D4D] hover:text-[#FE7F2D] transition-colors rounded-full hover:bg-[#F5F5F5]">New Collections</a>
          <button class="hidden md:inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#233D4D] rounded-full bg-[#DFF1F1] hover:bg-[#BBD5DA] transition-all" onclick="alert('Support chat coming soon!')">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/><path d="M9 10a3 3 0 1 1 6 0c0 1.5-1.5 2-3 3v1"/><circle cx="12" cy="17" r=".5" fill="currentColor"/></svg>
            Support
          </button>
          <a href="#cart" class="relative p-2.5 rounded-full hover:bg-[#F5F5F5] transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#233D4D" stroke-width="2" stroke-linecap="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.4a2 2 0 0 0 2 1.6h9.72a2 2 0 0 0 2-1.6L23 6H6"/></svg>
            <span class="cart-badge" id="cartBadge">${count}</span>
          </a>
        </nav>
      </div>
    </header>
  `;
}
