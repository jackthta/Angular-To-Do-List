import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TodosService {
  toDoArray: string[] = ["Test", "Test", "Test"];

  constructor() {}

  addToDo = (toDoText: string) => {
    this.toDoArray.push(toDoText);
  };

  deleteToDo = (itemIndex: number) => {
    this.toDoArray.splice(itemIndex, 1);
  };
}
