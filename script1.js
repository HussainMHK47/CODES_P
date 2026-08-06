let cart = [];

function addToCart() {
    const nameInput = document.getElementById('productName');
    const priceInput = document.getElementById('productPrice');
    
    const name = nameInput.value.trim();
    const price = parseFloat(priceInput.value);

    if (name === '' || isNaN(price) || price <= 0) {
        alert('Please enter a valid product name and price.');
        return;
    }

    cart.push({ name, price });
    
    nameInput.value = '';
    priceInput.value = '';
    
    updateUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateUI();
}

function clearCart() {
    cart = [];
    updateUI();
}

function updateUI() {
    const tbody = document.getElementById('cartTableBody');
    const emptyMsg = document.getElementById('emptyMessage');
    const itemCountSpan = document.getElementById('itemCount');
    const subtotalSpan = document.getElementById('subtotal');
    const discountSpan = document.getElementById('discount');
    const totalSpan = document.getElementById('total');
    const maxSpan = document.getElementById('maxValue');
    const minSpan = document.getElementById('minValue');

    tbody.innerHTML = '';

    if (cart.length === 0) {
        emptyMsg.style.display = 'block';
        maxSpan.textContent = '0.00';
        minSpan.textContent = '0.00';
    } else {
        emptyMsg.style.display = 'none';
        
        const prices = cart.map(item => item.price);
        const maxPrice = Math.max(...prices);
        const minPrice = Math.min(...prices);
        
        maxSpan.textContent = maxPrice.toFixed(2);
        minSpan.textContent = minPrice.toFixed(2);

        cart.forEach((item, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price.toFixed(2)}</td>
                <td><button class="remove-btn" onclick="removeFromCart(${index})">Remove</button></td>
            `;
            tbody.appendChild(row);
        });
    }

    const count = cart.length;
    const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
    const discount = subtotal * 0.10;
    const total = subtotal - discount;

    itemCountSpan.textContent = count;
    subtotalSpan.textContent = subtotal.toFixed(2);
    discountSpan.textContent = discount.toFixed(2);
    totalSpan.textContent = total.toFixed(2);
}   