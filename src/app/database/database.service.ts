import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { AuthService } from '../auth/auth.service';
import { DatabaseHistoryService } from './database-history.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  taskArray = [];

  constructor(private authService: AuthService, private databaseHistoryService: DatabaseHistoryService) {}

  getTaskList() {
    return this.taskArray;
  }

  getTaskListLength(tasklist) {
    return Object.keys(tasklist).length;
  }

  //This may not be needed.
  populateTaskList(uid: string) {
    //Ensure that the taskArray of the session is empty.
    this.taskArray.length = 0;

    firebase.database().ref(`user_tasks/${uid}/`).once("value")
      .then(
        (userTaskArray) => {
          for (let task in userTaskArray.val()) {
            this.taskArray.push(userTaskArray.val()[task]);
            console.log(userTaskArray.val()[task]);
          }
        }
      )
      .catch(
        (error) => console.log("Error obtaining authenticated user's task list.", error)
      );
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
      this.deleteTaskInApp(itemIndex);
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

  deleteTaskInApp(itemIndex: number) {
    this.taskArray.splice(itemIndex, 1);
  }

  updateTaskStatus(status: boolean, itemIndex: number, pushKey: number = undefined) {
    if (this.authService.isAuthenticated()) {
      this.updateTaskStatusInDatabase(status, pushKey, this.authService.getUser().uid);
    } else {
      //This is for non-authenticated users.
      this.updateTaskStatusInApp(status, itemIndex);
    }
  }

  updateTaskStatusInDatabase(status: boolean, pushKey: number, uid: string) {
    firebase.database().ref(`user_tasks/${uid}/${pushKey}`).update({ isComplete: status })
      .then(
        () => console.log("Updated task.")
      )
      .catch(
        (error) => console.log("Error updating task.", error)
      );
  }

  updateTaskStatusInApp(status: boolean, itemIndex: number) {
    this.taskArray[itemIndex].isComplete = status;
  }

  //This function will only execute if the user is authenticated.
  moveFinishedTask(itemIndex: number, pushKey: number, uid: string = this.authService.getUser().uid) {
    let taskRef = firebase.database().ref(`user_tasks/${uid}/${pushKey}/`);
    let finishedTaskRef = firebase.database().ref(`fin_user_tasks/${uid}/${pushKey}/`);

    taskRef.once('value')
      .then(
        (snapshot) => {
          //Move finished task to fin_user_task parent node in database.
          finishedTaskRef.update(snapshot.val())
            .then(
              () => console.log("Successfully moved finished task!")
            )
            .catch(
              (error) => console.log("Error moving finished task.", error)
            );

          //Remove finished task from user_task parent node.
          //Note that the child_removed event will active which will remove it from this array.
          this.deleteTaskInDatabase(pushKey, uid);
        }
      )
      .catch(
        (error) => console.log("Error retrieving finished task data.", error)
      );
  }

}
