import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { DatabaseHistoryService } from 'src/app/database/database-history.service';

@Component({
  selector: 'app-to-do-history',
  templateUrl: './to-do-history.component.html',
  styleUrls: ['./to-do-history.component.scss']
})
export class ToDoHistoryComponent implements OnInit {
  constructor(private databaseHistoryService: DatabaseHistoryService) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          let finTaskRef = firebase.database().ref(`fin_user_tasks/${user.uid}`);
          finTaskRef.on('child_added', (child) => this.databaseHistoryService.addFinishedTask(child.val()));
          finTaskRef.on('child_removed',
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
    );
  }
}
