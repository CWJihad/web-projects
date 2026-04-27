const accessKey = `Vf40WVasqke7eH_I6SihQDUtOIpcFfcF2Mm2HpFp6Mg`

const searchForm = document.getElementById("search-form")
const searchBox = document.getElementById("search-box")
const searchResult = document.getElementById("search-result")
const showMoreBtn = document.getElementById("show-more-btn")

let keyword = ""
let page = 1

async function searchImages() {
    keyword = searchBox.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`

    const response = await fetch(url)
    const data = await response.json()

    console.log(data);
    const results = data.results
    
    if (page === 1) {
        searchResult.innerHTML = ""
    }
    
    if (data.results.length === 0) {
        searchResult.innerHTML = `<p>Images not found!!!</p>`
        searchResult.style = 'text-align: center; margin:50px auto 0; font-size: 20px; font-weight: bold; color: red'
    }
    results.map((result) => {
        const image = document.createElement('img')
        image.src = result.urls.small
        
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink)
        
    })

    showMoreBtn.style.display = "block"

}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()

    page = 1

    searchImages()
    
})

showMoreBtn.addEventListener('click', () => {
    page += 1
    searchImages()
})