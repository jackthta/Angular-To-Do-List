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
    //Check if user is authenticated. If it is, add to database.
    if (this.authService.isAuthenticated()) {
      this.addTaskToDatabase(toDoText, this.authService.getUser().uid);
    } else {
      //This is for non-authenticated users.
      let nonAuthTaskObj = {
        id: this.getTaskListLength(this.taskArray),
        task: toDoText,
        isComplete: false
      };
      this.addTaskToApp(nonAuthTaskObj);
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
  }

  addTaskToApp(task) {
    let taskObj = {
      id: task.id,
      task: task.task,
      isComplete: task.isComplete
    };
    this.taskArray[this.getTaskListLength(this.taskArray)] = taskObj;
  }

  deleteToDo(itemIndex: number, pushKey: number = undefined) {
    //Check if user is authenticated, if so delete the task in database.
    if (this.authService.isAuthenticated()) {
      this.deleteTaskInDatabase(pushKey, this.authService.getUser().uid);
    } else {
      //This is for non-authenticated users.
      this.deleteTaskinApp(itemIndex);
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

  deleteTaskinApp(itemIndex: number) {
    this.taskArray.splice(itemIndex, 1);
  }

  updateTask(status: boolean, itemIndex: number, pushKey: number = undefined) {
    if (this.authService.isAuthenticated()) {
      this.updateTaskInDatabase(status, pushKey, this.authService.getUser().uid);
    } else {
      //This is for non-authenticated users.
      this.updateTaskInApp(status, itemIndex);
    }
  }

  updateTaskInDatabase(status: boolean, pushKey: number, uid: string) {
    firebase.database().ref(`user_tasks/${uid}/${pushKey}`).update({ isComplete: status })
      .then(
        () => console.log("Updated task.")
      )
      .catch(
        (error) => console.log("Error updating task.", error)
      );
  }

  updateTaskInApp(status: boolean, itemIndex: number) {
    this.taskArray[itemIndex].isComplete = status;
  }

}
