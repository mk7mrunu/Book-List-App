// Book Class: Represents a Book
class Book {
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn =  isbn;
    }
}

// UI Class: Handle UI tasks
class UI {
    static displayBooks(){
        const books =  StoredBooks;                       //we are setting books inside that array

        books.forEach((book) => UI.addBookToList(book)); //calling method to pass books into it
    }

    static addBookToList(book){                                  // created function
        const list = document.querySelector('#book-list');      //selected id from HTML

        const row = document.createElement('tr');              // created a var n added elements to it
          // inside row we are adding the items
        row.innerHTML = `                                       
        <td>${book.title}</td>                  
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);                         // appended the row at the last.
    }

    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();   //it will delete the content which is added 
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);    //timer for 3 sec to vanish the dialogue box
    }    

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
      }
}

// Store Class: Handles Storage
class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displaybooks);  // as the DOM loads it will display the books

// Event: Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();
    
    // Get form values
    const title = document.querySelector('#title');
    const author = document.querySelector('#author');
    const isbn = document.querySelector('#isbn');

    // Validate
    if(title === '' || author === '' || isbn === '') {
        UI.showAlert('Please fill in all fields', 'danger');  //if we click it show red color box on top
    } else {
        // Instatiate book
        const book =  new Book(title, author, isbn);

        // Add Book to UI
        UI.addBookToList(book);                 // it will add new content which we type   

        // Add book to store
        Store.addBook(book);

        // Show success message
        UI.showAlert('Book Added', 'success');  // when we fill the details n submit it a pop up will show in green box

        //Clear Fields
        UI.clearFields();                       //after typing the content n pressing submit it will cleat the fields which are typed
    }
});
 
//Event: Remove a Book
document.querySelector('#book-list').addEventListener('click', (e) =>{
    UI.deleteBook(e.target)                     // it will target the content which we click 
   
    // Remove book from UI
    UI.deleteBook(e.target);

    // Remove book from store
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show success message
    UI.showAlert('Book Removed', 'success');   // when we remove the details n submit it a pop up will show in green box
});