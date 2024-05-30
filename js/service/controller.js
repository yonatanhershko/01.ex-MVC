'use strict'




function onInit() {
    render()
}


function render() {
    var books = getBooks()
    const elBookList = document.querySelector('tbody')

    const strHtmls = books.map(book => `
    <tr>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td><button >Read</button>
             <button onclick ="onUpdateBook('${book.id}')" >Update </button> 
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


function onUpdateBook(bookId) {
    var newPrice = +prompt('Whats the new price ?')
    if (newPrice !== null) {
        updatePrice(+bookId, newPrice)
    }

    render()
}



function onAddBook() {
    var newName = prompt('New book name?')
    var newPrice = +prompt('New book price?')
    AddBook(newName, newPrice)
    render()
}
