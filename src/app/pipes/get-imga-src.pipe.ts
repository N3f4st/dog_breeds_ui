import { Pipe, PipeTransform } from '@angular/core';
import { DogApiService } from '../services/dog-api.service';

@Pipe({
  name: 'getImgaSrc'
})
export class GetImgaSrcPipe implements PipeTransform {

  constructor(private dogApi: DogApiService) {}
  async transform(sb: string): Promise<String> {
    const splittedBreed = sb.split('|');
    const breed = splittedBreed[0];
    const subBreed = splittedBreed[1];
    const pipedUrl: string = await this.getImageFromServer(subBreed, breed).then((url: any) => url);
    return pipedUrl;
  }

  getImageFromServer(breed: string, subBreed: string) {
    return new Promise((resolve) => {
      this.dogApi.getRandomSubBreedImage(breed, subBreed).subscribe({
        next: (resp: any) => { 
          resolve(resp.url);
        },
        complete: () => { return '' }, 
        error: (e: any) => { 
         resolve('../../../assets/images/empty.png');
       } 
     });
    });
  }

}
