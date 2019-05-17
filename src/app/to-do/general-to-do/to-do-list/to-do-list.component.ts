import { Component } from '@angular/core';

import { DatabaseService } from 'src/app/database/database.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent {
  constructor(private databaseService: DatabaseService) {}
}