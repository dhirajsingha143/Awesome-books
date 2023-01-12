const addBtn = document.querySelector('#add-btn');
let books = JSON.parse(localStorage.getItem('books'));

class Book {
  constructor(id, title, author) {
    this.id = id;
    this.title = title;
    this.author = author;
  }

  addBook() {
    const { id, title, author } = this;
    const bookObj = { id, title, author };
    books = JSON.parse(localStorage.getItem('books'));
    if (books !== null) {
      books.push(bookObj);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
    } else {
      books = [];
      books.push(bookObj);
      localStorage.setItem('books', JSON.stringify(books));
      books = JSON.parse(localStorage.getItem('books'));
      document.getElementById('title').value = '';
      document.getElementById('author').value = '';
    }
  }

  removeBook() {
    const { id } = this;
    books = books.filter((book) => {
      if (book.id !== id) {
        return true;
      }
      return false;
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

const displayBook = (id, title, author) => {
  const bookList = document.querySelector('.books-container');
  const li = document.createElement('li');
  li.classList.add('book');
  li.innerHTML = `
  <div class= "info">
    <p class="book-title"> Title: ${title}</p>
    <p class= "book-author"> by ${author} </p>
  </div>`;
  const removeBookBtn = document.createElement('button');
  removeBookBtn.classList.add('remove-button');
  removeBookBtn.textContent = 'Remove';
  li.appendChild(removeBookBtn);
  bookList.appendChild(li);
  removeBookBtn.addEventListener('click', () => {
    const book = new Book(id, title, author);
    id = removeBookBtn.id;
    book.removeBook();
    if (li.previousElementSibling === null && li.nextElementSibling === null) {
      bookList.classList.remove('border');
      li.remove();
    } else {
      li.remove();
    }
  });
};

if (books !== null) {
  books.forEach((book) => {
    displayBook(book.id, book.title, book.author);
  });
}

addBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const toTitleCase = (str) => str.toLowerCase().split(' ').map((word) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
  const id = Date.now();
  const book = new Book(id, toTitleCase(title), toTitleCase(author));
  book.addBook();
  if (title && author) {
    displayBook(book.id, book.title, book.author);
  }
});

// selecting buttons
const listbtn = document.getElementById('link-list');
const addbtn = document.getElementById('link-add');
const contactbtn = document.getElementById('link-contact');
// slecting containers
const bc = document.getElementById('list');
const ac = document.getElementById('add-book');
const cc = document.getElementById('contact');

// adding event listeners
addbtn.addEventListener('click', () => {
  bc.style.display = 'none';
  ac.style.display = 'flex';
  cc.style.display = 'none';
});

listbtn.addEventListener('click', () => {
  bc.style.display = 'flex';
  ac.style.display = 'none';
  cc.style.display = 'none';
});

contactbtn.addEventListener('click', () => {
  bc.style.display = 'none';
  ac.style.display = 'none';
  cc.style.display = 'flex';
});

const date = document.getElementById('date');
// eslint-disable-next-line no-undef
const { DateTime } = luxon;
const now = DateTime.now();
date.innerText = now.toLocaleString(DateTime.DATETIME_MED_WITH_SECONDS);