import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'angular-project';
  control=1;
  controlSec=1;
  animais:Array<String>=[];
  itens:Array<String>=[];
  users:Array<string>=[];
  usuarioAtual=null;
}

