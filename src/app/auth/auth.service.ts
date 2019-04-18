import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = undefined;

  constructor() {}
  
  registerUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          console.log("Succesfully registered user.");
        }
      )
      .catch(
        (error) => {
          console.log("Error registering user.", error);
        }
      )
  }

  loginUser(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        () => {
          console.log("Succesfully logged user in.");

          firebase.auth().currentUser.getIdToken()
            .then(
              (token: string) => this.token = token
            );
        }
      )
      .catch(
        (error) => {
          console.log("Error logging user in.", error);
        }
      );
  }

  logoutUser() {
    firebase.auth().signOut()
      .then(
        () => {
          console.log("Succesfully logged user out.");
          this.token = undefined;
        }
      )
      .catch(
        (error) => {
          console.log("Error logging user out.", error);
        }
      );
  }

  isAuthenticated() {
    return this.token !== undefined;
  }
}
