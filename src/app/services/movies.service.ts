import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { iMovie } from '../interfaces/movies/movie';
import { iFavorite } from '../interfaces/movies/favourties';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private moviesUrl = environment.moviesUrl;
  private favouritesUrl = environment.favouritesUrl;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<iMovie[]> {
    return this.http.get<iMovie[]>(this.moviesUrl).pipe(
      catchError(this.handleError<iMovie[]>('getMovies', []))
    );
  }

  getMovie(id: string): Observable<iMovie> {
    return this.http.get<iMovie>(`${this.moviesUrl}/${id}`).pipe(
      catchError(this.handleError<iMovie>(`getMovie id=${id}`))
    );
  }

  getFavorites(userId: string): Observable<iFavorite[]> {
    return this.http
      .get<iFavorite[]>(`${this.favouritesUrl}?userId=${userId}`)
      .pipe(catchError(this.handleError<iFavorite[]>('getFavorites', [])));
  }

  addFavorite(favorite: iFavorite): Observable<iFavorite> {
    return this.http.post<iFavorite>(this.favouritesUrl, favorite).pipe(
      catchError(this.handleError<iFavorite>('addFavorite'))
    );
  }

  removeFavorite(id: string): Observable<void> {
    return this.http
      .delete<void>(`${this.favouritesUrl}/${id}`)
      .pipe(catchError(this.handleError<void>('removeFavorite')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
