import { addMenuLinks } from './modules/displaymenu.js';
import { displayTime } from './modules/date.js';
import Book from './modules/class-book.js';

const removeBookFromDOM = (listBooks, id) => {
  if (id !== -1) {
    listBooks.removeBook(id);
  }
};

const addRemoveButtons = (listBooks) => {
  const buttons = document.getElementsByClassName('btn remove-btn');
  for (let i = 0; i < buttons.length; i += 1) {
    buttons[i].addEventListener('click', () => {
      removeBookFromDOM(listBooks, i);
    });
  }
};

class Library {
  constructor() {
    this.books = [];
  }

  saveToLocalStorage = () => {
    localStorage.setItem('MY-Library', JSON.stringify(this.books));
  }

  getDataFromLocalStorage = () => {
    try {
      const data = JSON.parse(localStorage.getItem('MY-Library'));
      if (data !== null) {
        this.books = data;
      }
    } catch (error) {
      this.saveToLocalStorage();
    }
  }

  addBook = () => {
    const form = document.querySelector('#form');
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const bookTitle = title.value;
    const bookAuthor = author.value;

    if (bookTitle.trim().length !== 0 && bookAuthor.trim().length !== 0) {
      const objBook = new Book(bookTitle, bookAuthor);
      this.books.push(objBook);
      this.saveToLocalStorage();
      this.getBooks();
      form.reset();
      document.getElementById('msg-add-book').innerHTML = 'New book added...';
      setTimeout(() => {
        document.getElementById('msg-add-book').innerHTML = '';
      }, 3000);
    }
    addRemoveButtons(this);
  }

  getBooks = () => {
    const section = document.querySelector('#book-list');
    this.getDataFromLocalStorage();
    let books = '<table>';
    this.books.forEach((book, index) => {
      books += `<tr>
      <td>
        <article class="book">
          <p>"${book.title}" by ${book.author}</p>
          <button type="button" id="${index}" class="btn remove-btn" onclick="removeBookFromDOM(${index})">Remove</button>
        </article>
      </td>
    </tr>
    `;
    });
    if (this.books.length === 0) {
      books += '<tr><td<p class="empty-libray">Empty...</p></td></tr>';
    }
    books += '</table>';
    section.innerHTML = books;
  }

  removeBook = (bookId) => {
    const filteredBooks = this.books.filter((book, index) => bookId !== index);
    this.books = filteredBooks;
    this.saveToLocalStorage();
    this.getBooks();
    addRemoveButtons(this);
  }
}

const listBooks = new Library();

const form = document.querySelector('#form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  listBooks.addBook();
});

listBooks.getDataFromLocalStorage();
listBooks.getBooks();
removeBookFromDOM(listBooks, -1);
displayTime();
addRemoveButtons(listBooks);
addMenuLinks();