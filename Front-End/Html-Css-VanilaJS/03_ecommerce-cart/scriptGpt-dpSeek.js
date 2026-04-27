document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const totalCart = document.getElementById("total-cart");
    const totalPrice = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 49.99 },
        { id: 3, name: "Product 3", price: 19.99 }
    ];

    // 🔹 Load cart from localStorage
    let carts = JSON.parse(localStorage.getItem("carts")) || [];

    // 🔹 Render products
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(div);
    });

    // 🔹 Product click handler
    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const id = Number(e.target.dataset.id);
            const product = products.find(p => p.id === id);
            addToCart(product);
        }
    });

    function addToCart(product) {
        carts.push(product);
        saveCarts();
        renderCart();
    }

    function renderCart() {
        cartItems.innerHTML = "";
        let total = 0;

        if (carts.length === 0) {
            cartItems.innerHTML = `<p>Cart is Empty</p>`;
            totalCart.classList.add("hidden");
            totalPrice.textContent = "$0.00";
            return;
        }

        totalCart.classList.remove("hidden");

        carts.forEach(item => {
            total += item.price;
            const div = document.createElement("div");
            div.classList.add("product");
            div.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button style="background: red; color: white" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(div);
        });

        totalPrice.textContent = `$${total.toFixed(2)}`;
    }

    function saveCarts() {
        localStorage.setItem("carts", JSON.stringify(carts));
    }

    checkoutBtn.addEventListener("click", () => {
        carts = [];
        saveCarts();
        renderCart();
        alert("Checkout successful!");
    });

    // 🔹 Remove item from cart
    cartItems.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON" && e.target.textContent === "Remove") {
            const itemId = parseInt(e.target.getAttribute("data-id"));
            removeFromCart(itemId);
        }
    });

    function removeFromCart(itemId) {
        // Filter out the item with the matching ID
        carts = carts.filter(item => item.id !== itemId); // it that case if same product added more than one time it filter out or removed also
        saveCarts();
        renderCart();
    }

    // 🔹 VERY IMPORTANT: render cart on page load
    renderCart();
});