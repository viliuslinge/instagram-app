import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

  user: Observable<any | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState
      .switchMap(
        user => {
          if (user) {
            console.log('user');
            return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
          } else {
            console.log('null');
            return Observable.of(null);
          }
        }
      );
  }

  emailSignUp(email: string, name: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
    .then(
      user => {
        return this.updateUserData(user);
      }
    );
  }

  emailSignIn(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signOut() {
    this.afAuth.auth.signOut().then(
      () => this.router.navigate(['/'])
    );
  }

  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: any = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || 'Guest',
      photoURL: user.photoURL || 'https://goo.gl/8kwFW5',
    };
    return userRef.set(userData, {merge: true});
  }
}
