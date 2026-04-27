document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById("product-list")
    const cartItems = document.getElementById("cart-items")
    const emptyCart = document.getElementById("empty-cart")
    const totalCart = document.getElementById("total-cart")
    const totalPrice = document.getElementById("total-price")
    const checkoutBtn = document.getElementById("checkout-btn")

    const products = [
        {id: 1, name: "Product 1", price: 29.99},
        {id: 2, name: "Product 2", price: 49.99},
        {id: 3, name: "Product 3", price: 19.999},
    ]

    const carts = JSON.parse(localStorage.getItem("carts")) || [];
    renderCart()

    products.forEach(product => {
        const div = document.createElement('div')
        div.classList.add('product')
        div.innerHTML = `
        <span>${product.name} - $${product.price.toFixed(2)}</span>
        <button data-id="${product.id}">Add to cart</button>
        `
        productList.appendChild(div)
    })

    productList.addEventListener("click", (e) => {
        if (e.target.tagName === 'BUTTON') {
            const productId = parseInt(e.target.getAttribute("data-id"))
            const product = products.find(p => p.id === productId)
            addToCart(product)
        }
    })

    function addToCart (p) {
        carts.push(p)
        saveCarts()
        renderCart()
        
    }

    function renderCart() {
        let priceSum = 0;
        
        if (carts.length > 0) {
            cartItems.innerText = ""
            emptyCart.classList.add('hidden')
            totalCart.classList.remove('hidden')
            cartItems.classList.remove("hidden")
            carts.forEach((item, index) => {
                priceSum += item.price
                totalPrice.textContent = `$${priceSum.toFixed(2)}`

                const cartDiv = document.createElement('div')
                cartDiv.innerHTML = `
                ${item.name} - $${item.price.toFixed(2)}
                `
                cartItems.appendChild(cartDiv);

            })
        }
        else {
            cartItems.classList.add("hidden")
            emptyCart.classList.remove('hidden')
            totalPrice.textContent = '$0.00'
            // totalCart.classList.add('hidden')
        }

    }

    checkoutBtn.addEventListener('click', () => {
        carts.length = 0
        alert("Checkout successfully")
        renderCart()
        saveCarts()
        
    })

    function saveCarts () {
        localStorage.setItem("carts", JSON.stringify(carts))
    }
    
})