'use strict'



function AddBook(){
    
}



function updatePrice(newPrice){
    var bookPrice = gBooks.find(book => book.price === newPrice)

}

function removeBook(bookId) {
    // console.log(gBooks[0].id);
    var idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
}