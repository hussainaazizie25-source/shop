function Hero() {
  return `
    <section class="relative overflow-hidden bg-[#233D4D] min-h-[70vh] md:min-h-[80vh] flex items-center">
      <div class="absolute inset-0 opacity-30">
        <img src="https://picsum.photos/seed/hero/1600/900" alt="Latest Collection" class="w-full h-full object-cover">
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#233D4D] via-[#233D4D]/80 to-transparent"></div>
      <div class="container relative z-10 py-16 md:py-24">
        <div class="max-w-2xl">
          <span class="inline-block px-4 py-1.5 bg-[#FE7F2D] text-white text-xs font-semibold uppercase tracking-wider rounded-full mb-6 animate-fade-in">Summer 2026 Collection</span>
          <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4 animate-slide-up">Elevate Your<br><span class="text-[#FE7F2D]">Everyday Style</span></h1>
          <p class="text-lg md:text-xl text-white/80 mb-8 max-w-lg animate-fade-in stagger-3">Discover premium fashion that blends comfort with contemporary design.</p>
          <a href="#categories" class="btn-primary inline-flex items-center gap-2 bg-[#FE7F2D] text-white font-semibold px-8 py-3.5 rounded-full text-lg hover:bg-[#e06e20] transition-all animate-fade-in stagger-4">
            Shop Now
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
          </a>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0">
        <div class="bg-[#FF0000] text-white text-center py-3 md:py-4 font-bold text-sm md:text-base tracking-wide animate-fade-in">
          <span class="inline-flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            🔥 50% OFF — Limited Time Offer on All Items
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
          </span>
        </div>
      </div>
    </section>
  `;
}
