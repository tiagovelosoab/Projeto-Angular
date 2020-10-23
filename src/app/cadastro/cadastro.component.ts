import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  formGroup:FormGroup;
  dataGenerica : Date =new Date();
  dia = String(this.dataGenerica.getDate()).padStart(2, '0');
  mes = String(this.dataGenerica.getMonth() + 1).padStart(2, '0'); 
  ano = this.dataGenerica.getFullYear();
  data=this.ano+"-"+this.mes+"-"+this.dia;

  @Input() control;
  @Output() controlChange=new EventEmitter<number>();
  @Input() users;
  @Output() usersChange=new EventEmitter<Array<string>>();
  existente=false;
  constructor() {
    this.formGroup=new FormGroup({
      nome:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])),
      email:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.maxLength(50),
        Validators.email
      ])),
      telefone:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.minLength(9),
        Validators.maxLength(15),
        Validators.pattern("^[0-9]*$")
      ])),
      dataNascimento:new FormControl(null,Validators.compose([
        Validators.required,
      ])),
      senha:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(40),
      ])),
      confirmaSenha:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.maxLength(40),
      ]))  
    })
   }

  ngOnInit(): void {
  }
  enviar(){
    let resultado=`
    ${this.formGroup.value.nome}
    ${this.formGroup.value.email}
    ${this.formGroup.value.telefone}
    ${this.formGroup.value.dataNascimento}
    ${this.formGroup.value.senha}
    `;
    if(this.formGroup.value.senha===this.formGroup.value.confirmaSenha){
      this.existente=false;
      for(let i of this.users){
        if(i.split("\n")[1].trim()==this.formGroup.value.nome&&i.split("\n")[2].trim()==this.formGroup.value.email){
          this.existente=true;
          window.alert("Nome de usuário e email já cadastrados, por favor tente novamente");
          break;
        }
        else if(i.split("\n")[1].trim()==this.formGroup.value.nome){
          this.existente=true;
          window.alert("Nome de usuário já existente, por favor tente novamente");
          break;
        }
        else if(i.split("\n")[2].trim()==this.formGroup.value.email){
          this.existente=true;
          window.alert("Email já cadastrado, por favor tente novamente");
          break;
        }
      }
      if(this.existente==false){
        window.alert("Cadastro bem sucedido\nUsuário:"+this.formGroup.value.nome+"\nEmail:"+this.formGroup.value.email);
        this.users.push(resultado);
        this.usersChange.emit(this.users);
        this.controlChange.emit(1);
      }
    }
    else{
      window.alert("Senhas não condizem, por favor tente novamente");
    }  
  }
  fazerLogin(){
    this.controlChange.emit(1);
  }
}




