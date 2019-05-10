import { Component, OnInit, Input } from '@angular/core';

import { DatabaseService } from 'src/app/database/database.service';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {
  @Input() task: any;
  @Input() index: number;

  constructor(private databaseService: DatabaseService, private authService: AuthService) {}
  ngOnInit() {}

  onDeleteTask() {
    this.databaseService.deleteToDo(this.index, this.task.id);
  };

  onMoveTask() {
    this.databaseService.moveFinishedTask(this.index, this.task.id);
  }

  onFinishedTask() {
    this.databaseService.updateTaskStatus(!this.task.isComplete, this.index ,this.task.id);
  };

}
