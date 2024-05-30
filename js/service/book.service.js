'use strict'

var gNextId = 100
var gBooks 
_createBooks()

// = [
//     { id: gNextId++, title: 'The adventures of Lori Ipsi', price: 120, imgUrl: 'img/Img1.JPG' },
//     { id: gNextId++, title: 'The adventures ', price: 150, imgUrl: 'img/Img2.JPG' },
//     { id: gNextId++, title: 'The', price: 180, imgUrl: 'img/Img3.JPG' }
// ]


function getBooks(){
return gBooks

}


function BookDetails(bookId){
    var currBook = gBooks.find(book => book.id === bookId)
    return currBook
}



function AddBook(newName, newPrice) {
    var book = { id: gNextId++,
        title: newName,
        price: newPrice,
        imgUrl: 'img/Img4.JPG'
    }
    gBooks.push(book)
    _saveBooks()
}



function updatePrice(bookId,newPrice) {
    var currBook = gBooks.find(book => book.id === bookId)
    // console.log(currBook)
    currBook.price  = newPrice
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
    if(gBooks && gBooks.length !== 0) return

    gBooks = [
        _createBook('חוכמת המזרח'),
        _createBook('קולות מן ההרים'),
        _createBook('מכתבי יוני'),
    ]
    _saveBooks()
}

function _createBook(title) {
    return {
        id: makeId(),
        title,
        price: getRandomInt(1, 221),
        imgUrl: 'img/Img4.JPG'
    }
}


function _saveBooks() {
    saveToStorage('books', gBooks)
}