import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as e} from '../../environments/environment';
import { Sign } from '../models/sign.model'
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authHttpOptions = { headers: new HttpHeaders({'Content-Type': 'application/json; charset=utf-8'})};
  constructor( private http: HttpClient) { }

  public login(signVM: Sign ) {

    // adding manually application key to viewmodel for testing purpose.
    signVM.appKey = 'doggoservice';

    return this.http.post(`${e.authUrl}/sign`, signVM, this.authHttpOptions);
  }

  public signup(signVM: Sign) {
    signVM.appKey = 'doggoservice';
    return this.http.post(`${e.authUrl}/signup`, signVM, this.authHttpOptions);
  }

  LogOut() {
    localStorage.clear();
  }
}
