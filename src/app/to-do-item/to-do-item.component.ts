import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-to-do-item',
  templateUrl: './to-do-item.component.html',
  styleUrls: ['./to-do-item.component.scss']
})
export class ToDoItemComponent implements OnInit {
  @Input() toDoText:string;

  constructor() { }

  ngOnInit() {
  }

}
