import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
@Component({
  selector: 'app-barra',
  templateUrl: './barra.component.html',
  styleUrls: ['./barra.component.css']
})
export class BarraComponent implements OnInit {
  @Input() control;
  @Output() controlChange=new EventEmitter<number>();
  @Input() usuarioAtual;
  @Input() controlSec;
  @Output() controlSecChange=new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  sair(){
    this.controlSecChange.emit(1);
    this.controlChange.emit(1);
  }
  verUsuarios(){
    this.controlSecChange.emit(1);
    this.controlChange.emit(5);
  }
  verAnimais(){
    this.controlSecChange.emit(1);
    this.controlChange.emit(6);
  }
  verItens(){
    this.controlSecChange.emit(1);
    this.controlChange.emit(7);
  }
}
