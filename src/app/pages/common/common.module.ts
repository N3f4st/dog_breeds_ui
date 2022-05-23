
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import SharedModule from "../../shared.module";
import { HomeComponent } from "./home/home.component";
import { SubBreedComponent } from "./sub-breed/sub-breed.component";

const routes : Routes = [
  {
    path:'home',
    component: HomeComponent
  },
  {
    path: 'sub-breed',
    component: SubBreedComponent
  }
]

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  declarations: [HomeComponent, SubBreedComponent],
  exports: [RouterModule]
})
export default class CommonModule { }