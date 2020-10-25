import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { LoginComponent } from './login/login.component';
import { RecuperaSenhaComponent } from './recupera-senha/recupera-senha.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { BarraComponent } from './barra/barra.component';
import { AnimaisComponent } from './animais/animais.component';


@NgModule({
  declarations: [
    AppComponent,
    CadastroComponent,
    LoginComponent,
    RecuperaSenhaComponent,
    UsuariosComponent,
    BarraComponent,
    AnimaisComponent,
    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
