import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private _Router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, 
              state: RouterStateSnapshot) {
    
    const currCredentials = JSON.parse(localStorage.getItem('token')!);
    if (currCredentials != null) {
      return true;
    }

    this._Router.navigate(['/auth/login']);
    return false;
  }
}
