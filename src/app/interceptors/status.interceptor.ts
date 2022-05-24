import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpHandler, HttpInterceptor } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatusInterceptor implements HttpInterceptor {

  constructor( private authService: AuthService ) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      return next.handle(request).pipe(catchError(error => {
      if (error.status === 401 || error.status === 403) {
        // se borra el token guardado y se reinicia la pagina para luego redireccionar con el Guard
        this.authService.LogOut();
        location.reload();
      }
      return throwError(error);
  }));
  }
}
