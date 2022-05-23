import { NgModule } from "@angular/core";
import { Router, RouterModule, Routes } from "@angular/router";
import SharedModule from "../../shared.module";
import { LoginComponent } from "./login/login.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import es from '@angular/common/locales/es';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { NzButtonModule } from 'ng-zorro-antd/button';

registerLocaleData(es);
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
  providers: [{ provide: NZ_I18N, useValue: es_ES }],

  exports: [RouterModule]
})
export default class AuthModule { }