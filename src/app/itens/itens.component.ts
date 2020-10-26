import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-itens',
  templateUrl: './itens.component.html',
  styleUrls: ['./itens.component.css']
})
export class ItensComponent implements OnInit {
  @Input() itens;
  @Output() itensChange=new EventEmitter<Array<string>>();
  @Input() controlSec;
  @Output() controlSecChange=new EventEmitter<number>();
  formGroup:FormGroup;
  codigoATT=null;
  numATT=null;
  nomeATT=null;
  constructor() {
    this.formGroup=new FormGroup({
      codigo:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(30)
      ])),
      nome:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(40)
      ])),
      quantidade:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]*$"),
      ])),
      preço:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.pattern("^[0-9]+\.[0-9]*$")
      ])),
      tipo:new FormControl(null,Validators.compose([
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(30)
      ])), 
    })
   
   }

  ngOnInit(): void {
  }
  atualizar(i:String){
    this.numATT=-1;
    this.codigoATT=i.split("\n")[1].trim();
    this.nomeATT=i.split("\n")[2].trim()
    this.controlSecChange.emit(3);
    this.formGroup.controls['codigo'].setValue(this.codigoATT);
    this.formGroup.controls['nome'].setValue(this.nomeATT);
    this.formGroup.controls['quantidade'].setValue(i.split("\n")[3].trim());
    this.formGroup.controls['preço'].setValue(i.split("\n")[4].trim());
    this.formGroup.controls['tipo'].setValue(i.split("\n")[5].trim());
    for(let j of this.itens){
      this.numATT++;
      if(j.split("\n")[1].trim()==this.codigoATT){
        break;
      }
    }
  }
  atualizarItem(){
    let resultado=`
    ${this.formGroup.value.codigo}
    ${this.formGroup.value.nome}
    ${this.formGroup.value.quantidade}
    ${this.formGroup.value.preço}
    ${this.formGroup.value.tipo}
    `;
      for(let i of this.itens){
        if(i.split("\n")[1].trim()==this.formGroup.value.codigo&&i.split("\n")[2].trim()==this.formGroup.value.nome&&i.split("\n")[1].trim()!=this.codigoATT&&i.split("\n")[2].trim()!=this.nomeATT){
          window.alert("Código do produto e nome já cadastrados, por favor tente novamente");
          return;
        }
        else if(i.split("\n")[1].trim()==this.formGroup.value.codigo&&i.split("\n")[1].trim()!=this.codigoATT){
          window.alert("Código do produto já existente, por favor tente novamente");
          return;
        }
        else if(i.split("\n")[2].trim()==this.formGroup.value.nome&&i.split("\n")[2].trim()!=this.nomeATT){
          window.alert("Nome do produto já cadastrado, por favor tente novamente");
          return;
        }
      }
      window.alert("Atualização bem sucedida");
      this.itens[this.numATT]=resultado;
      this.itensChange.emit(this.itens);
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
      ${this.formGroup.value.codigo}
      ${this.formGroup.value.nome}
      ${this.formGroup.value.quantidade}
      ${this.formGroup.value.preço}
      ${this.formGroup.value.tipo}
      `;
        for(let i of this.itens){
          if(i.split("\n")[1].trim()==this.formGroup.value.codigo&&i.split("\n")[2].trim()==this.formGroup.value.nome){
            window.alert("Código do produto e nome já cadastrados, por favor tente novamente");
            return;
          }
          else if(i.split("\n")[1].trim()==this.formGroup.value.codigo){
            window.alert("Código do produto já existente, por favor tente novamente");
            return;
          }
          else if(i.split("\n")[2].trim()==this.formGroup.value.nome){
            window.alert("Nome do produto já cadastrado, por favor tente novamente");
            return;
          }
        }
       window.alert("Cadastro bem sucedido\nCódigo do produto:"+this.formGroup.value.codigo+"\nNome do produto:"+this.formGroup.value.nome);
       this.itens.push(resultado);
       this.itensChange.emit(this.itens);
       this.controlSecChange.emit(1);
       this.formGroup.reset();
    }
    excluir(i:String){
      let r=window.confirm("Deseja realmente excluir o item?");
      if(r==false){
        return;
      }
      let j=-1;
      for(let k of this.itens){
        j++;
        if(i==k){
          this.itens.splice(j,1);
          return;
        }
      }
    }
}
