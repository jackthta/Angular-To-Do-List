import { Component, OnInit } from "@angular/core";

import { DatabaseService } from 'src/app/database/database.service';

@Component({
  selector: "app-add-to-do",
  templateUrl: "./add-to-do.component.html",
  styleUrls: ["./add-to-do.component.scss"]
})
export class AddToDoComponent implements OnInit {
  toDoInput: string = "";
  hasNoText: boolean;

  constructor(private databaseService: DatabaseService) { }
  ngOnInit() {}

  onAddToDo = () => {
    this.databaseService.addToDo(this.toDoInput);
  };

  onCheckValid = () => {
    this.hasNoText = this.toDoInput.length === 0;
    if (!this.hasNoText) {
      this.onAddToDo();
      this.toDoInput = "";
    }
  };
}
