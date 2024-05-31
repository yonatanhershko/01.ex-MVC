'use strict'


var gBooks
var gFilterBy

_createBooks()

function getBooks(search) {
    if (!search || search === undefined) _createBooks()
    gFilterBy = search.toLowerCase()
    // console.log( gFilterBy);
    var newBookSearch = gBooks.filter(book =>
        // book.title.substring(0, gFilterBy.length).toLowerCase().includes(gFilterBy )
        book.title.substring(0, gFilterBy.length).toLowerCase() === gFilterBy
    )
    gBooks = newBookSearch
    return gBooks
}

function expensiveBooks() {
    return gBooks.filter(book => book.price >= 200)
}

function AvgBooks() {
    return gBooks.filter(book => book.price <= 200 && book.price >= 80)
}


function BookDetails(bookId) {
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


function AddBook(newName, price) {
    if (!newName || !price) return alert('No name / no price')
    var book = _createBook(newName, price)
    gBooks.unshift(book)// start

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
        _createBook('מכתבי יוני', 85, 'img/Img3.JPG')
    ]
    _saveBooks()
}

function _createBook(title, price, imgUrl = 'img/Img4.JPG') {
    return {
        id: makeId(5),
        title,
        price,
        imgUrl,
    }
}


function _saveBooks() {
    saveToStorage('books', gBooks)
}