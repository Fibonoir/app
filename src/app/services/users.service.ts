import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { iUser } from '../interfaces/user';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersUrl = environment.usersUrl

  constructor(private http: HttpClient) {}

  getUsers(): Observable<iUser[]> {
    return this.http.get<iUser[]>(this.usersUrl).pipe(
      catchError(this.handleError<iUser[]>('getUsers', []))
    );
  }

  getUser(id: string): Observable<iUser> {
    return this.http.get<iUser>(`${this.usersUrl}/${id}`).pipe(
      catchError(this.handleError<iUser>(`getUser id=${id}`))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
