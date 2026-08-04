const AppState = {
  cart: [],
  discountRate: 0.10,
  expensiveThreshold: 1000
};

const DOM = {
  nameInput: document.getElementById('pName'),
  priceInput: document.getElementById('pPrice'),
  btnAdd: document.getElementById('btnAdd'),
  btnClear: document.getElementById('btnClear'),
  tableBody: document.querySelector('#cartTable tbody'),
  expensiveSection: document.getElementById('expensive-section'),
  summarySection: document.getElementById('summary-section')
};

function init() {
  DOM.btnAdd.addEventListener('click', handleAddProduct);
  DOM.btnClear.addEventListener('click', handleClearCart);
  DOM.priceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleAddProduct();
  });
  render();
}

function handleAddProduct() {
  const name = DOM.nameInput.value.trim();
  const price = parseFloat(DOM.priceInput.value);

  if (!name || isNaN(price) || price <= 0) {
    alert('Please enter a valid product name and a positive price.');
    return;
  }

  const newProduct = {
    id: Date.now(),
    name: name,
    price: price
  };

  AppState.cart.push(newProduct);
  DOM.nameInput.value = '';
  DOM.priceInput.value = '';
  render();
}

function handleRemoveProduct(id) {
  // ARRAY METHOD: filter - removes the item with the matching ID
  AppState.cart = AppState.cart.filter(item => item.id !== id);
  render();
}

function handleClearCart() {
  if (confirm('Are you sure you want to clear the entire cart?')) {
    AppState.cart = [];
    render();
  }
}

function getExpensiveProducts() {
  // ARRAY METHOD: filter - returns only items > 1000
  return AppState.cart.filter(item => item.price > AppState.expensiveThreshold);
}

function calculateTotals() {
  const totalItems = AppState.cart.length;
  
  // ARRAY METHOD: reduce - sums up all prices
  const totalBeforeDiscount = AppState.cart.reduce((sum, item) => sum + item.price, 0);
  
  // ARRAY METHOD: some - checks if at least one item is expensive
  const hasExpensiveItem = AppState.cart.some(item => item.price > AppState.expensiveThreshold);
  
  const discountAmount = totalBeforeDiscount * AppState.discountRate;
  const finalTotal = totalBeforeDiscount - discountAmount;

  return {
    totalItems,
    totalBeforeDiscount,
    discountAmount,
    finalTotal,
    hasExpensiveItem
  };
}

function renderExpensiveWarning() {
  const expensiveItems = getExpensiveProducts();
  
  if (expensiveItems.length > 0) {
    // ARRAY METHOD: map - extracts just the names for the message
    const itemNames = expensiveItems.map(item => item.name).join(', ');
    
    DOM.expensiveSection.innerHTML = `
      <strong>⚠️ High Value Alert:</strong> 
      You have ${expensiveItems.length} expensive product(s) (> ₹${AppState.expensiveThreshold}): 
      <em>${itemNames}</em>.
    `;
    DOM.expensiveSection.style.display = 'block';
  } else {
    DOM.expensiveSection.style.display = 'none';
  }
}

function renderSummary() {
  const stats = calculateTotals();
  
  DOM.summarySection.innerHTML = `
    <h3>Order Summary</h3>
    <p>Items: ${stats.totalItems}</p>
    <p>Subtotal: ₹${stats.totalBeforeDiscount.toFixed(2)}</p>
    <p>Discount (10%): -₹${stats.discountAmount.toFixed(2)}</p>
    <hr style="border: 0; border-top: 1px solid #86efac; margin: 10px 0;">
    <p><strong>Total Payable: ₹${stats.finalTotal.toFixed(2)}</strong></p>
  `;
  DOM.summarySection.style.display = 'block';
}

function renderTable() {
  DOM.tableBody.innerHTML = '';

  if (AppState.cart.length === 0) {
    DOM.tableBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Your cart is empty.</td></tr>';
    return;
  }

  // ARRAY METHOD: forEach - iterates to create HTML rows (side effect)
  AppState.cart.forEach(item => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price.toFixed(2)}</td>
      <td><button class="btn-remove" onclick="handleRemoveProduct(${item.id})">Remove</button></td>
    `;
    DOM.tableBody.appendChild(row);
  });
}

function render() {
  renderTable();
  renderExpensiveWarning();
  renderSummary();
}

document.addEventListener('DOMContentLoaded', init);   