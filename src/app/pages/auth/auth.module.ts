import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import SharedModule from "../../shared.module";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignUpComponent
  }
]

@NgModule({
  imports: [
      SharedModule, 
      RouterModule.forChild(routes),
      FormsModule,
      NzFormModule,
      NzInputModule,
      NzTypographyModule,
      NzButtonModule,
      ReactiveFormsModule
    ],
  declarations: [LoginComponent, SignUpComponent],
  providers: [],

  exports: [RouterModule]
})
export default class AuthModule { }