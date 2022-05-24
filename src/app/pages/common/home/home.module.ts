
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SubBreedComponent } from "../home/sub-breed/sub-breed.component";

import { NzListModule } from 'ng-zorro-antd/list';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { BreedComponent } from "../home/breed/breed.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from "ng-zorro-antd/icon";

import { CommonModule } from "@angular/common";

import { AuthGuard } from "src/app/guards/auth.guard";
import { DogApiService } from "src/app/services/dog-api.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StatusInterceptor } from "src/app/interceptors/status.interceptor";
import { TokenInterceptor } from "src/app/interceptors/token.interceptor";
import { GetImgaSrcPipe } from "src/app/pipes/get-imga-src.pipe";


const routes : Routes = [

  {
    path: ':breed/sub-breed',
    component: SubBreedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'breed',
    component: BreedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: BreedComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    component: BreedComponent,
    canActivate: [AuthGuard]
  }
]

@NgModule({
  imports: [
     RouterModule.forChild(routes),
     NzListModule,
     NzGridModule,
     NzLayoutModule,
     CommonModule,
     HttpClientModule, 
     NzImageModule,
     NzCardModule,
     NzButtonModule,
     NzIconModule
    ],
  declarations: [ SubBreedComponent, BreedComponent, GetImgaSrcPipe],
  providers: [
    DogApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: StatusInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  exports: [RouterModule]
})
export default class HomeModule { }