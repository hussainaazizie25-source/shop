async function CategoriesPage() {
  const categories = await API.getCategories();
  return `
    <section class="container py-12 md:py-20">
      <div class="text-center mb-10 md:mb-14 animate-fade-in">
        <a href="#home" class="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-[#FE7F2D] transition-colors mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>
          Home
        </a>
        <h1 class="text-3xl md:text-5xl font-bold text-[#233D4D]">Shop by Category</h1>
        <p class="text-gray-500 mt-3 max-w-lg mx-auto">Browse our curated collections.</p>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        ${categories.map(cat => CategoryCard(cat)).join('')}
      </div>
    </section>
    ${Footer()}
  `;
}
