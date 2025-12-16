* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
}

body {
  background: #f5f5f5;
}

.header {
  background: #0f9d58;
  color: #fff;
  padding: 12px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 20px;
  font-weight: bold;
}

.tagline {
  font-size: 14px;
}

.main {
  display: flex;
  padding: 20px;
  gap: 20px;
}

/* Products area */
.products-section {
  flex: 3;
}

.products-section h2 {
  margin-bottom: 10px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
}

.product-card {
  background: #fff;
  border-radius: 6px;
  padding: 10px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.product-card img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 8px;
}

.product-title {
  font-size: 14px;
  margin-bottom: 6px;
  text-align: center;
}

.product-price {
  font-weight: bold;
  margin-bottom: 8px;
}

.product-source {
  font-size: 11px;
  color: #777;
  margin-bottom: 8px;
}

.product-card button {
  margin-top: auto;
  padding: 6px 10px;
  background: #0f9d58;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
}

.product-card button:hover {
  background: #0b7d45;
}

/* Cart area */
.cart-section {
  flex: 1;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #ddd;
  padding: 10px;
}

.cart-section h2 {
  margin-bottom: 10px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 14px;
}

.cart-total {
  margin-top: 10px;
  font-weight: bold;
}

.checkout-btn {
  margin-top: 10px;
  width: 100%;
  padding: 8px;
  background: #ff9800;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.checkout-btn:hover {
  background: #e68900;
}

.message {
  margin-top: 8px;
  font-size: 13px;
  color: green;
}

/* Mobile */
@media (max-width: 768px) {
  .main {
    flex-direction: column;
  }
}
