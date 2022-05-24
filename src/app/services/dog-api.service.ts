import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as e} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DogApiService {

  constructor(private http: HttpClient) { }
  public getBreedList() {
    return this.http.get(`${e.apiUrl}/breed/list`);
  }

}
