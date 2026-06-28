let currentRoute = '';

function navigate(hash) {
  if (location.hash !== hash) {
    location.hash = hash || '#home';
  } else {
    renderPage();
  }
}

function getRouteInfo() {
  const hash = location.hash || '#home';
  const parts = hash.slice(1).split('/');
  const route = parts[0] || 'home';
  const param = parts.slice(1).join('/');
  return { route, param };
}

async function renderPage() {
  const { route, param } = getRouteInfo();
  const app = document.getElementById('app');
  if (!app) return;

  const key = route + '/' + param;
  if (key === currentRoute) return;
  currentRoute = key;

  app.innerHTML = Header();

  try {
    const container = document.createElement('div');
    container.id = 'pageContent';
    app.appendChild(container);

    let content;
    switch (route) {
      case 'home':
        document.title = 'FashionStore — Modern Clothing';
        content = await HomePage();
        break;
      case 'categories':
        document.title = 'Categories — FashionStore';
        content = await CategoriesPage();
        break;
      case 'subcategories':
        document.title = 'Subcategories — FashionStore';
        content = await SubcategoriesPage(param);
        break;
      case 'products':
        document.title = 'Products — FashionStore';
        content = await ProductListPage(param);
        break;
      case 'product':
        document.title = 'Product Details — FashionStore';
        content = await ProductDetailPage(param);
        break;
      case 'cart':
        document.title = 'Cart — FashionStore';
        content = await CartPage();
        break;
      default:
        currentRoute = '';
        navigate('#home');
        return;
    }
    container.innerHTML = content;
  } catch (err) {
    console.error(err);
    const c = document.getElementById('pageContent');
    if (c) {
      c.innerHTML = `
        <section class="container py-20 text-center">
          <h2 class="text-2xl font-bold text-[#233D4D] mb-2">Something went wrong</h2>
          <p class="text-gray-500 mb-6">${err.message}</p>
          <a href="#home" class="text-[#FE7F2D] font-medium hover:underline">Go Home</a>
        </section>
      `;
    }
  }

  Store.notify();
}

function selectSize(btn) {
  document.querySelectorAll('.size-btn').forEach(b => {
    b.className = 'size-btn px-4 py-2.5 text-sm font-medium rounded-xl border-2 transition-all border-[#EAECF0] text-gray-600 hover:border-[#233D4D]';
  });
  btn.className = 'size-btn px-4 py-2.5 text-sm font-medium rounded-xl border-2 transition-all border-[#FE7F2D] bg-[#FE7F2D]/10 text-[#FE7F2D] selected';
}

function selectColor(btn) {
  document.querySelectorAll('.color-btn').forEach(b => {
    b.className = 'color-btn px-4 py-2.5 text-sm font-medium rounded-xl border-2 transition-all border-[#EAECF0] text-gray-600 hover:border-[#233D4D]';
  });
  btn.className = 'color-btn px-4 py-2.5 text-sm font-medium rounded-xl border-2 transition-all border-[#FE7F2D] bg-[#FE7F2D]/10 text-[#FE7F2D] selected';
}

function changeQty(delta) {
  const el = document.getElementById('qty');
  if (!el) return;
  const v = parseInt(el.textContent) + delta;
  if (v < 1) return;
  el.textContent = v;
}

function addToCartDetail(id, name, price, image) {
  const sizeEl = document.querySelector('.size-btn.selected');
  const colorEl = document.querySelector('.color-btn.selected');
  const size = sizeEl ? sizeEl.dataset.size : 'M';
  const color = colorEl ? colorEl.dataset.color : 'Black';
  const qty = parseInt(document.getElementById('qty')?.textContent || '1');
  Store.addItem({ id, name, price, image }, size, color, qty);
  const btn = event.target;
  const orig = btn.textContent;
  btn.textContent = '✓ Added to Cart!';
  btn.style.background = '#215E61';
  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
  }, 1500);
}

async function checkout() {
  const cart = Store.getCart();
  if (cart.length === 0) return;
  const total = Store.getTotal();
  try {
    await API.placeOrder(cart, total);
    Store.clear();
    alert('Order placed successfully! Thank you for your purchase.');
    if (location.hash !== '#home') navigate('#home');
    else renderPage();
  } catch (err) {
    alert('Failed to place order. Please try again.');
  }
}

Store.onChange(() => {
  const badge = document.getElementById('cartBadge');
  if (badge) badge.textContent = Store.getCount();
});

window.addEventListener('hashchange', renderPage);
window.addEventListener('DOMContentLoaded', renderPage);
