import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  dogShelterPath: string = '../../../assets/images/dog-shelter.png';

  constructor(private as: AuthService,
              private _routr: Router) { }

  ngOnInit(): void {
  }
  logOut = () => {
    this.as.LogOut();
    this._routr.navigate(['/auth/login']);

  }

}
