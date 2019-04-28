import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  taskArray = ["Test", "Test", "Test"];

  constructor(private authService: AuthService, private databaseService: DatabaseService) {}

  addToDo(toDoText: string) {
    this.taskArray.push(toDoText);

    //Check if user is authenticated. If it is, save to DB. If it isn't, don't save.
    /*
    if (this.authService.isAuthenticated()) {
      this.databaseService.addTask(toDoText);
    }
    */
  };

  deleteToDo(itemIndex: number) {
    this.taskArray.splice(itemIndex, 1);
  };

  addTaskAUTHED(task: string, uid = this.authService.getUser().uid) {
    let taskKey = firebase.database().ref().push().key;
    let taskObj = {
      task: task,
      isComplete: false
    };

    firebase.database().ref(`user_tasks/${uid}/${taskKey}`).update(taskObj);
  }
}
