// phone camera access
/*
const supported = 'mediaDevices' in navigator;

const player = document.getElementById('player');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const captureButton = document.getElementById('capture');

  const constraints = {
    video: true,
  };

// permission eed to be asked
  captureButton.addEventListener('click', () => {
    // Draw the video frame to the canvas.
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    player.srcObject.getVideoTracks().forEach(track => track.stop());
  });

  // Attach the video stream to the video element and autoplay.
  navigator.mediaDevices.getUserMedia(constraints)
    .then((stream) => {
      player.srcObject = stream;
    });
*/
// *************************************


// book class - object 
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// ui class - interface
class UI {
    static displayBooks() {

        // get data from database
        //const books = Store.getBooks();
        const books = [
            {
                title: 'I Robot',
                author: 'Isaac asimov',
                isbn: '23768'
            },
            {
                title: 'Il Sole Nudo',
                author: 'Isaac asimov',
                isbn: '8439'
            },
            {
                title: '1984',
                author: 'Orwell',
                isbn: '0982'
            }
        ]

       books.forEach((book) => UI.addBookToList(book));

    }

    static addBookToList(book) {
        // add to database, connect to user
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">delete</a></td>
        `;

        list.appendChild(row);

    }

    static clearForm() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    // alert messages
    /* static showAlert(message, style){
        const div = document.createElement('div');

        div.style = `alert -${style}`;
        div.appendChild(document.createTextNode(message));

    } */

    // delete by id
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }
}

// store class - save, storage
class Store {

   static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books')); // JSON format

        }

    } 

    static addBook(book) { // id ?
        const books = Store.getBooks();

        books.push(book);

      //  localStorage.setItem('books', JSON.stringify(books));

    }

    static removeBook(isbn) { // id ?

        const books = Store.getBooks();

        books.forEach((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1);
            }
        }); 

      localStorage.setItem('books', JSON.stringify(books));
    }
}
// ************************

// events class display stuff
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Add an Item
document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // get the info
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;


    if (title === '' || author === '' || isbn === '') {
        alert('fields missing');
        // UI.showAlert('missing fiels', 'red');
    } else {
        // create the book
        const book = new Book(title, author, isbn);

        // success message
        //UI.showAlert('success', '')

        console.log(book);
        UI.addBookToList(book);
        UI.clearForm();
        Store.addBook(book);


    }


});


// delete book
// target element
document.querySelector('#book-list').addEventListener('click', (e) => {
    // console.log(e.target);
    UI.deleteBook(e.target);
});

