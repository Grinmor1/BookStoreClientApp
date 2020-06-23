import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Book } from '../model/book';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-bookstore-panel',
  templateUrl: './bookstore-panel.component.html',
  styleUrls: ['./bookstore-panel.component.css']
})
export class BookstorePanelComponent implements OnInit {
  books$: Observable<Book[]>;
  private bookSubject: BehaviorSubject<Book[]>;
  private books: Book[];
  constructor(private bookService: BookService) {
    this.bookService.loadBooks().subscribe(books => {
      this.books = books,
        this.bookSubject.next(this.books);
    })
  }
  addForm = new FormGroup({
    name: new FormControl(''),
    author: new FormControl(''),
    numberPages: new FormControl(''),
    rating: new FormControl(''),
  });

  deleteForm = new FormControl('')
  ngOnInit(): void {
    this.bookSubject = new BehaviorSubject<Book[]>([]);
    this.books$ = this.bookSubject.asObservable();

  }



  deleteBook() {
    let index = this.books.findIndex(x => x.id == this.deleteForm.value);
    this.books.splice(index, 1);
    this.bookService.deleteBook(this.deleteForm.value);
  }


  addBook() {
    if (this.addForm.value.id === undefined) {
      this.addForm.value.id = this.findMaxId();
    }
    this.books.push(this.addForm.value);
    this.bookService.saveBook(this.addForm.value);

  }

  findMaxId(): number {
    return Math.max.apply(Math, this.books.map(function (book) { return book.id })) + 1;
  }

}
