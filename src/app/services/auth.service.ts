import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { iUserCredentials } from '../interfaces/user-credentials';
import { iUserRegData } from '../interfaces/user-reg-data';
import { v4 as uuidv4 } from 'uuid';
import { iAuthResponse } from './../interfaces/auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginUrl = environment.loginUrl;
  private signupUrl = environment.signupUrl;
  private authDataKey = 'authData';
  private jwtHelper = new JwtHelperService();

  private authStatusSubject = new BehaviorSubject<boolean>(this.isLoggedIn());
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: iUserCredentials): Observable<iAuthResponse> {
    return this.http.post<iAuthResponse>(this.loginUrl, credentials).pipe(
      tap((res) => {
        localStorage.setItem(this.authDataKey, JSON.stringify(res));
        this.authStatusSubject.next(true);
        this.scheduleLogout();
      }),
      catchError(this.handleError<iAuthResponse>('login'))
    );
  }

  register(userData: iUserRegData): Observable<any> {
    userData = { ...userData, id: uuidv4() };
    return this.http.post(this.signupUrl, userData).pipe(
      catchError(this.handleError('SignUp'))
    );
  }

  logout(): void {
    localStorage.removeItem(this.authDataKey);
    this.authStatusSubject.next(false);
  }

  isLoggedIn(): boolean {
    const token = this.getToken();
    return token != null && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    const authData = this.getAuthData();
    return authData ? authData.accessToken : null;
  }

  getUser(): iUserRegData | null {
    const authData = this.getAuthData();
    return authData ? authData.user : null;
  }

  private getAuthData(): iAuthResponse | null {
    const data = localStorage.getItem(this.authDataKey);
    return data ? JSON.parse(data) as iAuthResponse : null;
  }

  private scheduleLogout(): void {
    const token = this.getToken();
    if (token) {
      const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
      const expiresIn = expirationDate ? expirationDate.getTime() - Date.now() : 0;
      setTimeout(() => this.logout(), expiresIn);
    }
  }

  private handleError<T>(operation = 'operation') {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(error);
    };
  }

}
