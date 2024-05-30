'use strict'

var gNextId = 100
var gBooks = [
    { id: gNextId++, title: 'The adventures of Lori Ipsi', price: 120, imgUrl: 'img/Img1.JPG' },
    { id: gNextId++, title: 'The adventures ', price: 150, imgUrl: 'img/Img2.JPG' },
    { id: gNextId++, title: 'The', price: 180, imgUrl: 'img/Img3.JPG' }
]


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