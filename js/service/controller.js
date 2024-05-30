'use strict'

var gNextId = 100
var gBooks = [
    { id: gNextId++, title: 'The adventures of Lori Ipsi', price: 120, imgUrl: 'lori-ipsi.jpg' },
    { id: gNextId++, title: 'The adventures ', price: 150, imgUrl: 'lori-ipsi.jpg' },
    { id: gNextId++, title: 'The', price: 180, imgUrl: 'lori-ipsi.jpg' }
]



function onInit() {
    render()
}


function render() {
    const elBookList = document.querySelector('tbody')

    const strHtmls = gBooks.map(book => `
    <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td><button >Read</button>
             <button onclick ="onUpdateBook('${book.price}')" >Update </button> 
             <button onclick ="onRemoveBook('${book.id}')">Delete</button></td>
          </tr>`)

    elBookList.innerHTML = strHtmls.join('')
}


function onRemoveBook(bookId) {
    // Model
    removeBook(+bookId)

    // DOM
    render()
}


