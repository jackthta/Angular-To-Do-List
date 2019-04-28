import { Injectable, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { AuthLoginService } from './auth-login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string = undefined;
  user = undefined;

  constructor(private route: Router, private authLogin: AuthLoginService) {}

  /* *
  *   Functions that deal with the login/out, register, and authentication status.
  * */
  
  registerUser(email: string, password: string): void {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        () => {
          console.log("Succesfully registered user.");
          this.route.navigate(['/login']);
        }
      )
      .catch(
        (error) => console.log("Error registering user.", error)
      )
  }

  async loginUser(method: string, email: string = undefined, password: string = undefined) {
    let userToken;

    method = method.toLowerCase();
    switch (method) {
      case "email":
        userToken = await this.authLogin.loginWithEmail(email, password);
      break;
      case "google":
        userToken = await this.authLogin.loginWithGoogle();
      break;
      case "facebook":
      break;
      default:
          console.log("Invalid login method.");
      break;
    }

    this.token = userToken;
    this.route.navigate(["/"]);
  }

  logoutUser(): void {
    firebase.auth().signOut()
      .then(
        () => {
          console.log("Succesfully logged user out.");
          this.token = undefined;
          this.route.navigate(['/']);
        }
      )
      .catch(
        (error) => console.log("Error logging user out.", error)
      );
  }

  getUser() {
    return this.user;
  }

  setUser(user) {
    this.user = user;
  }

  isAuthenticated(): boolean {
    return this.token !== undefined;
  }

  setToken(token): void {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }
}