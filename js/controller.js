'use strict'




function onInit() {
    render()
}

function render() {
    const elBookList = document.querySelector('tbody')
    var renderBooks = getBooksForRender()
    var elNoMatch = document.querySelector('.noMatch')
    if (gBooks.length == 0) {
        elNoMatch.innerHTML = 'No Matching Books Were Found😶‍🌫️'
    } else {
        elNoMatch.innerHTML = ''
    }
    const strHtmls = renderBooks.map(book => `
    <tr>
            <td>${book.title}</td>
            <td>$${book.price}</td>
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

function onFilterBy(search) {
    // var text = document.querySelector(".search-input").value;
    //  console.log('search :>> ', search)
    getBooks(search)
   
    render()
}

function onClearSearch() {
    var elInput = document.querySelector(".search-input")
    elInput.value = ''
    getBooks(elInput.value)
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

function onAddBook() {
    var newName = prompt('New book name?')
    var currPrice = getRandomInt(1, 222)
    AddBook(newName, currPrice)
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