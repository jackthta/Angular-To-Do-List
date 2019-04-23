import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthLoginService {
  constructor() {}

  async getUserToken(user: firebase.User) {
    let userToken: string;
    await user.getIdToken()
      .then(
        (token: string) => userToken = token
      )
      .catch(
        (error: string) => console.log("Error retrieving user token.", error)
      );
    return userToken;
  }

  async loginWithEmail(email: string, password: string) {
    return await firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (results) => this.getUserToken(results.user)
      )
      .catch(
        (error) => {
          console.log("There was an error when signing in with Email/Password.", error);
        }
      );
  }

  async loginWithGoogle() {
    let GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
    return await firebase.auth().signInWithPopup(GoogleAuthProvider)
      .then(
        (results) => this.getUserToken(results.user)
      )
      .catch(
        (error) => {
          console.log("There was an error when signing in with Google.", error);
        }
      );
  }
}


// NOTES:
// Hacky fix to obtain the access token. However, I'm not sure if it's the best practice
          // to use access tokens anymore.
          /*
          let credentialObject: firebase.auth.AuthCredential = results.credential;
          let accessToken: string;
          for (let value in credentialObject) {
            if (value === "accessToken") {
              accessToken = credentialObject[value];
            }
          }
          console.log(accessToken);
          */