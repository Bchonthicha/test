import { User } from './../inteterfaces/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
import { FirebaseService } from '../services/firebase.service';
import { CookieService } from 'ngx-cookie-service';
@Injectable()
export class AuthService {
  cookieValue = 'UNKNOWN';
  authState: any = null;
  userRef: AngularFirestoreDocument<User>;
  constructor(private afAuth: AngularFireAuth, private firebaseService: FirebaseService, private cookieService: CookieService,
    private afs: AngularFirestore,
    private router: Router) {
    this.afAuth.authState.subscribe((auth) => {
      this.authState = auth
    });
  }
  get authenticated(): boolean {
    return this.authState !== null;
  }
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }
  get currentUserObservable(): any {
    return this.afAuth.authState
  }
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserDisplayName(): string {
    if (!this.authState) {
      return 'Guest'
    } else {
      return this.authState['displayName'] || 'User without a Name'
    }
  }
  emailSignUp(email: string, password: string) {


    this.cookieService.set('password', password);
    this.cookieValue = this.cookieService.get('password');
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
        this.cookieService.set('email', email);
        this.cookieValue = this.cookieService.get('email');

        // this.firebaseService.userLogin == email;
        this.router.navigate(['dashboard']);
      })
      // .catch(error => console.log(error));
      .catch(error => alert(error));
  }
  emailLogin(email: string, password: string) {
    console.log(password);
    this.cookieService.set('password', password);
    this.cookieValue = this.cookieService.get('password');
    console.log("I am logging in");
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData()
        // this.firebaseService.userLogin = email;
        this.cookieService.set('email', email);
        this.cookieValue = this.cookieService.get('email');


        this.router.navigate(['dashboard'])
      })
      // .catch(error => console.log(error));
      .catch(error => alert(error));
  }
  resetPassword(email: string) {
    const fbAuth = firebase.auth();
    return fbAuth.sendPasswordResetEmail(email)
      .then(() => console.log('email sent'))
      .catch((error) => console.log(error))
  }
  getCurrentLoggedIn() {
    this.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigate(['/'])
      }
    });
  }
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/'])
    this.cookieValue = 'UNKNOWN';
    this.cookieService.set('email', 'UNKNOWN');
    this.cookieService.set('password', 'UNKNOWN');
    console.log(this.cookieService.get('email'));

  }
  private updateUserData(): void {

    const user = {
      email: this.authState.email,
      // name: this.authState.displayName
    }

    this.userRef = this.afs.doc(`users/${this.currentUserId}`)
    this.userRef.set(user, { merge: true })
  }

}