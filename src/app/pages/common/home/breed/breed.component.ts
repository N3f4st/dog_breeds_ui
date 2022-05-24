import { Component, OnInit } from '@angular/core';
import { DogApiService } from 'src/app/services/dog-api.service';

@Component({
  selector: 'app-breed',
  templateUrl: './breed.component.html',
  styleUrls: ['./breed.component.scss']
})
export class BreedComponent implements OnInit {

  constructor(private dogApi: DogApiService) { }
  dogPawPath: string = '../../assets/images/paw.png'
  favoriteSubBreedPath: string = '../../assets/images/dog-house.png';
  favoriteSubBreedMessage: string = "Looks like you haven't selected a favorite breed to adopt yet. Please, go to the sub-breed list and pick one :)";
  loading = true;
  breedList: any[] = [];
  change(): void {

  }

  ngOnInit(): void {
    this.dogApi.getBreedList().subscribe({
      next: (resp: any) => { 
        if (resp.status === 1000) {
          this.breedList = this.getKeys(resp.breeds);
          this.loading = false;
         }
      },
      complete: () => { console.log('login proceess Completed') }, 
      error: (e: any) => { 
       console.log(e);
       this.loading = false;
     } 
   });
  }

  getKeys =(obj: any): object[] => {
    let keys = [];
    for(let k in obj){
      const subBreedQty = obj[k].length === 0 ? '' : `see ${obj[k].length} sub-breeds`
      keys.push({name: k, subBreedQty});
    }
    console.log(keys)
    return keys;
 }

}
