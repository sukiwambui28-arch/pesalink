// pesalink-frontend/src/app/core/interceptors/http-error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NotificationService } from '../services/notification.service';
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService) {}
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
        if (error.error instanceof ErrorEvent) {
          // Client-side errors
          errorMessage = Error: ${error.error.message};
        } else {
          // Server-side errors
          errorMessage = Error Code: ${error.status}\nMessage: ${error.error.message || error.statusText};
        }
        // Display the error message
        this.notificationService.showError(errorMessage);
  
        // Pass the error to the calling code
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}