import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as e} from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DogApiService {

  private favoriteBreedBH: BehaviorSubject<string> = new BehaviorSubject<any>({});
  favoriteBreedOb: Observable<any> = this.favoriteBreedBH.asObservable();

  constructor(private http: HttpClient) { }
  publishFavorite(fav: any) {
    this.favoriteBreedBH.next(fav);
  }
  public getBreedList() {
    return this.http.get(`${e.apiUrl}/breed/list`);
  }

  public getSubBreedList(breed: string) {
    return this.http.get(`${e.apiUrl}/sub-bread/${breed}/list`);
  }

  public getRandomSubBreedImage(breed: string, subBreed: string) {
    return this.http.get(`${e.apiUrl}/${breed}/sub-bread/${subBreed}/random-image`);
  }

  public setAsFavoriteSubBreed(breed: string, subBreed: string, email: string) {
    const favPay = {
      breed: breed,
      subBreed: subBreed,
      email: email
    }
    return this.http.put(`${e.apiUrl}/set-as-favorite-breed`, favPay);
  }
}
