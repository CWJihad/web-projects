document.addEventListener("DOMContentLoaded", () => {

    const productList = document.getElementById("product-list");
    const cartItems = document.getElementById("cart-items");
    const totalCart = document.getElementById("total-cart");
    const totalPrice = document.getElementById("total-price");
    const checkoutBtn = document.getElementById("checkout-btn");

    // NOTE: Using a simple, non-time-based ID for product definitions is usually better
    const products = [
        { id: 1, name: "Product 1", price: 29.99 },
        { id: 2, name: "Product 2", price: 49.99 },
        { id: 3, name: "Product 3", price: 19.99 }
    ];

    // 🔹 Load cart from localStorage
    // Each item in the cart needs a *unique* ID for removal, even if they are the same product.
    // We will assign this unique ID when adding the item to the cart.
    let carts = JSON.parse(localStorage.getItem("carts")) || [];

    // 🔹 Render products (unchanged)
    products.forEach(product => {
        const div = document.createElement("div");
        div.classList.add("product");
        div.innerHTML = `
            <span>${product.name} - $${product.price.toFixed(2)}</span>
            <button data-id="${product.id}">Add to cart</button>
        `;
        productList.appendChild(div);
    });

    // 🔹 Product click handler (unchanged logic)
    productList.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            const id = Number(e.target.dataset.id);
            const product = products.find(p => p.id === id);
            addToCart(product);
        }
    });

    // 🔹 Add to cart function (MODIFIED to give a unique ID)
    function addToCart(product) {
        // Create a *new* item object for the cart with a unique ID
        const cartItem = {
            uniqueId: Date.now() + Math.random(), // Unique ID for this specific instance in the cart
            productId: product.id,
            name: product.name,
            price: product.price
        };
        carts.push(cartItem);
        saveCarts();
        renderCart();
    }

    // 🔹 Render cart (MODIFIED to use the uniqueId for the Remove button)
    function renderCart() {
        cartItems.innerHTML = "";
        let total = 0;

        if (carts.length === 0) {
            cartItems.innerHTML = `<p>Cart is Empty </p>`;
            totalCart.classList.add("hidden");
            totalPrice.textContent = "$0.00";
            return;
        }

        totalCart.classList.remove("hidden");

        carts.forEach(item => {
            total += item.price;

            const div = document.createElement("div");
            div.classList.add("product")
            div.innerHTML = `
                <span>${item.name} - $${item.price.toFixed(2)}</span>
                <button 
                    style="background: red; color: white" 
                    data-unique-id="${item.uniqueId}">Remove
                </button>
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

    // 🔹 Cart Items Click Handler (MODIFIED)
    cartItems.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") {
            // Get the unique ID from the button's dataset
            const uniqueId = Number(e.target.getAttribute("data-unique-id"));
            removeToCart(uniqueId)
        }
    })

    // 🔹 Remove from cart function (FIXED)
    function removeToCart(uniqueId) {
        // 1. Find the index of the item with the matching uniqueId
        const indexToRemove = carts.findIndex(item => item.uniqueId === uniqueId);

        if (indexToRemove > -1) {
            // 2. Use splice to remove *only* that one item at the found index
            carts.splice(indexToRemove, 1); 

            // 3. Save and re-render
            saveCarts();
            renderCart();
        }
    }

    // 🔹 VERY IMPORTANT: render cart on page load
    renderCart();
});