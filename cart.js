function addToCart(id, name, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let item = cart.find(product => product.id === id);
    
    if (item) {
        item.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.getElementById('cart-count').textContent = totalCount;
}

document.addEventListener("DOMContentLoaded", updateCartCount);

function displayCart() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartDetails = document.getElementById('cart-details');
    let totalPrice = 0;

    // Create HTML for cart items
    cart.forEach(item => {
        let productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p>${item.name} (x${item.quantity})</p>
            <p>Price: TK. ${item.price * item.quantity}</p>
        `;
        cartDetails.appendChild(productDiv);
        
        // Update total price
        totalPrice += item.price * item.quantity;
    });

    // Add delivery charge and total price
    totalPrice += 200; // Delivery charge
    let totalDiv = document.getElementById('total-price');
    totalDiv.innerHTML = `
        <p>Total Price: TK. ${totalPrice} (Including 200 TK delivery)</p>
    `;
}

// Call the function to display the cart on page load
window.onload = displayCart;

// Function to handle payment process
function makePayment() {
    // Check if a payment method is selected
    let selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    
    if (selectedMethod) {
        alert("Payment done via " + selectedMethod.value);
        
        // Clear cart from local storage after payment
        localStorage.removeItem('cart');
        
        // Redirect to home page after payment
        window.location.href = "index.html"; // Change to your home page URL
    } else {
        alert("Please select a payment method.");
    }
}