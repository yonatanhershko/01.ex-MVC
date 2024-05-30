'use strict'


function onUpdateBook(){
console.log('hh');
}


function removeBook(bookId) {
    // console.log(gBooks[0].id);
    var idx = gBooks.findIndex(book => book.id === bookId)
    gBooks.splice(idx, 1)
}