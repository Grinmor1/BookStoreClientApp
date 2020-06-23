import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../model/book';
import { Observable, timer, interval  } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  public API = 'https://localhost:44355';
  
  private deleteList = [];
  private addList = [];
  interval: number = 60000;
  constructor(private http: HttpClient) {
    const timer =  interval(this.interval);
    timer.subscribe(() => this.synchronization());
  }

  loadBooks(): Observable<Book[]> {

    return this.http.get<Book[]>(`${this.API}/api/book`);

  }

  saveBook(book: Book) {

    this.addList.push(book);
  }

  deleteBook(id: number) {

    this.deleteList.push(id);
  }

  private synchronization() {

    this.addList.forEach(book => this.sendPushRequest(book));

    this.deleteList.forEach(id => this.sendDeleteRequest(id));

    this.loadBooks();
  }

  private sendDeleteRequest(id: number) {
   
    this.http.delete(`${this.API}/api/book/${id}`).subscribe(() => console.log(`${{id}} book was deleted`))
  }
  private sendPushRequest(book: Book) {

    this.http.post<Book>(`${this.API}/api/book`, book).subscribe(() => console.log(`Book was added`))
  }

 
}
