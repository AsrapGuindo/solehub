// ----------------------
// Sample Product Data
// ----------------------
const products = [
  {
    id: 1,
    name: "Nike Air Max Pulse",
    brand: "Nike",
    category: "Running",
    price: 4999,
    oldPrice: 5999,
    rating: 4.8,
    reviews: 128,
    image: "https://s1.dswcdn.com/uploads/Nike_Air_Max_Shoes/Air_Max_Other_Shoes/Nike_Air_Max_Pulse_Summit_White_Pure_Platinum_Safety_Orange_Black_DR0453-100.jpg",
    colors: ["Black", "White", "Red"],
    sizes: [7, 8, 9, 10, 11],
    badge: "BEST SELLER",
    description: "Stylish and comfortable running shoe."
  },
  {
    id: 2,
    name: "Adidas Ultraboost Light",
    brand: "Adidas",
    category: "Running",
    price: 5499,
    oldPrice: 6499,
    rating: 4.9,
    reviews: 200,
    image: "https://footwearnews.com/wp-content/uploads/2023/02/Ultraboost_Light_Running_Shoes_White_HQ6351_01_standard-e1677164948948.jpg?resize=150.jpg",
    colors: ["White", "Blue"],
    sizes: [7, 8, 9, 10],
    badge: "NEW",
    description: "Lightweight and responsive cushioning."
  },
  {
    id: 3,
    name: "New Balance 550",
    brand: "New Balance",
    category: "Sneakers",
    price: 4599,
    oldPrice: null,
    rating: 4.7,
    reviews: 95,
    image: "https://static.vecteezy.com/system/resources/previews/020/903/143/large_2x/shoe-sale-banner-vector.jpg",
    colors: ["Green", "White"],
    sizes: [6, 7, 8, 9, 10],
    badge: "SALE",
    description: "Retro-inspired lifestyle sneaker."
  },
  {
    id: 4,
    name: "Nike Air Jordan 1",
    brand: "Nike",
    category: "Basketball",
    price: 5999,
    oldPrice: 6999,
    rating: 5.0,
    reviews: 300,
    image: "https://media.endclothing.com/media/catalog/product/0/1/01-06-2015_nike_airjordan1retrohighogchicago_red_white_sh_1.jpg",
    colors: ["Red", "Black", "White"],
    sizes: [8, 9, 10, 11],
    badge: "LIMITED",
    description: "Iconic basketball sneaker."
  }
  // 👉 Add more products up to 16 following the same format
];

// ----------------------
// Cart State
// ----------------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ----------------------
// Render Products
// ----------------------
const productGrid = document.getElementById("productGrid");

function renderProducts() {
  productGrid.innerHTML = "";
  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow p-4 hover:scale-105 transition";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="rounded mb-4">
      <span class="text-xs bg-red-500 text-white px-2 py-1 rounded">${product.badge}</span>
      <h3 class="font-bold mt-2">${product.brand}</h3>
      <p>${product.name}</p>
      <p class="text-yellow-500">★★★★★ (${product.reviews})</p>
      <p class="text-lg font-bold">₱${product.price}</p>
      ${product.oldPrice ? `<p class="line-through text-gray-500">₱${product.oldPrice}</p>` : ""}
      <button class="mt-2 bg-black text-white px-4 py-2 rounded add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    productGrid.appendChild(card);
  });

  // Attach Add to Cart
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      addToCart(id);
    });
  });
}

renderProducts();

// ----------------------
// Cart Functions
// ----------------------
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
  showToast(`${product.name} added to cart`);
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  const cartItems = document.getElementById("cartItems");
  const cartCount = document.getElementById("cartCount");
  cartItems.innerHTML = "";
  let subtotal = 0;

  cart.forEach(item => {
    subtotal += item.price * item.qty;
    cartItems.innerHTML += `
      <div class="flex justify-between items-center">
        <img src="${item.image}" class="w-12 h-12 rounded">
        <p>${item.name} x${item.qty}</p>
        <p>₱${item.price * item.qty}</p>
        <button onclick="removeFromCart(${item.id})"><i data-lucide="trash"></i></button>
      </div>
    `;
  });

  document.getElementById("subtotal").textContent = "Subtotal: ₱" + subtotal;
  document.getElementById("total").textContent = "Total: ₱" + (subtotal + 200);
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);

  lucide.createIcons(); // refresh icons
}

updateCartUI();

// ----------------------
// Cart Modal
// ----------------------
const cartBtn = document.getElementById("cartBtn");
const cartModal = document.getElementById("cartModal");
const closeCart = document.getElementById("closeCart");
const checkoutBtn = document.getElementById("checkoutBtn");

cartBtn.addEventListener("click", () => {
  cartModal.classList.remove("hidden");
});

closeCart.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

checkoutBtn.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Order Placed Successfully! Order #: " + Math.floor(Math.random() * 100000));
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
  cartModal.classList.add("hidden");
});

// ----------------------
// Toast Notification
// ----------------------
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "fixed bottom-5 right-5 bg-black text-white px-4 py-2 rounded shadow";
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 2000);
}

// ----------------------
// Newsletter Subscription
// ----------------------
const newsletterForm = document.getElementById("newsletterForm");
if (newsletterForm) {
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterForm.querySelector("input").value;
    if (email) {
      showToast("Subscribed successfully!");
      newsletterForm.reset();
    }
  });
}

// ----------------------
// Shop Section Rendering
// ----------------------
const shopGrid = document.getElementById("shopGrid");
const searchInput = document.getElementById("searchInput");
const filterCategory = document.getElementById("filterCategory");
const filterBrand = document.getElementById("filterBrand");
const sortSelect = document.getElementById("sortSelect");

function renderShop(productsToRender) {
  shopGrid.innerHTML = "";
  productsToRender.forEach(product => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow p-4 hover:scale-105 transition";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="rounded mb-4">
      <span class="text-xs bg-red-500 text-white px-2 py-1 rounded">${product.badge}</span>
      <h3 class="font-bold mt-2">${product.brand}</h3>
      <p>${product.name}</p>
      <p class="text-yellow-500">★★★★★ (${product.reviews})</p>
      <p class="text-lg font-bold">₱${product.price}</p>
      ${product.oldPrice ? `<p class="line-through text-gray-500">₱${product.oldPrice}</p>` : ""}
      <button class="mt-2 bg-black text-white px-4 py-2 rounded add-to-cart" data-id="${product.id}">Add to Cart</button>
      <button class="mt-2 ml-2 border px-4 py-2 rounded quick-view" data-id="${product.id}">Quick View</button>
    `;
    shopGrid.appendChild(card);
  });

  // Attach Add to Cart
  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      addToCart(id);
    });
  });

  // Attach Quick View
  document.querySelectorAll(".quick-view").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      openQuickView(id);
    });
  });
}

// Initial render
renderShop(products);

// ----------------------
// Search, Filter, Sort
// ----------------------
function applyFilters() {
  let filtered = [...products];

  // Search
  const searchTerm = searchInput.value.toLowerCase();
  if (searchTerm) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(searchTerm) ||
      p.brand.toLowerCase().includes(searchTerm) ||
      p.category.toLowerCase().includes(searchTerm)
    );
  }

  // Category
  if (filterCategory.value) {
    filtered = filtered.filter(p => p.category === filterCategory.value);
  }

  // Brand
  if (filterBrand.value) {
    filtered = filtered.filter(p => p.brand === filterBrand.value);
  }

  // Sorting
  switch (sortSelect.value) {
    case "low-high":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "high-low":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case "newest":
      filtered.sort((a, b) => b.id - a.id); // assuming higher id = newer
      break;
    default:
      break;
  }

  renderShop(filtered);
}

// Event listeners
searchInput.addEventListener("input", applyFilters);
filterCategory.addEventListener("change", applyFilters);
filterBrand.addEventListener("change", applyFilters);
sortSelect.addEventListener("change", applyFilters);

// ----------------------
// Quick View Modal
// ----------------------
function openQuickView(id) {
  const product = products.find(p => p.id === id);
  const modal = document.createElement("div");
  modal.className = "fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center";
  modal.innerHTML = `
    <div class="bg-white w-96 p-6 rounded-lg shadow-lg animate-fadeIn">
      <h3 class="text-xl font-bold mb-2">${product.name}</h3>
      <img src="${product.image}" class="rounded mb-4">
      <p>${product.description}</p>
      <p class="text-lg font-bold">₱${product.price}</p>
      <button class="mt-4 bg-black text-white px-4 py-2 rounded" onclick="addToCart(${product.id})">Add to Cart</button>
      <button class="mt-2 text-sm text-gray-600 close-modal">Close</button>
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector(".close-modal").addEventListener("click", () => {
    modal.remove();
  });
}

// ----------------------
// New Arrivals Section
// ----------------------
const newArrivalsGrid = document.getElementById("newArrivalsGrid");
const viewAllNew = document.getElementById("viewAllNew");

// Filter products tagged as "NEW"
function renderNewArrivals() {
  const newProducts = products.filter(p => p.badge === "NEW");
  newArrivalsGrid.innerHTML = "";
  newProducts.slice(0, 4).forEach(product => {
    const card = document.createElement("div");
    card.className = "bg-white rounded-lg shadow p-4 hover:scale-105 transition";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="rounded mb-4">
      <span class="text-xs bg-green-500 text-white px-2 py-1 rounded">${product.badge}</span>
      <h3 class="font-bold mt-2">${product.brand}</h3>
      <p>${product.name}</p>
      <p class="text-yellow-500">★★★★★ (${product.reviews})</p>
      <p class="text-lg font-bold">₱${product.price}</p>
      ${product.oldPrice ? `<p class="line-through text-gray-500">₱${product.oldPrice}</p>` : ""}
      <button class="mt-2 bg-black text-white px-4 py-2 rounded add-to-cart" data-id="${product.id}">Add to Cart</button>
      <button class="mt-2 ml-2 border px-4 py-2 rounded quick-view" data-id="${product.id}">Quick View</button>
    `;
    newArrivalsGrid.appendChild(card);
  });

  // Attach Add to Cart
  document.querySelectorAll("#newArrivalsGrid .add-to-cart").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      addToCart(id);
    });
  });

  // Attach Quick View
  document.querySelectorAll("#newArrivalsGrid .quick-view").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      openQuickView(id);
    });
  });
}

renderNewArrivals();

// View All New Arrivals → show all NEW products in Shop grid
viewAllNew.addEventListener("click", () => {
  const newProducts = products.filter(p => p.badge === "NEW");
  renderShop(newProducts);
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
});

// ----------------------
// Sale Countdown Timer
// ----------------------
const countdownElement = document.getElementById("countdown");

// Set sale end date (example: 7 days from now)
const saleEndDate = new Date();
saleEndDate.setDate(saleEndDate.getDate() + 7);

function updateCountdown() {
  const now = new Date().getTime();
  const distance = saleEndDate.getTime() - now;

  if (distance < 0) {
    countdownElement.textContent = "Sale Ended!";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  countdownElement.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Update every second
setInterval(updateCountdown, 1000);
updateCountdown();

// Hero buttons
const shopNowBtn = document.getElementById("shopNowBtn");
const exploreBtn = document.getElementById("exploreBtn");

shopNowBtn.addEventListener("click", () => {
  document.getElementById("shop").scrollIntoView({ behavior: "smooth" });
});

exploreBtn.addEventListener("click", () => {
  document.getElementById("categories").scrollIntoView({ behavior: "smooth" });
});

// Mobile menu toggle
const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

menuBtn.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
});

