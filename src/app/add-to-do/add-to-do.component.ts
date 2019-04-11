import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-to-do',
  templateUrl: './add-to-do.component.html',
  styleUrls: ['./add-to-do.component.scss']
})
export class AddToDoComponent implements OnInit {
  toDoInput:string = "";

  @Output() newToDo = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onAddToDo = () => {
    this.newToDo.emit(this.toDoInput);
  };

}
