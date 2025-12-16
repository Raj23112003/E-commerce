// server.js
const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = 5000;

// middlewares
app.use(cors());
app.use(express.json());

// ----- PRODUCTS (FakeStoreAPI + Platzi) -----
// Get products from fakestoreapi.com
app.get('/api/products/fakestore', async (req, res) => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch FakeStore products' });
  }
});

// Get products from fakeapi.platzi.com
app.get('/api/products/platzi', async (req, res) => {
  try {
    const response = await fetch('https://fakeapi.platzi.com/products');
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch Platzi products' });
  }
});

// Combined products (simple merge of both APIs)
app.get('/api/products', async (req, res) => {
  try {
    const [fsRes, plRes] = await Promise.all([
      fetch('https://fakestoreapi.com/products'),
      fetch('https://fakeapi.platzi.com/products')
    ]);
    const fakestoreProducts = await fsRes.json();
    const platziProducts = await plRes.json();

    // normalize a simple shape
    const normalizedFakestore = fakestoreProducts.map(p => ({
      id: `fs-${p.id}`,
      title: p.title,
      price: p.price,
      image: p.image,
      source: 'fakestore'
    }));

    const normalizedPlatzi = platziProducts.map(p => ({
      id: `pl-${p.id}`,
      title: p.title || p.name,
      price: p.price,
      image: p.images && p.images[0] ? p.images[0] : '',
      source: 'platzi'
    }));

    res.json([...normalizedFakestore, ...normalizedPlatzi]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch combined products' });
  }
});

// ----- SIMPLE IN-MEMORY CART -----
let cart = []; // [{ id, title, price, quantity }]

// get cart
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// add item to cart
app.post('/api/cart', (req, res) => {
  const { id, title, price } = req.body;
  if (!id || !title || typeof price !== 'number') {
    return res.status(400).json({ error: 'id, title, price required' });
  }

  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ id, title, price, quantity: 1 });
  }
  res.json(cart);
});

// clear cart (after checkout)
app.post('/api/checkout', (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const orderId = Date.now();
  cart = []; // empty cart

  res.json({
    success: true,
    orderId,
    total,
    message: 'Order placed successfully (fake checkout).'
  });
});

// ----- STATIC FRONTEND -----
// serve index.html file
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
