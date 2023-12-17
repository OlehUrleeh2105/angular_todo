import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  signIn(params: any): Observable<any> {
    return from(this.auth.signInWithEmailAndPassword(params.email, params.password));
  }

  signUp(params: any): Observable<any> {
    return from(
      this.auth.createUserWithEmailAndPassword(params.email, params.password)
        .then(() => {
          this.signIn(params);
        })
    );
  }

  signOut(): Observable<void> {
    return from(this.auth.signOut());
  }

  isAuthenticated(): Observable<boolean> {
    return this.auth.authState.pipe(
      map((user) => user !== null)
    );
  }

  getCurrentUserUID() {
    return this.auth.currentUser.then(user => {
      if (user) {
        return user.uid;
      } else {
        return null;
      }
    })
  }
}
