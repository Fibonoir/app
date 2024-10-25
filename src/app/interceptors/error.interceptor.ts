import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = '';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Client-side error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 0:
              errorMessage = 'Network error: Please check your internet connection.';
              break;
            case 400:
              errorMessage = 'Bad request: Please verify your input.';
              break;
            case 401:
              errorMessage = 'Unauthorized: Please log in again.';
              break;
            case 403:
              errorMessage = 'Forbidden: You do not have access.';
              break;
            case 404:
              errorMessage = 'Not found: The requested resource was not found.';
              break;
            case 500:
              errorMessage = 'Internal server error: Please try again later.';
              break;
            default:
              errorMessage = `Error ${error.status}: ${error.message}`;
              break;
          }
        }

        this.notificationService.showError(errorMessage);
        return throwError(errorMessage);
      })
    );
  }
}
