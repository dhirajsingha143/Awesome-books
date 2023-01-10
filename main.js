const container = document.querySelector('.books-container');
const form = document.getElementById('form-container');

// Function to delete book from the list and local storage.
const deleteBook = (btn) => {
  const parent = btn.parentElement;
  parent.parentElement.removeChild(parent);
  let books = JSON.parse(localStorage.getItem('books'));
  books = books.filter((book) => book.title !== btn.parentElement.children[0].innerHTML.slice(8));
  localStorage.setItem('books', JSON.stringify(books));
};

const dispalyBooks = () => {
  const books = JSON.parse(localStorage.getItem('books'));
  container.innerHTML = '';
  if (books) {
    books.forEach((book) => {
      if (book.title && book.author) {
        const bookUI = document.createElement('div');
        bookUI.classList.add('book');
        bookUI.innerHTML = `
          <p class="book-title"> Title: ${book.title}</p>
          <div class= "book-author"> By ${book.author} </div>
          <button id = '${book.title}' type="button" class="remove-button"> Remove </button>
          `;
        container.appendChild(bookUI);
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

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
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