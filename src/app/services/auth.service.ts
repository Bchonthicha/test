import { User } from './../inteterfaces/user';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFirestoreDocument, AngularFirestore } from 'angularfire2/firestore';
@Injectable()
export class AuthService {
  authState: any = null;
  userRef: AngularFirestoreDocument<User>;
  constructor(private afAuth: AngularFireAuth,
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
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user;
        this.updateUserData();
        this.router.navigate(['dashboard']);
      })
      .catch(error => console.log(error));
  }
  emailLogin(email: string, password: string) {
    console.log("I am logging in");
    this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((user) => {
        this.authState = user
        this.updateUserData()
        this.router.navigate(['dashboard'])
      })
      .catch(error => console.log(error));
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