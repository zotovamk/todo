import { Component, ChangeDetectionStrategy } from '@angular/core';
import { PATHS } from '@models/constants';

interface ILink {
  path: PATHS;
  title: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  links: ILink[] = [
    { path: PATHS.RPC, title: 'Rock paper scissors' },
    { path: PATHS.TODO, title: 'TODO' },
  ];

  constructor() {}
}
