import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DogApiService } from 'src/app/services/dog-api.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-sub-breed',
  templateUrl: './sub-breed.component.html',
  styleUrls: ['./sub-breed.component.scss']
})
export class SubBreedComponent implements OnInit {

  constructor(private route:ActivatedRoute,
              private dogApi: DogApiService,
              private notify: NzNotificationService,
              private routr: Router) { }
  subBreedList: any[] = [];
  searchedBreed: string = '';
  requestAlive: boolean = false;
  ngOnInit(): void {
    this.searchedBreed = this.route.snapshot.params['breed'];
    this.dogApi.getSubBreedList(this.searchedBreed).subscribe({
      next: (resp: any) => { 
        if (resp.status === 1000) {
          resp.subreads.forEach((e: string) => {
            this.subBreedList.push({name: e, pipable: `${e}|${this.searchedBreed}`});
          });
         }
      },
      complete: () => { console.log('subbreed retrieving Completed') }, 
      error: (e: any) => { 
       console.log(e);
     } 
   });
  }

  setAsFavorite = (breedSubBreed: string) => {
    this.requestAlive = true;
    const splittedBreed = breedSubBreed.split('|');
    const breed = splittedBreed[0];
    const subBreed = splittedBreed[1];
    const email = JSON.parse(localStorage.getItem("email")!);
    this.dogApi.setAsFavoriteSubBreed(breed, subBreed, email).subscribe({
      next: (resp: any) => { 
        if (resp.status === 1000) {
          this.notify.create(
            'success',
            'Adopted!',
            resp.clientMessage
          );
          const favPay = {
            breed,
            subBreed
          }
        this.requestAlive = false;

        localStorage.setItem('favorite_subbreed', JSON.stringify(subBreed));
        localStorage.setItem('favorite_breed', JSON.stringify(breed));
          this.routr.navigateByUrl('/doghouse/breed');
          this.dogApi.publishFavorite(favPay);
        }
      },
      complete: () => { console.log('adopt proceess Completed') }, 
      error: (e: any) => { 
        this.requestAlive = false;
       if (e.error.status === 1012) {
         this.notify.create(
           'error',
           'Error',
           e.error.clientMessage
         );
       }
     } 
   });
  }

}
