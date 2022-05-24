
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import SharedModule from "../../shared.module";
import { HomeComponent } from "./home/home.component";
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from "ng-zorro-antd/icon";

const routes : Routes = [
  {
    path:'',
    component: HomeComponent,
    loadChildren: () => import('./home/home.module').then(m => m.default)
  },
  {
    path:'',
    component: HomeComponent,
    loadChildren: () => import('./home/home.module').then(m => m.default)
  }
]

@NgModule({
  imports: [
     SharedModule,
     RouterModule.forChild(routes),
     NzLayoutModule,
     NzButtonModule,
     NzIconModule
    ],
  declarations: [HomeComponent],
  providers: [],
  exports: [RouterModule]
})
export default class CommonModule { }