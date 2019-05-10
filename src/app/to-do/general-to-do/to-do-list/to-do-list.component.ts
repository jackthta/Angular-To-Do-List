import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

import { DatabaseService } from 'src/app/database/database.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit, OnDestroy {
  constructor(private databaseService: DatabaseService) {}

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          //Upon successful update to database, these events will fire and apply proper
          //modifications to the in-app array which will update the view.
          let taskRef = firebase.database().ref(`user_tasks/${user.uid}`);
          taskRef.on('child_added', (child) => this.databaseService.addTaskToApp(child.val())); //Note that this populates the taskArray upon to-do-list component initialization.
          taskRef.on('child_removed', (child) => {
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
          taskRef.on('child_changed', (child) => {
            let taskList = this.databaseService.getTaskList();
            for (let task in taskList) {
              if (taskList[task].id === child.val().id) {
                this.databaseService.updateTaskStatusInApp(child.val().isComplete, parseInt(task));
              }
            }
          });
        }
      }
    );
  }

  ngOnDestroy() {}
}

/*  NOTE TO SELF
    The toDoArray in this class is given a REFERENCE
    to the toDoArray in TodosService. If the array is REASSIGNED in the service,
    then the toDoArray instance in this class will not automatically
    reassign itself to the new array. Therefore to modify the array
    in the service so that the changes can be heard here, you have to
    modify the toDoArray array in the service via splice and not filter.
*/