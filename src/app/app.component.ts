//CHECK FILES THAT END IN JS IF YOU RUN INTO SINGLETON SERVICES NOT WORKING.
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import keys from '../private/keys';
import { AuthService } from './auth/auth.service';
import { AuthLoginService } from './auth/auth-login.service';
import { DatabaseService } from './database/database.service';
import { DatabaseHistoryService } from './database/database-history.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  taskRef = undefined;
  finTaskRef = undefined;

  constructor(
    private authService: AuthService,
    private authLogin: AuthLoginService,
    private route: Router,
    private databaseService: DatabaseService,
    private databaseHistoryService: DatabaseHistoryService
  ) {}

  ngOnInit() {
    firebase.initializeApp(keys.FirebaseConfig);

    //Auto-login user if they have an existing token cached.
    //Enable child event listeners for to-do-list and to-do-history if user exists.
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          //Authentication and login processes.
          this.authService.setUser(user);
          this.authLogin.getUserToken(user)
            .then((token) => this.authService.setToken(token))
            .catch((error) => console.log("Error retrieving user token on init.", error));

          //Enable child event listeners for to-do-list and to-do-history components.
          this.enableToDoListChildEventListeners(user);
          this.enableToDoHistoryChildEventListeners(user);
        }
      }
    );
  }

  ngOnDestroy() {
    //Turn off all child event listeners for task/finTask refs.
    this.taskRef.off();
    this.finTaskRef.off();
  }

  enableToDoListChildEventListeners(user: any) {
    if (user) {
      //Upon successful update to database, these events will fire and apply proper
      //modifications to the in-app array which will update the view.
      this.taskRef = firebase.database().ref(`user_tasks/${user.uid}`);
      this.taskRef.on('child_added', (child) => this.databaseService.addTaskToApp(child.val())); //Note that this populates the taskArray upon to-do-list component initialization.
      this.taskRef.on('child_removed', (child) => {
        //ALG: Find the index of the removed child to update the view.
        //1. Get the task array
        //2. Search through and find the task in the array that matches the ID of the child
        //3. Execute the deleteTaskInApp function with the founded index.
        let taskList = this.databaseService.getTaskList();
        for (let task in taskList) {
          if (taskList[task].id === child.val().id) {
            this.databaseService.deleteTaskInApp(parseInt(task));
          }
        }
      });
      this.taskRef.on('child_changed', (child) => {
        let taskList = this.databaseService.getTaskList();
        for (let task in taskList) {
          if (taskList[task].id === child.val().id) {
            this.databaseService.updateTaskStatusInApp(child.val().isComplete, parseInt(task));
          }
        }
      });
    }
  }

  enableToDoHistoryChildEventListeners(user: any) {
    if (user) {
      this.finTaskRef = firebase.database().ref(`fin_user_tasks/${user.uid}`);
      this.finTaskRef.on('child_added', (child) => this.databaseHistoryService.addFinishedTask(child.val()));
      this.finTaskRef.on('child_removed',
        (child) => {
          let finTaskList = this.databaseHistoryService.getFinishedTaskList();
          for (let task in finTaskList) {
            if (finTaskList[task].id === child.val().id) {
              this.databaseHistoryService.deleteFinishedTaskInApp(parseInt(task));
            }
          }
        });
    }
  }
}