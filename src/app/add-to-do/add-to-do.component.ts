import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-add-to-do",
  templateUrl: "./add-to-do.component.html",
  styleUrls: ["./add-to-do.component.scss"]
})
export class AddToDoComponent implements OnInit {
  toDoInput: string = "";
  hasNoText: boolean;

  @Output() newToDo = new EventEmitter<string>();

  constructor() { }
  ngOnInit() { }

  onAddToDo = () => {
    this.newToDo.emit(this.toDoInput);
  };

  checkValid = () => {
    this.hasNoText = this.toDoInput.length === 0;
    if (!this.hasNoText) {
      this.onAddToDo();
      this.toDoInput = "";
    }
  };
}
