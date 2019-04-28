import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { DatabaseService } from 'src/app/database/database.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  constructor(private databaseService: DatabaseService, private authService: AuthService) { }

  ngOnInit() {
    //If this works properly, maybe place this in the root app component.
    //Or maybe not because you'd want this listener to be applied 
    //specifically for this component. You'd want another listener for the to-do-history.
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          let taskRef = firebase.database().ref(`user_tasks/${user.uid}`);
          taskRef.on('child_added', (child) => {
            //console.log(child.val());
          });
        }
      }
    );
  }
}

/*  NOTE TO SELF
    The toDoArray in this class is given a REFERENCE
    to the toDoArray in TodosService. If the array is REASSIGNED in the service,
    then the toDoArray instance in this class will not automatically
    reassign itself to the new array. Therefore to modify the array
    in the service so that the changes can be heard here, you have to
    modify the toDoArray array in the service via splice and not filter.
*/