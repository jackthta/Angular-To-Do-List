import { Component, OnInit, Input } from '@angular/core';

import { TodosService } from '../todos.service';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {
  @Input() toDoText:string;
  @Input() index:number;

  isFinished:boolean = false;

  constructor(private todosService: TodosService) {}
  ngOnInit() {}

  onDeleteToDo = () => {
    this.todosService.deleteToDo(this.index);
  };

  onFinished = () => {
    this.isFinished = !this.isFinished;
  };

}
