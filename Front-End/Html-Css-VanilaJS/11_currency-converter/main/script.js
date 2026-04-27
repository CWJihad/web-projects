const populate = async (value, currency) => {

    let myStr = ""
    let url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_CPHrss6nsoIniYErxQmy23cCRdVQl2N0fx0Wbrut&base_currency=" + currency
    let res = await fetch(url)
    let resJson = await res.json()
    let currencies = ["USD", "INR", "BDT", "EUR"]

    document.querySelector(".output").style.display = 'block'


    for (let key of Object.keys(resJson['data'])) {
        currencies.forEach((c) => {
            if (key === c) {
                myStr +=
                    `<tr>
                <td>${key}</td>
                <td>${resJson['data'][key]['code']}</td>
                <td>${Math.round(resJson['data'][key]["value"] * value)}</td>
                `
            }

        })
    }

    const tableBody = document.querySelector('tbody')
    tableBody.innerHTML = myStr

}

const btn = document.querySelector('.btn')
btn.addEventListener('click', (e) => {
    e.preventDefault()
    const value = parseInt(document.querySelector("input[name='quantity']").value)
    const currency = document.querySelector("select[name='currency']").value
    populate(value, currency)
})