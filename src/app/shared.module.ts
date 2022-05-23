import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { CommonModule } from '@angular/common';  

@NgModule({
  imports:[ReactiveFormsModule, NzNotificationModule, CommonModule],
  exports:[ReactiveFormsModule, NzNotificationModule, CommonModule]
})
export default class SharedModule { };