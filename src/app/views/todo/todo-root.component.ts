import { Component } from '@angular/core';

@Component({
  selector: 'app-todo-root',
  templateUrl: './todo-root.component.html',
  styleUrls: ['./todo-root.component.scss'],
})
export class TodoRootComponent {
  withCompletedArr = false;

  constructor() {}
}
