const booksContainer = document.querySelector('.books-container');
const form = document.getElementById('form-container');

// Function to delete book from the list and local storage.
// const deleteBook = (btn) => {
//     const parent = btn.parentElement;
//     parent.parentElement.removeChild(parent);
//     let books = JSON.parse(localStorage.getItem('books'));
//     books = books.filter((book) => book.title !== btn.parentElement.children[0].innerHTML.slice(8));
//     localStorage.setItem('books', JSON.stringify(books));
// };

const dispalyBooks = () => {
    const books = JSON.parse(localStorage.getItem('books'));
    booksContainer.innerHTML = '';
    if (books) {
        books.forEach((book) => {
            if (book.title && book.author) {
                const bookUI = document.createElement('li');
                bookUI.classList.add('book');
                bookUI.innerHTML = `
          <p class="book-title"> Title: ${book.title}</p>
          <p class= "book-author"> By ${book.author} </p>
          <button id = '${book.title}' type="button" class="remove-button"> Remove </button>
          `;
                booksContainer.appendChild(bookUI);
            }
        });
    }
    const removeBtns = Array.from(document.querySelectorAll('.remove-button'));
    removeBtns.forEach((btn) => btn.addEventListener('click', () => deleteBook(btn)));
};

dispalyBooks();

// Adds Book information to Local Storage
const addToStore = (bookObj, title, author) => {
    if (title && author) {
        if (!localStorage.getItem('books')) {
            localStorage.setItem('books', JSON.stringify([]));
            const books = JSON.parse(localStorage.getItem('books'));
            books.push(bookObj);
            localStorage.setItem('books', JSON.stringify(books));
        } else {
            const books = JSON.parse(localStorage.getItem('books'));
            books.push(bookObj);
            localStorage.setItem('books', JSON.stringify(books));
        }
    }
};

// Event Listener for the form
const addbtn = document.getElementById('add-btn');

addbtn.addEventListener('click', (e) => {

    const title = document.getElementById('form-title').value;
    const author = document.getElementById('form-author').value;
    const bookObj = {
        title,
        author,
    };
    form.elements.title.value = '';
    form.elements.author.value = '';

    // Update the Storage and User Interface
    addToStore(bookObj, title, author);
    dispalyBooks();

});