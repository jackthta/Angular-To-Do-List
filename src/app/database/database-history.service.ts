import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseHistoryService {
  finishedTaskArray = []

  constructor() {}

  addFinishedTask(finishedTask: any) {
    this.finishedTaskArray[this.finishedTaskArray.length] = finishedTask;
  }
}
