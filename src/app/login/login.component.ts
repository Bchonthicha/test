import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';

import { FirebaseService } from '../services/firebase.service';
import { Router, NavigationEnd } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  emailSignup: string;
  passwordSignup: string;
  constructor(private auth: AuthService, private firebaseService: FirebaseService, private router: Router, private cookieService: CookieService) {
    let user = this.firebaseService.userLogin;
    // console.log(user);
    let cookieValue_email = this.cookieService.get('email');
    let cookieValue_pass = this.cookieService.get('password');
    // console.log(cookieValue_email);

    if (cookieValue_email != "UNKNOWN") {

      this.auth.emailLogin(cookieValue_email, cookieValue_pass);

    }
  }


  ngOnInit() {

  }

  login() {

    this.auth.emailLogin(this.emailSignup, this.passwordSignup);


  }

  logout() {
    this.cookieService.set('email','UNKNOWN');
    this.cookieService.set('password','UNKNOWN');
    this.auth.signOut();
  }
}
