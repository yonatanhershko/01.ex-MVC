'use strict'

const gQueryOptions = {
    filterBy: { txt: '', minRating: 0 },
    sortBy: {},
    page: { idx: 0, size: 5 }
}

function onInit() {
    readQueryParams()
    render()
}

function render() {
    const elBookList = document.querySelector('tbody')
    var renderBooks = getBooks(gQueryOptions)
    var elNoMatch = document.querySelector('.noMatch')
    if (renderBooks.length == 0) {
        elNoMatch.innerHTML = 'No Matching Books Were Found😶‍🌫️'
    } else {
        elNoMatch.innerHTML = ''
    }
    const strHtmls = renderBooks.map(book => `
    <tr>
            <td>${book.title}</td>
            <td>$${book.price}</td>
            <td>${"⭐".repeat(book.rating) || 0}</td>
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

function onAddBook() {
    const elText = document.querySelector('.input-newTitle')
    const elPrice = document.querySelector('.input-newPrice')
    
    var newTitle = elText.value
    var newPrice = +elPrice.value
    if (newTitle && newPrice) { 
        addBook(newTitle, newPrice)
        onCloseAddBookModal()
        render()
        addSuccess()
    } 
}

function onSetSortBy() {

    const elSortField = document.querySelector('.sort-by select')
    const elSortDir = document.querySelector('.sort-by input')

    const sortField = elSortField.value
    const sortDir = elSortDir.checked ? -1 : 1

    gQueryOptions.sortBy = {}

    if (sortField === 'title') gQueryOptions.sortBy = { title: sortDir }
    if (sortField === 'price') gQueryOptions.sortBy = { price: sortDir }
    if (sortField === 'rating') gQueryOptions.sortBy = { rating: sortDir }

    gQueryOptions.page.idx = 0
    setQueryParams()
    render()
}

function onNextPage() {
    const pageCount = getPageCount(gQueryOptions)

    if (gQueryOptions.page.idx === pageCount - 1) {
        gQueryOptions.page.idx = 0
    } else {
        gQueryOptions.page.idx++
    }
    setQueryParams()
    render()
}

function onPrevPage() {
    const pageCount = getPageCount(gQueryOptions)
    if (gQueryOptions.page.idx === 0) {
        gQueryOptions.page.idx = pageCount - 1
    } else {
        gQueryOptions.page.idx--
    }
    setQueryParams()
    renderBooks()
}

function onOpenAddBookModal() {
    var elOpenM = document.querySelector('.edit-new-book')
    elOpenM.style.display = "block"
}

function onCloseAddBookModal() {
    var elCloseM = document.querySelector('.edit-new-book')
    elCloseM.style.display = "none"
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


    const sortKeys = Object.keys(gQueryOptions.sortBy)
    const sortBy = sortKeys[0]
    const dir = gQueryOptions.sortBy[sortKeys[0]]

    document.querySelector('.sort-by select').value = sortBy || ''
    document.getElementById('ascending').checked = (dir === -1) ? 'true' : 'false'

}

function setQueryParams() {
    const queryParams = new URLSearchParams()

    queryParams.set('title', gQueryOptions.filterBy.txt)
    queryParams.set('minRating', gQueryOptions.filterBy.minRating)

    const sortKeys = Object.keys(gQueryOptions.sortBy)
    if (sortKeys.length) {
        queryParams.set('sortBy', sortKeys[0])
        queryParams.set('sortDir', gQueryOptions.sortBy[sortKeys[0]])
    }

    if (gQueryOptions.page) {
        queryParams.set('pageIdx', gQueryOptions.page.idx)
        queryParams.set('pageSize', gQueryOptions.page.size)
    }

  /*   if (gSelectedBookId) {
        queryParams.set("bookId", gSelectedBookId)
      }
     */

    const newUrl =
        window.location.protocol + "//" +
        window.location.host +
        window.location.pathname + '?' + queryParams.toString()

    window.history.pushState({ path: newUrl }, '', newUrl)
}


//// 
// var gSelectedBookId = ""
/* function onUpdateBook(id) {
    const elUpdatePrice = document.querySelector('.input-updatePrice')
    var elCloseUpdate = document.querySelector('.edit-new-update')
    
    if (id) {
        var newUpdatePrice = +elUpdatePrice.value
        updatePrice(id, newUpdatePrice)
    }
    
    elCloseUpdate.style.display = "none"
    addSuccess()
    render()
}
 */



/* function onOpenUpdateModal() {
    var elOpenUpdate = document.querySelector('.edit-new-update')
    elOpenUpdate.style.display = "block"
}
 */