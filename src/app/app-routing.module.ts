import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./pages/auth/auth.module').then(m => m.default)
  },
  {
    path:'doghouse',
    loadChildren: () => import('./pages/common/common.module').then(m => m.default)
  },
  {
    path:'',
    loadChildren: () => import('./pages/common/common.module').then(m => m.default)
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
