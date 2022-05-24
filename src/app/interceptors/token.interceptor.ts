import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpInterceptor, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const currCredentials = JSON.parse(localStorage.getItem('token')!);
    // si el token es distinto de null se agrega el token en la peticion Request
    if (currCredentials != null ) {
      request = request.clone({
        headers: request.headers
          .set('Authorization',  `Bearer ${currCredentials}`)
          .set('Accept', 'application/json')
          .set('Content-Type', 'application/json')
     });
    }
    return next.handle(request);
  }
}