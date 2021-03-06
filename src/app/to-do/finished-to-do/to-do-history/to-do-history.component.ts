import { Component } from '@angular/core';

import { DatabaseHistoryService } from 'src/app/database/database-history.service';

@Component({
  selector: 'app-to-do-history',
  templateUrl: './to-do-history.component.html',
  styleUrls: ['./to-do-history.component.scss']
})
export class ToDoHistoryComponent {
  constructor(private databaseHistoryService: DatabaseHistoryService) {}
}
