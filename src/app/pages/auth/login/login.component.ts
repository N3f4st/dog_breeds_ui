import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  dogShelterPath: string = '../assets/images/dog-shelter.png';
  requestAlive: boolean = false;
  signForm!: FormGroup;
  signUpPassedEmail: string = '';

  constructor(private fb: FormBuilder,
              private as: AuthService,
              private routr: Router,
              private notify: NzNotificationService ) {
                this.signUpPassedEmail = this.routr.getCurrentNavigation()?.extras?.state?.['email'] || '';
              }

  submitForm(): void {
    if (this.signForm.valid) {
      this.changeFormControlStatus(false);
      this.as.login(this.signForm.value).subscribe({
         next: (resp: any) => { 
           if (resp.status === 1000) {
             const email = this.signForm.controls['email'].value; 
             this.signUpPassedEmail = ''
             this.placeLocalStorageAndNavigate(resp.token, email, resp.fullName);
            }
            this.changeFormControlStatus(true);
         },
         complete: () => { console.log('login proceess Completed') }, 
         error: (e: any) => { 
          if (e.error.status === 1009) {
            this.signForm.controls['password'].setValue('');
            this.notify.create(
              'error',
              'Signin Error',
              e.error.clientMessage
            );
          }
          this.changeFormControlStatus(true);
        } 
      });
    } else {
      this.checkFormControlValidity()
    }
  }

  changeFormControlStatus = (enabled: boolean) => {
    if (enabled) {
      this.signForm.controls['email'].enable();
      this.signForm.controls['password'].enable();
    } else {
      this.signForm.controls['email'].disable();
      this.signForm.controls['password'].disable();
    }
    this.requestAlive = !enabled;
  }

  checkFormControlValidity = () =>{
    Object.values(this.signForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  ngOnInit(): void {
    this.signForm = this.fb.group({
      email: [this.signUpPassedEmail, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
    this.changeFormControlStatus(true);
  }

  placeLocalStorageAndNavigate = (token: string, email: string, name: string) => {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('email', JSON.stringify(email));
    this.notify.create(
      'success',
      'Login',
      `Welcome ${name}!`
    );
    this.routr.navigateByUrl('/doghouse/breed');
  }

}
