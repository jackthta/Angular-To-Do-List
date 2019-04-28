import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  taskArray = [];

  constructor(private authService: AuthService) {}

  getTaskList() {
    return this.taskArray;
  }

  getTaskListLength(tasklist) {
    return Object.keys(tasklist).length;
  }

  addTask(toDoText: string) {
    //Check if user is authenticated. If it is, add to DB.
    if (this.authService.isAuthenticated()) {
      this.addTaskToDatabase(toDoText, this.authService.getUser().uid);
    } else {
      //This is for non-authenticated users.
      let nonAuthTaskObj = {
        id: this.getTaskListLength(this.taskArray),
        task: toDoText,
        isComplete: false
      };
      this.taskArray[this.getTaskListLength(this.taskArray)] = nonAuthTaskObj;
    }
  };

  addTaskToDatabase(task: string, uid: string) {
    let newTaskRef = firebase.database().ref(`user_tasks/${uid}/`).push();
    let newTaskObj = {
      id: newTaskRef.key,
      task,
      isComplete: false
    };

    //Update database array.
    newTaskRef.update(newTaskObj)
      .then(
        () => console.log("Successfully added task.")
      )
      .catch(
        (error) => console.log("Error adding task.", error)
      );
    //Update in-app array.
    this.taskArray[this.getTaskListLength(this.taskArray)] = newTaskObj;
  }

  deleteToDo(itemIndex: number, pushKey: number = undefined) {
    this.taskArray.splice(itemIndex, 1);

    if (this.authService.isAuthenticated()) {
      this.deleteTaskInDatabase(pushKey, this.authService.getUser().uid);
    }
  };

  deleteTaskInDatabase(pushKey: number, uid: string) {
    firebase.database().ref(`user_tasks/${uid}/${pushKey}`).remove()
      .then(
        () => console.log("Successfully deleted task.")
      )
      .catch(
        (error) => console.log("Error deleting task.", error)
      );
  }

}
