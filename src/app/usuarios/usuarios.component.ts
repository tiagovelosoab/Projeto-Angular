import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  formGroup:FormGroup;
  dataGenerica : Date =new Date();
  dia = String(this.dataGenerica.getDate()).padStart(2, '0');
  mes = String(this.dataGenerica.getMonth() + 1).padStart(2, '0'); 
  ano = this.dataGenerica.getFullYear();
  data=this.ano+"-"+this.mes+"-"+this.dia;
  usuarioATT=null;
  emailATT=null;
  numATT=null;
  
  @Input() users;
  @Output() usersChange=new EventEmitter<Array<string>>();
  @Input() usuarioAtual;
  @Input() controlSec;
  @Output() controlSecChange=new EventEmitter<number>();
  
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
  atualizar(i:String){
    this.numATT=-1;
    this.usuarioATT=i.split("\n")[1].trim();
    this.emailATT=i.split("\n")[2].trim()
    this.controlSecChange.emit(3);
    this.formGroup.controls['nome'].setValue(this.usuarioATT);
    this.formGroup.controls['email'].setValue(this.emailATT);
    this.formGroup.controls['telefone'].setValue(i.split("\n")[3].trim());
    this.formGroup.controls['dataNascimento'].setValue(i.split("\n")[4].trim());
    this.formGroup.controls['senha'].setValue(i.split("\n")[5].trim());
    this.formGroup.controls['confirmaSenha'].setValue(i.split("\n")[5].trim());
    for(let j of this.users){
      this.numATT++;
      if(j.split("\n")[1].trim()==this.usuarioATT){
        break;
      }
    }
  }
  atualizarUsuario(){
    let resultado=`
    ${this.formGroup.value.nome}
    ${this.formGroup.value.email}
    ${this.formGroup.value.telefone}
    ${this.formGroup.value.dataNascimento}
    ${this.formGroup.value.senha}
    `;
    if(this.formGroup.value.senha===this.formGroup.value.confirmaSenha){
      for(let i of this.users){
        if(i.split("\n")[1].trim()==this.formGroup.value.nome&&i.split("\n")[2].trim()==this.formGroup.value.email&&i.split("\n")[1].trim()!=this.usuarioATT&&i.split("\n")[2].trim()!=this.emailATT){
          window.alert("Nome de usuário e email já cadastrados, por favor tente novamente");
          return;
        }
        else if(i.split("\n")[1].trim()==this.formGroup.value.nome&&i.split("\n")[1].trim()!=this.usuarioATT){
          window.alert("Nome de usuário já existente, por favor tente novamente");
          return;
        }
        else if(i.split("\n")[2].trim()==this.formGroup.value.email&&i.split("\n")[2].trim()!=this.emailATT){
          window.alert("Email já cadastrado, por favor tente novamente");
          return;
        }
      }
      window.alert("Atualização bem sucedida");
      this.users[this.numATT]=resultado;
      this.usersChange.emit(this.users);
      this.retornar();   
    }
    else{
      window.alert("Senhas não condizem, por favor tente novamente");
    }  
  
  }
  retornar(){
    this.controlSecChange.emit(1);
    this.formGroup.reset();
  }
  inserir(){
    this.controlSecChange.emit(2);
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
      for(let i of this.users){
        if(i.split("\n")[1].trim()==this.formGroup.value.nome&&i.split("\n")[2].trim()==this.formGroup.value.email){
          window.alert("Nome de usuário e email já cadastrados, por favor tente novamente");
          return;
        }
        else if(i.split("\n")[1].trim()==this.formGroup.value.nome){
          window.alert("Nome de usuário já existente, por favor tente novamente");
          return;
        }
        else if(i.split("\n")[2].trim()==this.formGroup.value.email){
          window.alert("Email já cadastrado, por favor tente novamente");
          return;
        }
      }
     window.alert("Cadastro bem sucedido\nUsuário:"+this.formGroup.value.nome+"\nEmail:"+this.formGroup.value.email);
     this.users.push(resultado);
     this.usersChange.emit(this.users);
     this.controlSecChange.emit(1);
     this.formGroup.reset();
      
    }
    else{
      window.alert("Senhas não condizem, por favor tente novamente");
    }  
  }
  excluir(i:String){
    if(i.split('\n')[1].trim()==this.usuarioAtual){
      window.alert("O usuário logado não pode ser excluído");
      return;
    }
    let r=window.confirm("Deseja realmente excluir o usuário?");
    if(r==false){
      return;
    }
    let j=-1;
    for(let k of this.users){
      j++;
      if(i==k){
        this.users.splice(j,1);
        return;
      }
    }
  }

}
