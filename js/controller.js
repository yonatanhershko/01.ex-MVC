'use strict'

const gQueryOptions = {
    filterBy: { txt: '', minRating: 0 },
    sortBy: {},
    page: { idx: 0, size: 3 }
}

function onInit() {
    readQueryParams()
    render()
}

function render() {
    const elBookList = document.querySelector('tbody')
    var renderBooks = getBooks(gQueryOptions)
    var elNoMatch = document.querySelector('.noMatch')
    if (gBooks.length == 0) {
        elNoMatch.innerHTML = 'No Matching Books Were Found😶‍🌫️'
    } else {
        elNoMatch.innerHTML = ''
    }
    const strHtmls = renderBooks.map(book => `
    <tr>
            <td>${book.title}</td>
            <td>$${book.price}</td>
            <td>${book.rating}</td>
            <td><button onclick ="onBookDetails('${book.id}')" >Read</button>
             <button onclick ="onUpdateBook('${book.id}')" >Update </button> 
             <button class = "del" onclick ="onRemoveBook('${book.id}')">Delete</button></td>
          </tr>`)

    elBookList.innerHTML = strHtmls.join('')
    renderStats()
}

function renderStats() {
    const elFooter = document.querySelector('footer')

    const elTotalExpBooks = elFooter.querySelector('.expensive')
    const elTotalAvgBooks = elFooter.querySelector('.averge')
    const elTotalCheapBooks = elFooter.querySelector('.cheap')

    const countExpBooks = expensiveBooks().length
    const countAvgBooks = AvgBooks().length
    const countCheapBooks = gBooks.length - countExpBooks - countAvgBooks

    elTotalExpBooks.innerHTML = countExpBooks
    elTotalCheapBooks.innerHTML = countCheapBooks
    elTotalAvgBooks.innerHTML = countAvgBooks
}



function onSetFilterBy(filterBy) {
    if (filterBy.txt !== undefined) {
        gQueryOptions.filterBy.txt = filterBy.txt
    }
    if (filterBy.minRating !== undefined) {
        gQueryOptions.filterBy.minRating = filterBy.minRating
    }
    gQueryOptions.page.idx = 0
    setQueryParams()
    render()
}


function onSetSortBy(){

    const elSortField = document.querySelector('.sort-by select')
    const elSortDir = document.querySelector('.sort-by input')

    const sortField = elSortField.value
    const sortDir = elSortDir.checked ? -1 : 1

    gQueryOptions.sortBy = {}

    if(sortField === 'title') gQueryOptions.sortBy = { title: sortDir }
    if(sortField === 'price') gQueryOptions.sortBy = { price: sortDir }
    if(sortField === 'rating') gQueryOptions.sortBy = { rating: sortDir }

    gQueryOptions.page.idx = 0
    setQueryParams()
    render()
}

function onClearSearch() {
    var elInput = document.querySelector(".search-input")
    const elRatingFilter = document.querySelector('.rating')

    elInput.value = ''
    elRatingFilter.selectedIndex = 0
    gQueryOptions.filterBy.txt = ''
    gQueryOptions.filterBy.minRating = 0

    getBooks(gQueryOptions)
    render()
}

function onRemoveBook(id) {
    // Model
    removeBook(id)

    // DOM
    render()
    addSuccess()
}

function onUpdateBook(id) {
    var newPrice = +prompt('Whats the new price ?')
    if (newPrice !== null) {
        updatePrice(id, newPrice)
    }
    render()
    addSuccess()
}

function onAddBook() {
    var newName = prompt('New book name?')
    var currPrice = getRandomInt(1, 222)
    AddBook(newName, currPrice)
    render()
    addSuccess()
}

function onBookDetails(id) {
    const elModal = document.querySelector('.modal')
    const elData = elModal.querySelector('pre')

    ///Model
    var bookDetails = BookDetails(id)
    console.log('bookDetails: ', bookDetails)

    // DOM
    elData.innerText = JSON.stringify(bookDetails, null, 2)
    elModal.style.backgroundImage = `url(${bookDetails.imgUrl})`
    elModal.showModal()
}


// Query Params

function readQueryParams() {
    const queryParams = new URLSearchParams(window.location.search)

    gQueryOptions.filterBy = {
        txt: queryParams.get('title') || '',
        minRating: +queryParams.get('minRating') || 0
    }

    renderQueryParams()
}

function renderQueryParams() {

    document.querySelector('.search-input').value = gQueryOptions.filterBy.txt
    document.querySelector('.rating').value = gQueryOptions.filterBy.minRating

    // const sortKeys = Object.keys(gQueryOptions.sortBy)
    // const sortBy = sortKeys[0]
    // const dir = gQueryOptions.sortBy[sortKeys[0]]

    // document.querySelector('.sort-by select').value = sortBy || ''
    // document.querySelector('.sort-desc').checked = (dir === -1) ? 'true' : 'false'

}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('title', gQueryOptions.filterBy.txt)
    queryParams.set('minRating', gQueryOptions.filterBy.minRating)

    // const sortKeys = Object.keys(gQueryOptions.sortBy)
    // if(sortKeys.length) {
    //     queryParams.set('sortBy', sortKeys[0])
    //     queryParams.set('sortDir', gQueryOptions.sortBy[sortKeys[0]])
    // }

    // if(gQueryOptions.page) {
    //     queryParams.set('pageIdx', gQueryOptions.page.idx)
    //     queryParams.set('pageSize', gQueryOptions.page.size)
    // }

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}
