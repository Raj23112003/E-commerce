// E-commerce.js

const productsContainer = document.getElementById('products');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalSpan = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const messageDiv = document.getElementById('message');

let cart = [];

// 1. Load products from FakeStore API
function loadProducts() {
  // Using only FakeStore for now because Platzi API is unstable
  fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data => {
      renderProducts(data);
    })
    .catch(err => {
      console.error(err);
      productsContainer.innerHTML = 'Failed to load products. Please try again later.';
    });
}

// 2. Render products on the page
function renderProducts(products) {
  productsContainer.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
      <img src="${p.image}" alt="${p.title}" />
      <div class="product-title">${p.title}</div>
      <div class="product-price">₹${p.price}</div>
      <div class="product-source">FakeStoreAPI</div>
      <button>Add to Cart</button>
    `;

    const btn = card.querySelector('button');
    btn.addEventListener('click', () => addToCart(p));

    productsContainer.appendChild(card);
  });
}

// 3. Add item to cart (in-memory, frontend only)
function addToCart(product) {
  const existing = cart.find(item => item.id === product.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: product.id,
      title: product.title,
      price: product.price,
      quantity: 1
    });
  }
  renderCart();
}

// 4. Render cart
function renderCart() {
  cartItemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const lineTotal = item.price * item.quantity;
    total += lineTotal;

    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <span>${item.title} x ${item.quantity}</span>
      <span>₹${lineTotal.toFixed(2)}</span>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartTotalSpan.textContent = total.toFixed(2);
}

// 5. Fake checkout
checkoutBtn.addEventListener('click', () => {
  if (cart.length === 0) {
    messageDiv.style.color = 'red';
    messageDiv.textContent = 'Cart is empty.';
    return;
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderId = Date.now();

  cart = [];
  renderCart();

  messageDiv.style.color = 'green';
  messageDiv.textContent = `Order placed! ID: ${orderId}, Total: ₹${total.toFixed(2)} (Fake checkout)`;
});

// 6. Initial load
loadProducts();
