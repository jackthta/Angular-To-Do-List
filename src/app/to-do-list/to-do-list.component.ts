import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  toDoArray: string[] = [];

  constructor() {}
  ngOnInit() {}

  onAddedToDo = (toDoText: string) => {
    this.toDoArray.push(toDoText);
  };

  onDeletedToDo = (itemIndex: number) => {
    this.toDoArray = this.toDoArray.filter((toDo, index) => index !== itemIndex);
  };

}
