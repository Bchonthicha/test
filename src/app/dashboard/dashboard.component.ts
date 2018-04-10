import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { User } from './../inteterfaces/user';

import { CookieService } from 'ngx-cookie-service';
import { FirebaseService } from '../services/firebase.service';
import { Observable } from 'rxjs/Observable';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userCollection: any;
  // Firestore database observable
  thisUser: any;
  // user: firebase.User;
  userRef: AngularFirestoreDocument<User>
  userObservable: Observable<User>

  public currentURL;
  constructor(private afs: AngularFirestore, private route: Router, private auth: AuthService,private firebaseService: FirebaseService,private cookieService:CookieService) {
    // this.user = auth.currentUser;
    // console.log(this.user)

    let cookieValue = this.cookieService.get('email');
    console.log(cookieValue);
    this.thisUser = cookieValue;
    /*
    console.log("ชั่ยมั่ยชั่ย?" + this.auth.currentUserId)      //key from login

    //get email show

    this.userRef = this.afs.doc<User>(`/users/${this.auth.currentUserId}`)
    let test = this.userRef.valueChanges();

    test.forEach(data => {
      console.log(data.email);
      this.thisUser = data.email
      this.firebaseService.userLogin = this.thisUser;
    })
  // 
*/
     
  }


  ngOnInit() {

    this.currentURL = this.route.url;
    this.route.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.currentURL = this.route.url;
      }
    });
  }

  signOut() {
    this.cookieService.set('email','UNKNOWN');
    this.cookieService.set('password','UNKNOWN');
    this.firebaseService.userLogin = "";
    this.auth.signOut();
  }

}
