import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formGroup:FormGroup;
  @Input() control;
  @Output() controlChange=new EventEmitter<number>();
  @Input() users;
  @Input() usuarioAtual;
  @Output() usuarioAtualChange=new EventEmitter<String>();
  constructor() { 
    this.formGroup=new FormGroup({
      nome:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.maxLength(50)
      ])),
      senha:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.maxLength(40)
      ])),
    })
  }

  ngOnInit(): void {
  }
  enviar(){
    if(this.users.lenght==undefined&&this.users.length==0){
      window.alert("Usuário e/ou senha incorretos, tente novamente");
      return;
    }
    for(let i of this.users){
      if(i.split("\n")[1].trim()==this.formGroup.value.nome||i.split("\n")[2].trim()==this.formGroup.value.nome){
        if(i.split("\n")[5].trim()==this.formGroup.value.senha){
          this.usuarioAtual=i.split("\n")[1].trim();
          this.usuarioAtualChange.emit(this.usuarioAtual);
          this.controlChange.emit(4);
          return;
        }
        else{
          window.alert("Usuário e/ou senha incorretos, tente novamente");
          return;
        }
      }  
    }
    window.alert("Usuário e/ou senha incorretos, tente novamente");
  }
  cadastrar(){
    this.controlChange.emit(2);
  }
  recuperarSenha(){
    this.controlChange.emit(3);
  }
}
