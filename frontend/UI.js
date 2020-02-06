import BookService from './services/BookService';
const bookService = new BookService();
import { format } from 'timeago.js';

class UI{
    async renderBook(){
        const books = await bookService.getBooks();
        const booksCard = document.getElementById('books-card');
        booksCard.innerHTML = '';
        books.forEach(book => {
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card m-2 border-info">
                    <div class="row">
                        <div class="col-md-4">
                            <img src="http://localhost:4000${book.imagePath}" alt="" class="img-fluid" />
                        </div>
                        <div class="col-md-8">
                            <div class="card-block px-2">
                                <h4 class="card-title">${book.title}</h4>
                                <p class="card-text">${book.author}</p>
                                <a href="#" class="btn btn-danger delete" _id="${book._id}">X</a>
                            </div>
                        </div>
                    </div>
                    <div class="">
                        ${format(book.created_at)}
                    </div>
                </div>
            `;
            booksCard.appendChild(div);
        });
    }

    async addNewBook(book){
        await bookService.postBook(book);
        this.clearBookForm();
        this.renderBook();


    }

    clearBookForm(){
        document.getElementById('book-form').reset();
    }

    renderMessage(message, colorMessage, secondsToRemove){
        //creo el div del mensaje
        const div= document.createElement('div');
        div.className = `alert alert-${colorMessage} message`;
        div.appendChild(document.createTextNode(message))
        //selecciono donde colocarlo
        const container = document.querySelector('.col-md-5');
        const bookForm= document.querySelector('#book-form');

        //timepo para que cierre
        container.insertBefore(div, bookForm);
        setTimeout(() => {
            document.querySelector('.message').remove();
        },secondsToRemove)

    }

    async deleteBook(bookId){
        await bookService.deleteBook(bookId);
        this.renderBook();

    }


}

export default UI;