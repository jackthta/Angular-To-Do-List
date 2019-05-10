import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';

import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DatabaseHistoryService {
  finishedTaskArray = []

  constructor(private authService: AuthService) {}

  getFinishedTaskList() {
    return this.finishedTaskArray;
  }

  addFinishedTask(finishedTask: any) {
    this.finishedTaskArray[this.finishedTaskArray.length] = finishedTask;
  }

  deleteFinishedTaskInDatabase(pushKey: number, uid: string = this.authService.getUser().uid) {
    firebase.database().ref(`fin_user_tasks/${uid}/${pushKey}`).remove()
      .then(
        () => console.log("Successfully removed finished task.")
      )
      .catch(
        (error) => console.log("Error removing finished task in database.", error)
      );
    }

  deleteFinishedTaskInApp(itemIndex: number) {
    this.finishedTaskArray.splice(itemIndex, 1);
  }
}
