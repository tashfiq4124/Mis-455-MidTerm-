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


    cart.forEach(item => {
        let productDiv = document.createElement('div');
        productDiv.innerHTML = `
            <p>${item.name} (x${item.quantity})</p>
            <p>Price: TK. ${item.price * item.quantity}</p>
        `;
        cartDetails.appendChild(productDiv);


        totalPrice += item.price * item.quantity;
    });


    totalPrice += 200;
    let totalDiv = document.getElementById('total-price');
    totalDiv.innerHTML = `
        <p>Total Price: TK. ${totalPrice} (Including 200 TK delivery)</p>
    `;
}


window.onload = displayCart;


function makePayment() {

    let selectedMethod = document.querySelector('input[name="payment-method"]:checked');

    if (selectedMethod) {
        alert("Payment done via " + selectedMethod.value);


        localStorage.removeItem('cart');


        window.location.href = "index.html";
    } else {
        alert("Please select a payment method.");
    }
}