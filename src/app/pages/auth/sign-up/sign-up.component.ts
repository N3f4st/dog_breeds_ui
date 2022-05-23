import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  
  adoptMePath: string = '../assets/images/adopt-me.png';
  requestAlive: boolean = false;

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder,
              private as: AuthService,
              private routr: Router,
              private notify: NzNotificationService ) {}

  submitForm(): void {
    if (this.signUpForm.valid) {
      this.changeFormControlStatus(false);
      this.as.signup(this.signUpForm.value).subscribe({
         next: (resp: any) => { 
           if (resp.status === 1000) {
            this.notify.create(
              'success',
              'Login',
              resp.clientMessage
            );
            const formEmail = this.signUpForm.controls['email'].value;
            this.routr.navigateByUrl('auth/login', {state: {email: formEmail}});
            }
            this.changeFormControlStatus(true);
         },
         complete: () => { console.log('login proceess Completed') }, 
         error: (e: any) => { 
          if (e.error.status === 1012) {
            this.signUpForm.controls['email'].setValue('');
            this.notify.create(
              'error',
              'Signup Error',
              e.error.clientMessage,
              { nzDuration: 10000 }
            );
          }
          this.changeFormControlStatus(true);
        } 
      });
    } else {
      this.checkFormControlValidity()
    }
  }

  updateConfirmValidator(): void {
    this.signUpForm.controls['checkPassword'].updateValueAndValidity();
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.signUpForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };


  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidator]],
      name: [null, [Validators.required]]
    });
  }

  checkFormControlValidity = () =>{
    Object.values(this.signUpForm.controls).forEach(control => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
  }

  changeFormControlStatus = (enabled: boolean) => {
    if (enabled) {
      this.signUpForm.controls['email'].enable();
      this.signUpForm.controls['password'].enable();
      this.signUpForm.controls['checkPassword'].enable();
      this.signUpForm.controls['name'].enable();
    } else {
      this.signUpForm.controls['email'].disable();
      this.signUpForm.controls['password'].disable();
      this.signUpForm.controls['checkPassword'].disable();
      this.signUpForm.controls['name'].disable();
    }
    this.requestAlive = !enabled;
  }

}
