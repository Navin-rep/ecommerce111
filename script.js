// ===== LOAD CART FROM STORAGE =====
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// ===== SELECT BUTTONS =====
const buttons = document.querySelectorAll(".card button");

// ===== ADD TO CART =====
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const card = button.closest(".card");

        const product = {
            name: card.querySelector("h3").innerText,
            price: parseFloat(card.querySelector(".price").innerText.replace("$", "")),
            image: card.querySelector("img").src,
            quantity: 1
        };

        // Check if already in cart
        const existing = cart.find(item => item.name === product.name);

        if (existing) {
            existing.quantity++;
        } else {
            cart.push(product);
        }

        saveCart();
        alert(product.name + " added to cart!");
    });
});

// ===== SAVE CART =====
function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

// ===== DISPLAY CART =====
function displayCart() {
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    if (!cartContainer) return; // Only run on cart page

    cartContainer.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.classList.add("cart-item");

        div.innerHTML = `
            <img src="${item.image}" width="80">
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
                <button onclick="removeItem(${index})">Remove</button>
            </div>
        `;

        cartContainer.appendChild(div);
    });

    totalContainer.innerText = "Total: $" + total.toFixed(2);
}

// ===== REMOVE ITEM =====
function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    displayCart();
}

// ===== CLEAR CART =====
function clearCart() {
    cart = [];
    saveCart();
    displayCart();
}

// ===== RUN CART DISPLAY ON LOAD =====
document.addEventListener("DOMContentLoaded", displayCart);