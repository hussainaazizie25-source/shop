function CategoryCard(category) {
  return `
    <a href="#subcategories/${category.id}" class="card-hover group relative block rounded-2xl overflow-hidden bg-white shadow-sm animate-scale-in">
      <div class="aspect-[3/2] overflow-hidden">
        <img src="${category.image}" alt="${category.name}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy">
      </div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#1D2128]/80 via-transparent to-transparent"></div>
      <div class="absolute bottom-0 left-0 right-0 p-5 md:p-6">
        <h3 class="text-white font-bold text-xl md:text-2xl mb-1">${category.name}</h3>
        <span class="text-white/80 text-sm font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
          Explore <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </span>
      </div>
    </a>
  `;
}
