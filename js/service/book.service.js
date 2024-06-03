'use strict'


var gBooks
var gFilterBy
// var gRateFilterBy = gBooks.rating


_createBooks()

function getBooks(options = {}) {
    const filterBy = options.filterBy
    const sortBy = options.sortBy
    const page = options.page
    var books = gBooks

    //Filter
    books = _getFiltertBooks(filterBy)

    // Sort
    if (sortBy.title) {
        books = books.toSorted((c1, c2) => c1.title.localeCompare(c2.title) * sortBy.title)
    }
    if (sortBy.price) {
        books = books.toSorted((c1, c2) => (c1.price - c2.price) * sortBy.price)
    }
    if (sortBy.rating) {
        books = books.toSorted((c1, c2) => (c1.rating - c2.rating) * sortBy.rating)
    }

    //Pagination

    const idx = page.idx * page.size
    books = books.slice(idx, idx + page.size)

    return books
}


function getPageCount(options) {
    const filterBy = options.filterBy
    const page = options.page

    const bookCount = _getFiltertBooks(filterBy).length
    // console.log('hh');
    return Math.ceil(bookCount / page.size)
}



function _getFiltertBooks(filterBy) {
    var books = gBooks
    if (filterBy.txt) books = books.filter(book =>
        book.title.substring(0, filterBy.txt.length).toLowerCase() === filterBy.txt.toLowerCase())
    if (filterBy.minRating) books = books.filter(book => book.rating >= filterBy.minRating)

    return books
}

function expensiveBooks() {
    return gBooks.filter(book => book.price >= 200)
}

function AvgBooks() {
    return gBooks.filter(book => book.price <= 200 && book.price >= 80)
}

function BookDetails(bookId, title) {
    var currBook = gBooks.find(book => book.id === bookId)
    return currBook
}

function addSuccess() {
    var elSuccess = document.querySelector('.success')
    elSuccess.style.opacity = 1
    setTimeout(() => {
        elSuccess.style.opacity = 0
    }, 2000)
}

function addBook(newTitle, newPrice) {
    var newBook = _createBook(newTitle, newPrice)
    gBooks.unshift(newBook)
    // gBooks.push(book) //end
    _saveBooks()
}

function getBookById(id) {
    return gBooks.find(book => book.id === id)
}
function updatePrice(id, price) {
    var book = getBookById(id)
    book.price = price
    _saveBooks()
}


function removeBook(bookId) {
    // console.log(gBooks[0].id);
    var idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
    _saveBooks()
}

function _createBooks() {
    gBooks = loadFromStorage('books')
    if (gBooks && gBooks.length !== 0) return

    gBooks = [
        _createBook('חוכמת המזרח', 75, 'img/Img1.JPG'),
        _createBook('קולות מן ההרים', 80, 'img/Img2.JPG'),
        _createBook('מכתבי יוני', 85, 'img/Img3.JPG',)
    ]
    _saveBooks()
}

function _createBook(title, price, imgUrl = 'img/Img4.JPG') {
    return {
        id: makeId(5),
        title,
        price,
        imgUrl,
        rating: getRandomInt(1, 6)
    }
}


function _saveBooks() {
    saveToStorage('books', gBooks)
}