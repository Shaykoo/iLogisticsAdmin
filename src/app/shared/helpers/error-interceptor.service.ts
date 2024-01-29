import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';



@Injectable({providedIn: 'root'})
export class ErrorInterceptorService implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      console.log(err);
      if (err.status === 401 || err.status === 0) {
        console.log('catching error in interceptor service');
        // auto logout if 401 response returned from api
      }

      const error = err.error.message || err.statusText;
      return throwError(error);
    }));
  }
}
