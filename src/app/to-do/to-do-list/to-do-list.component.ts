import { Component, OnInit } from '@angular/core';

import { TodosService } from '../todos.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  toDoArray: string[] = [];

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.toDoArray = this.todosService.toDoArray;
  } 
}

/*  NOTE TO SELF 
    The toDoArray in this class is given a REFERENCE
    to the toDoArray in TodosService. If the array is REASSIGNED in the service,
    then the toDoArray instance in this class will not automatically
    reassign itself to the new array. Therefore to modify the array
    in the service so that the changes can be heard here, you have to
    modify the toDoArray array in the service via splice and not filter.
*/