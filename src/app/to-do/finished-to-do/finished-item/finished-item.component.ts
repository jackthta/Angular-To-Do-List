import { Component, Input } from '@angular/core';

import { DatabaseHistoryService } from 'src/app/database/database-history.service';

@Component({
  selector: 'app-finished-item',
  templateUrl: './finished-item.component.html',
  styleUrls: ['./finished-item.component.scss']
})
export class FinishedItemComponent {
  @Input() finTask: any;
  @Input() index: number;

  constructor(private databaseHistoryService: DatabaseHistoryService) {}

  onDeleteTask() {
    this.databaseHistoryService.deleteFinishedTaskInDatabase(this.finTask.id);
  }
}
