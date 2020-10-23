import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-recupera-senha',
  templateUrl: './recupera-senha.component.html',
  styleUrls: ['./recupera-senha.component.css']
})
export class RecuperaSenhaComponent implements OnInit {
  formGroup:FormGroup;
  @Input() control;
  @Output() controlChange=new EventEmitter<number>();
  @Input() users;
  constructor() {
    this.formGroup=new FormGroup({
      email:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.email,
        Validators.maxLength(50)
      ])),
    })
   }

  ngOnInit(): void {
  }
  enviar(){
    if(this.users.lenght==undefined&&this.users.length==0){
      window.alert("Email informado não encontrado no sistema");
      return;
    }
    for(let i of this.users){
    if(i.split("\n")[2].trim()==this.formGroup.value.email){
      window.alert("Um email foi enviado para "+i.split("\n")[2].trim()+" com as instruções para recuperação de senha");
      this.formGroup.reset();
      return;
      }
    }
    window.alert("Email informado não encontrado no sistema");
  }
  fazerLogin(){
    this.controlChange.emit(1);
  }
}
