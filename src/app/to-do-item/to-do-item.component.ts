import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {
  @Input() toDoText:string;
  @Input() index:number;

  @Output() deleteToDo = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onDeleteToDo = () => {
    this.deleteToDo.emit(this.index);
  };

}
