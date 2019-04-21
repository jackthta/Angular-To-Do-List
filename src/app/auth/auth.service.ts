import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = undefined;

  constructor(private route: Router) {}
  
  registerUser(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          console.log("Succesfully registered user.");
          this.route.navigate(['/login']);
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

          this.route.navigate(['/']);
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
          this.route.navigate(['/']);
        }
      )
      .catch(
        (error) => {
          console.log("Error logging user out.", error);
        }
      );
  }

  isAuthenticated(): boolean {
    return this.token !== undefined;
  }
}
