document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form")
    const expenseNameInput = document.getElementById("expense-name")
    const expenseAmountInput = document.getElementById("expense-amount")
    const expenseList = document.getElementById("expense-list")
    const totalAmountDisplay = document.getElementById("total-amount")
    
    let expenses = JSON.parse(localStorage.getItem("expense")) || [];
    let totalAmount = calculateTotal()

    function saveLocalStore () {
        localStorage.setItem("expense", JSON.stringify(expenses))
    }

    renderExpenses()

    expenseForm.addEventListener("submit", (e) => {
        e.preventDefault()
        let name = expenseNameInput.value.trim()
        let amount = parseFloat(expenseAmountInput.value.trim())

        if (name !== "" && !isNaN(amount) && amount > 0) {
            const newExpense = {
                id: Date.now(),
                name: name,
                amount: amount
            }
            expenses.push(newExpense)
            saveLocalStore()
            renderExpenses()
            updateTotal()

            // clear input
            expenseNameInput.value = ""
            expenseAmountInput.value = ""
            
        }
    })

    function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${expense.name} - $${expense.amount}
        <button data-id="${expense.id}">Delete</button>
        `;
      expenseList.appendChild(li);
      updateTotal()
    });
  }

    function calculateTotal() {
        return expenses.reduce((acc, expense) => (acc + expense.amount), 0)
    }

    expenseList.addEventListener("click", (e) => {
        if(e.target.tagName === "BUTTON") {
            // console.log(typeof e.target.getAttribute("data-id"));
            const expenseId = parseInt(e.target.getAttribute("data-id"))
            expenses = expenses.filter((e) => e.id !== expenseId)
            saveLocalStore()
            renderExpenses()
            updateTotal()
        }
    })
    
    function updateTotal() {
        totalAmount = calculateTotal()
        totalAmountDisplay.textContent = totalAmount.toFixed(2)
    }

})
