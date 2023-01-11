class BookList {
  constructor () {
    this.container = document.querySelector('.books-container');
    this.formSection = document.getElementById('form-container');
  }


  displayBooks() {
    const books = JSON.parse(localStorage.getItem('books'));
    this.container.innerHTML = '';
    if (books) {
      books.forEach((book) => {
        if (book.title && book.author) {
          const bookUI = document.createElement('div');
          bookUI.classList.add('book');
          bookUI.innerHTML = `
            <p class="book-title"> Title: ${book.title}</p>
            <div class= "book-author"> By ${book.author} </div>
            <button id = '${book.title}' type="button" class="remove-button"> Remove Book </button>
            `;
          this.container.appendChild(bookUI);
        }
      });
    }
    const removeBtns = Array.from(document.querySelectorAll('.remove-button'));
    removeBtns.forEach((btn) => btn.addEventListener('click', () => this.removeBook(btn)));
  };

  addToStore(bookObj, title, author) {
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

  formSubmit() {
    this.formSection.addEventListener('submit', (event) => {
      event.preventDefault();
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const bookObj = {
        title,
        author,
      };
      this.formSection.elements.title.value = '';
      this.formSection.elements.author.value = '';
    
      // Update the Storage and User Interface
      this.addToStore(bookObj, title, author);
      this.displayBooks();
    });
  };

};