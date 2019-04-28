import { Component, OnInit, Input } from '@angular/core';

import { DatabaseService } from 'src/app/database/database.service';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {
  @Input() task;
  @Input() index:number;

  constructor(private databaseService: DatabaseService) {}
  ngOnInit() {}

  onDeleteToDo = () => {
    this.databaseService.deleteToDo(this.index, this.task.id);
  };

  onFinished = () => {
    //this.isFinished = !this.isFinished;
    //Update database and view.
  };

}
