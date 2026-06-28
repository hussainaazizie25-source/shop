function Footer() {
  return `
    <footer class="bg-[#1D2128] text-white mt-20">
      <div class="container py-12 md:py-16">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="col-span-1 md:col-span-2">
            <div class="flex items-center gap-2 mb-4">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                <rect width="36" height="36" rx="8" fill="#233D4D"/>
                <path d="M10 26V14l8-6 8 6v12h-5v-8h-6v8H10z" fill="#FE7F2D"/>
              </svg>
              <span class="font-bold text-lg">FASHION<span class="text-[#FE7F2D]">STORE</span></span>
            </div>
            <p class="text-gray-400 text-sm leading-relaxed max-w-sm">Premium clothing for those who value quality, comfort, and timeless style.</p>
          </div>
          <div>
            <h4 class="font-semibold text-sm uppercase tracking-wider text-[#BBD5DA] mb-4">Shop</h4>
            <ul class="space-y-2.5">
              <li><a href="#categories" class="text-gray-400 text-sm hover:text-[#FE7F2D] transition-colors">All Categories</a></li>
              <li><a href="#cart" class="text-gray-400 text-sm hover:text-[#FE7F2D] transition-colors">Cart</a></li>
              <li><a href="#categories" class="text-gray-400 text-sm hover:text-[#FE7F2D] transition-colors">New Arrivals</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold text-sm uppercase tracking-wider text-[#BBD5DA] mb-4">Support</h4>
            <ul class="space-y-2.5">
              <li><a href="#" class="text-gray-400 text-sm hover:text-[#FE7F2D] transition-colors">Contact</a></li>
              <li><a href="#" class="text-gray-400 text-sm hover:text-[#FE7F2D] transition-colors">FAQ</a></li>
              <li><a href="#" class="text-gray-400 text-sm hover:text-[#FE7F2D] transition-colors">Shipping</a></li>
            </ul>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-xs">
          &copy; 2026 FashionStore. All rights reserved.
        </div>
      </div>
    </footer>
  `;
}
