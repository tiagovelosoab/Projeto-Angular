import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-animais',
  templateUrl: './animais.component.html',
  styleUrls: ['./animais.component.css']
})
export class AnimaisComponent implements OnInit {
  @Input() animais;
  @Output() animaisChange=new EventEmitter<Array<string>>();
  @Input() controlSec;
  @Output() controlSecChange=new EventEmitter<number>();
  formGroup:FormGroup;
  dataGenerica : Date =new Date();
  sexo=["Macho","Fêmea"];
  dia = String(this.dataGenerica.getDate()).padStart(2, '0');
  mes = String(this.dataGenerica.getMonth() + 1).padStart(2, '0'); 
  ano = this.dataGenerica.getFullYear();
  data=this.ano+"-"+this.mes+"-"+this.dia;
  nomeATT=null;
  numATT=null;

  constructor() {
    this.formGroup=new FormGroup({
      nome:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])),
      especie:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ])),
      preço:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]+\.[0-9]*$")
      ])),
      dataNascimento:new FormControl(null,Validators.compose([
        Validators.required
      ])),
      sexo:new FormControl(null,Validators.compose([
        Validators.required,
      ])), 
    })
   
   }

  ngOnInit(): void {
  }
  atualizar(i:String){
    this.numATT=-1;
    this.nomeATT=i.split("\n")[1].trim();
    this.controlSecChange.emit(3);
    this.formGroup.controls['nome'].setValue(i.split("\n")[1].trim());
    this.formGroup.controls['especie'].setValue(i.split("\n")[2].trim());
    this.formGroup.controls['preço'].setValue(i.split("\n")[3].trim());
    this.formGroup.controls['dataNascimento'].setValue(i.split("\n")[4].trim());
    this.formGroup.controls['sexo'].setValue(i.split("\n")[5].trim());
    for(let j of this.animais){
      this.numATT++;
      if(j.split("\n")[1].trim()==this.nomeATT){
        break;
      }
    }
  }
  atualizarUsuario(){
    let resultado=`
    ${this.formGroup.value.nome}
    ${this.formGroup.value.especie}
    ${this.formGroup.value.preço}
    ${this.formGroup.value.dataNascimento}
    ${this.formGroup.value.sexo}
    `;
    for(let i of this.animais){
       if(i.split("\n")[1].trim()==this.formGroup.value.nome&&i.split("\n")[1].trim()!=this.nomeATT){
          window.alert("Nome identificador já cadastrado, por favor tente novamente");
          return;
        }
      }
      window.alert("Atualização bem sucedida");
      this.animais[this.numATT]=resultado;
      this.animaisChange.emit(this.animais);
      this.retornar();   
    }
      

  retornar(){
    this.controlSecChange.emit(1);
    this.formGroup.reset();
  }
  inserir(){
    this.formGroup.reset();
    this.controlSecChange.emit(2);
  }
  enviar(){
    let resultado=`
    ${this.formGroup.value.nome}
    ${this.formGroup.value.especie}
    ${this.formGroup.value.preço}
    ${this.formGroup.value.dataNascimento}
    ${this.formGroup.value.sexo}
    `;
      for(let i of this.animais){
        if(i.split("\n")[1].trim()==this.formGroup.value.nome){
          window.alert("Nome identificador já cadastrado, por favor tente novamente");
          return;
        }
      }
     window.alert("Cadastro bem sucedido\nNome identificador:"+this.formGroup.value.nome+"\nEspécie:"+this.formGroup.value.especie);
     this.animais.push(resultado);
     this.animaisChange.emit(this.animais);
     this.controlSecChange.emit(1);
     this.formGroup.reset();
      
    }
    
  excluir(i:String){
    let r=window.confirm("Deseja realmente excluir o animal?");
    if(r==false){
      return;
    }
    let j=-1;
    for(let k of this.animais){
      j++;
      if(i==k){
        this.animais.splice(j,1);
        return;
      }
    }
  }
}
