async function SubcategoriesPage(categoryId) {
  const allCats = await API.getCategories();
  const category = allCats.find(c => c.id == categoryId);
  if (!category) return '<div class="container py-20 text-center text-gray-500">Category not found.</div>';
  const subcategories = await API.getSubcategories(categoryId);
  return `
    <section class="container py-12 md:py-20">
      <div class="mb-8 md:mb-12 animate-fade-in">
        <a href="#categories" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#FE7F2D] transition-colors mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          All Categories
        </a>
        <h1 class="text-3xl md:text-4xl font-bold text-[#233D4D]">${category.name}</h1>
        <p class="text-gray-500 mt-2">Choose a subcategory to browse products.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-5">
        ${subcategories.map(sub => `
          <a href="#products/${sub.id}" class="card-hover bg-white rounded-2xl p-6 md:p-8 text-center shadow-sm animate-scale-in group">
            <div class="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[#DFF1F1] flex items-center justify-center transition-colors duration-300 group-hover:bg-[#FE7F2D]">
              <svg class="text-[#215E61] transition-colors duration-300 group-hover:text-white" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M3 9h18"/><path d="M9 22V9"/>
              </svg>
            </div>
            <h3 class="text-[#233D4D] font-semibold text-base md:text-lg group-hover:text-[#FE7F2D] transition-colors">${sub.name}</h3>
            <span class="text-xs text-gray-400 mt-1 inline-block">View Products →</span>
          </a>
        `).join('')}
      </div>
    </section>
    ${Footer()}
  `;
}
