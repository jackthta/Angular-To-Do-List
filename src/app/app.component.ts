//CHECK FILES THAT END IN JS IF YOU RUN INTO SINGLETON SERVICES NOT WORKING.
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import keys from '../private/keys';
import { AuthService } from './auth/auth.service';
import { AuthLoginService } from './auth/auth-login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    constructor(private authService: AuthService, private authLogin: AuthLoginService, private route: Router) {
    }

    ngOnInit() {
      firebase.initializeApp(keys.FirebaseConfig);

      //Auto-login user if they have an existing token cached.
      firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            this.authLogin.getUserToken(user)
              .then(
                (token) => {
                  this.authService.setToken(token);
                }
              )
              .catch(
                (error) => console.log("Error retrieving user token on init.", error)
              );
            //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
          }
        }
      );
    }
}
