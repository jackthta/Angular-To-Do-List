import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';

import keys from '../private/keys.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

    constructor() {}

    ngOnInit() {
      firebase.initializeApp(keys.FirebaseConfig);
    };
}
