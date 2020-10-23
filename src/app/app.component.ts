import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-project';
  control=4;
  controlSec=1;
  users:Array<string>=[`
  tiago
  aaa@aaa
  988924104
  1999-04-09
  12345678
  `];
  usuarioAtual=null;
}

