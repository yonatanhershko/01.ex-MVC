'use strict'

var gNextId = 100
var gBooks = [
    { id: gNextId++, title: 'The adventures of Lori Ipsi', price: 120, imgUrl: 'lori-ipsi.jpg' },
    { id: gNextId++, title: 'The adventures ', price: 150, imgUrl: 'lori-ipsi.jpg' },
    { id: gNextId++, title: 'The', price: 180, imgUrl: 'lori-ipsi.jpg' }
]


function getBooks(){
return gBooks

}


function AddBook(newName, newPrice) {
    var book = { id: gNextId++,
        title: newName,
        price: newPrice,
        imgUrl: 'lori-ipsi.jpg'
    }
    gBooks.push(book)
}



function updatePrice(bookId,newPrice) {
    var currBook = gBooks.find(book => book.id === bookId)
    // console.log(currBook)
    currBook.price  = newPrice
}

function removeBook(bookId) {
    // console.log(gBooks[0].id);
    var idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
}