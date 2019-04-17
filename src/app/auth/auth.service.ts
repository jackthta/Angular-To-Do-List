import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
}
